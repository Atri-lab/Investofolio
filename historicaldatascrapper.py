import yfinance as yf
import json
from datetime import datetime, timedelta

# Define a list of ticker symbols
ticker_symbols = ['NVDA', 'AAPL', 'TSLA', 'GS']

# Function to fetch monthly first day open price data and aggregate into a single JSON file
def fetch_and_write_first_day_open_prices():
    # Initialize an empty dictionary to store data for all tickers
    all_data = {}

    try:
        # Iterate through each ticker symbol
        for ticker_symbol in ticker_symbols:
            # Create a Ticker object
            ticker = yf.Ticker(ticker_symbol)

            # Define date range (1 year ago from today)
            end_date = datetime.now()
            start_date = end_date - timedelta(days=365)

            # Fetch historical data
            historical_data = ticker.history(start=start_date, end=end_date)

            # Filter data to get only the first trading day of each month
            first_day_prices = historical_data.groupby(historical_data.index.to_period('M')).first()

            # Extract only 'Open' and 'Month' columns, round 'Open' to 2 decimal places
            first_day_prices = first_day_prices[['Open']].round(2).reset_index()

            # Convert month to string format for better readability
            first_day_prices['Month'] = first_day_prices['Date'].dt.strftime('%Y-%m')

            # Drop the 'Date' column after converting 'Month'
            first_day_prices.drop(columns=['Date'], inplace=True)

            # Convert DataFrame to list of dictionaries for JSON serialization
            first_day_prices_list = first_day_prices.to_dict(orient='records')

            # Add data to the all_data dictionary with ticker symbol as key
            all_data[ticker_symbol] = first_day_prices_list

        # Write all_data to a JSON file
        output_file = './src/historical_data.json'
        with open(output_file, 'w') as f:
            json.dump(all_data, f, indent=4)

    except Exception as e:
        print(f"Failed to retrieve and write first day open prices: {str(e)}")

fetch_and_write_first_day_open_prices()
