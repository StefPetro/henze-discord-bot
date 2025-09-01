# Henze Discord bot
A discord bot that fetches all henze allegeable odds from Danske Spil and sends them in a server every day.

## How to run locally

If you want to test the netlify scheduled function, start by running `npm run netlify:dev`. This will start the development server and the function will be running on your machine. To invoke the function, open another terminal and run `npm run netlify:invoke`.

If you simply want to test the functionality (without going through the function), simply run `npm run start`, and the code will be executed directly in the terminal.