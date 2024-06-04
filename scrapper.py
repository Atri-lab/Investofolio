import requests
from bs4 import BeautifulSoup
import json

class Stock:
    def __init__(self, price, precent, change, up):
        self.price = price
        self.precent = precent
        self.change = change
        self.up = up


def get_sector_performance(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    tag = soup.find("div", class_="perf negative svelte-12wncuy") or soup.find("div", class_="perf positive svelte-12wncuy")
    return tag if tag else None

def get_stock_performance(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    tag_price = soup.find("div", class_="livePrice svelte-mgkamr") 
    tag_precent = soup.find("div", class_="e3b14781 f4be3290 e59c8479") 
    tag_change = soup.find("div", class_="e3b14781 f4be3290 f5a023e1") 
    tag_up = True

    stock =Stock(tag_price, tag_precent, tag_change, tag_up)

    return stock if stock else None

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
    if performance.text:
        change_str = performance.text.strip().strip('%')
        try:
            change = float(change_str)
            up = True if 'positive' in performance.get('class') else False
            data.append({
                "sector": sector,
                "change": change,
                "up": up
            })
        except ValueError:
            print(f"Could not convert {change_str} to float for sector {sector}")

with open("./src/sector_performance.json", 'w') as f:
    json.dump(data, f)

stock = {
    "NVDA":"https://finance.yahoo.com/quote/NVDA/",
    "AAPL":"https://finance.yahoo.com/quote/AAPL/",
    "TSLA":"https://finance.yahoo.com/quote/TSLA/",
    "GS":"https://finance.yahoo.com/quote/GS/"
}
stock_data = []

for sector, url in stock.items():
    stock = get_sector_performance(url)
    if stock:

        stock_data.append({
            "stock": sector,
            "price": stock.price,
            "up": stock.up
        })
        
with open("./src/stock_performance.json", 'w') as f:
    json.dump(stock_data, f)
