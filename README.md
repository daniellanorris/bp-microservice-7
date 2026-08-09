# Keyword Filter Microservice

A Node.js and Express microservice that filters a list of keywords based on a specified filter and filter type.

## Overview

The Keyword Filter Microservice accepts a list of keywords and filtering criteria through a `POST` request. It processes the keywords using the `keywordFilter()` function and returns the filtered results.

The service also provides Swagger API documentation.

## Technologies

- Node.js
- Express.js
- JavaScript
- CORS
- Swagger / OpenAPI
- dotenv

## Project Structure

```text
keyword-filter/
├── src/
│   ├── index.js
│   └── lib/
│       └── keywordFilter.js
├── .env
├── package.json
└── README.md