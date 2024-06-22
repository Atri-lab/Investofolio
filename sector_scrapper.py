import requests
from bs4 import BeautifulSoup
import json

def get_sector_performance(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    tag = soup.find("div", class_="perf negative svelte-12wncuy") or soup.find("div", class_="perf positive svelte-12wncuy")
    return tag if tag else None

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
        change = float(change_str)
        up = 'positive' in performance.get('class', [])
        data.append({
        "sector": sector,
        "change": change,
        "up": up
        })


# Save data to JSON file
with open("./src/sector_performance.json", 'w') as f:
    json.dump(data, f, indent=4)
