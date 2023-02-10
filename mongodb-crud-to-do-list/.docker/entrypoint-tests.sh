#!/bin/bash

npm install
npx typeorm migration:run -d dist/database.providers.js
npm run test