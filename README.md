# Job Posting Challenge

## How to start ?

You can either start the project locally or use it through the railway app.

[railway](job-posting-challenge-production.up.railway.app)

If you want to start the project locally follow along:

run the following scripts
```
npm ci 
npm start
```

and you're all set !

## APIs
You'll find all the available API calls in the json files named: `API-calls.json`

Import this file into your [insomnia](https://insomnia.rest/) workspace.

You'll be able to use the API fully. (if using the railway deployed application, just switch *localhost:7777* by the railway endpoint url)

:warning:

In order to use the `translate` API you'll need to pass your [DeepL](https://www.deepl.com/pro-api) API key.

:warning:

The API is split into 2 categories: _/jobs/_ and _/translate/_

## Script

You'll find the script calculating the top 100 words in the jobs description data at
`scripts/top-100-words.ts`

to have the result just run:
`npm run top100Words`
