import yfinance as yf
import json

# Define a list of ticker symbols
ticker_symbols = ['NVDA', 'AAPL', 'TSLA', 'GS']

# Initialize an empty list to store stock data
all_stock_data = []

# Iterate through each ticker symbol
for ticker_symbol in ticker_symbols:
    # Create a Ticker object
    ticker = yf.Ticker(ticker_symbol)

    try:
        # Get current price
        current_price = round(ticker.history(period='1d')['Close'].iloc[-1], 2)

        # Get previous close price
        previous_close = round(ticker.info['previousClose'], 2)

        # Calculate percent change
        percent_change = round(((current_price - previous_close) / previous_close) * 100, 2) if previous_close else None

        # Get change in price
        price_change = round(current_price - previous_close, 2) if previous_close else None

        # Determine if the stock is up or down
        up_down = True if price_change > 0 else False if price_change < 0 else False

        # Get daily range
        daily_low = round(ticker.history(period='1d')['Low'].min(), 2)
        daily_high = round(ticker.history(period='1d')['High'].max(), 2)
        daily_range_str = f"{daily_low} - {daily_high}"

        # Get year range (using the same as daily for simplicity, adjust as needed)
        year_range = daily_range_str

        # Get volume
        volume = ticker.info['volume']

        # Calculate average volume (using 20-day average as an example)
        avg_volume = round(ticker.history(period='1mo', interval='1d')['Volume'].mean(), 2)

        # Fetch open price if available
        try:
            open_price = round(ticker.history(period='1d')['Open'].iloc[-1], 2)
        except Exception as e:
            open_price = None

        # Fetch bid price if available
        try:
            bid_price = round(ticker.info['bid'], 2)
        except Exception as e:
            bid_price = None

        # Fetch ask price if available
        try:
            ask_price = round(ticker.info['ask'], 2)
        except Exception as e:
            ask_price = None

        # Get market cap
        market_cap = ticker.info['marketCap'] if 'marketCap' in ticker.info else None

        # Create a dictionary with all the data rounded to 2 decimal places
        stock_data = {
            "stock": ticker_symbol,
            "price": current_price,
            "percent": percent_change,
            "change": price_change,
            "up": up_down,
            "PreviousClose": previous_close,
            "Open": open_price,
            "Bid": bid_price,
            "Ask": ask_price,
            "Range": daily_range_str,
            "YearRange": year_range,
            "AvgVolume": avg_volume,
            "Volume": volume,
            "MarketCap": market_cap
        }

        # Append stock data to the list
        all_stock_data.append(stock_data)

    except Exception as e:
        print(f"Failed to retrieve data for {ticker_symbol}: {str(e)}")

# Write all_stock_data to a JSON file
output_file = './src/stock_performance.json'
with open(output_file, 'w') as f:
    json.dump(all_stock_data, f, indent=4)
