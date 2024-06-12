import requests
from bs4 import BeautifulSoup
import json

class Stock:
    def __init__(self, price, percent, change, up, volume, beta, pe, rev, ebidta, cap):
        self.price = price
        self.percent = percent
        self.change = change
        self.up = up
        self.volume = volume 
        self.beta = beta
        self.peratio = pe 
        self.revenue = rev
        self.ebidta =ebidta
        self.marketcap = cap

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

        volume = soup.find("li", class_="last-sm last-lg svelte-tx3nkj").get_text()
        beta = soup.find("span", class_="last-sm last-lg svelte-tx3nkj").get_text()
        pe_ratio = soup.find("fin-streamer", data_field_="trailingPE").get_text()
        revenue = soup.find("span", text="Revenue").find_next_sibling("span").get_text()
        ebidta = soup.find("span", text="EBITDA").find_next_sibling("span").get_text()
        market_cap = soup.find("span", text="Market Cap").find_next_sibling("span").get_text()

        stock = Stock(price, percent, change, tag_up, volume, beta, pe_ratio, revenue, ebidta, market_cap)
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
            "volume": stock.volume,
            "beta": stock.beta,
            "peratio": stock.peratio,
            "revenue": stock.revenue,
            "ebidta": stock.ebidta,
            "marketcap": stock.marketcap
    })


with open("./src/stock_performance.json", 'w') as f:
    json.dump(stock_data, f, indent=4)
