## Test task - Frontend Developer

# Instructions

## Before runing

For desired browser install CORS plugin for accessing bitstamp API and enable it. This is necessaray for getting live market prices.
CHROME:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

FIREFOX:
https://addons.mozilla.org/sl/firefox/addon/cors-everywhere/


## Download git files
git clone https://github.com/Soulution13/TestTask.git

## Install dependencies
npm install

## Run application and open browser on localhost http://localhost:4200/
ng serve


## Important notice

I'm using in memory web api for simulation. It work's well until there are any items in database. If you delete all items from open orders it's not possible to add any later. 
Link to api project:
https://github.com/angular/in-memory-web-api

# Implemented functionalities

- Buy sell order
- List of markets from Bitstamp API
- Simulated user balance
- Removing / Adding orders
- Error notifications
- Live prices from Bitstamp
- Sidebar

## How it works

Open Exchanges page and choose one pair. Then try to submit buy or sell order.

