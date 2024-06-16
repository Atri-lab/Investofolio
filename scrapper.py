import requests
from bs4 import BeautifulSoup
import json

class Stock:
    def __init__(self, price, percent, change, up, prevclose, opene, bid, ask, ranges, range_year, avgvolume, volume, cap):
        self.price = price
        self.percent = percent
        self.change = change
        self.up = up
        self.prevclose = prevclose
        self.opene = opene
        self.bid = bid
        self.ask = ask
        self.ranges = ranges
        self.range_year = range_year
        self.avgvolume = avgvolume
        self.volume = volume
        self.cap = cap

def get_sector_performance(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    tag = soup.find("div", class_="perf negative svelte-12wncuy") or soup.find("div", class_="perf positive svelte-12wncuy")
    return tag if tag else None

def get_stock_performance(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    tag_price = soup.find("div", class_="container svelte-mgkamr")
    tag_up = False

    if tag_price:
        text = tag_price.text.strip()
        price, change_percent = text.split(' ', 1)
        change, percent = change_percent.split('(', 1)
        percent = percent.strip(')%')

        price = float(price.replace(',', ''))
        change = float(change.replace(',', ''))
        percent = float(percent)
        tag_up = change > 0

        prevclose = soup.find("fin-streamer", {"data-field": "regularMarketPreviousClose"}).text
        opene = soup.find("fin-streamer", {"data-field": "regularMarketOpen"}).text
        bid = soup.find("span", string="Bid").find_next_sibling("span").text
        ask = soup.find("span", string="Ask").find_next_sibling("span").text
        ranges = soup.find("fin-streamer", {"data-field": "regularMarketDayRange"}).text
        range_year = soup.find("fin-streamer", {"data-field": "fiftyTwoWeekRange"}).text
        avgvolume = soup.find("fin-streamer", {"data-field": "averageVolume"}).text
        volume = soup.find("fin-streamer", {"data-field": "regularMarketVolume"}).text
        cap = soup.find("fin-streamer", {"data-field": "marketCap"}).text

        stock = Stock(price, percent, change, tag_up, prevclose, opene, bid, ask, ranges, range_year, avgvolume, volume, cap)
        return stock
    return None

sectors = {
    "Tech": "https://finance.yahoo.com/sectors/technology/",
    "Finance": "https://finance.yahoo.com/sectors/financial-services/",
    "Healthcare": "https://finance.yahoo.com/sectors/healthcare/",
    "Industrials": "https://finance.yahoo.com/sectors/industrials/",
    "Energy": "https://finance.yahoo.com/sectors/energy/"
}

data = []
for sector, url in sectors.items():
    performance = get_sector_performance(url)
    if performance and performance.text:
        change_str = performance.text.strip().strip('%')
        try:
            change = float(change_str)
            up = 'positive' in performance.get('class', [])
            data.append({
                "sector": sector,
                "change": change,
                "up": up
            })
        except ValueError:
            print(f"Could not convert {change_str} to float for sector {sector}")

with open("./src/sector_performance.json", 'w') as f:
    json.dump(data, f, indent=4)

stocks = {
    "NVDA": "https://finance.yahoo.com/quote/NVDA/",
    "AAPL": "https://finance.yahoo.com/quote/AAPL/",
    "TSLA": "https://finance.yahoo.com/quote/TSLA/",
    "GS": "https://finance.yahoo.com/quote/GS/"
}

stock_data = []
for symbol, url in stocks.items():
    stock = get_stock_performance(url)
    if stock:
        stock_data.append({
            "stock": symbol,
            "price": stock.price,
            "percent": stock.percent,
            "change": stock.change,
            "up": stock.up,
            "PreviousClose": stock.prevclose,
            "Open": stock.opene,
            "Bid": stock.bid,
            "Ask": stock.ask,
            "Range": stock.ranges,
            "YearRange": stock.range_year,
            "AvgVolume": stock.avgvolume,
            "Volume": stock.volume,
            "MarketCap": stock.cap
        })

with open("./src/stock_performance.json", 'w') as f:
    json.dump(stock_data, f, indent=4)
