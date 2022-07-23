# ImageProcessingAPI
## Introduction
Image Processing API is an API which allows users to view certain library of images and also allows them to get a resized version of the original image.

## Installation and Running the project
- Run 'npm install' to install all the included packages in package.json file.
- Then run 'npm run build' script to build the project in dist folder.
- Now, You can run 'node dist/.' to run the project on port 3500.

## Endpoints
- '/', the root uri will redirect the user to the main endpoint.
- '/api/images', will return a list of available images in the library.
- '/api/images?filename={filename}', will return the full original image.
- '/api/images?filename={filename}&width={width}&heigt={height}', will return a resized version of the original image.
- '/api/images?filename={filename}&width={width}' OR '/api/images?filename={filename}&heigt={height}', will return a resized version of the original where width = height
e.g. http://localhost:3500/api/images?filename=fjord&width=10&height=100

## Scripts
- "start": "nodemon src/index.ts", starts the application in dev mode.
- "build": "npx tsc", builds the application to its javascript compiled code.
- "prettier": "prettier --config .prettierrc \"src/**/*.ts\" --write", runs the prettier module to format the code as per our .prettierrc config file.
- "eslint": "eslint . --ext .ts",  runs the eslint module to lint the code as per our .eslintrc.json config file.
- "jasmine": "jasmine", runs our test specs.
- "test": "npx tsc && jasmine", builds the application then run the test specs.

## Dev Dependencies
    "@types/express": "^4.17.13",
    "@types/jasmine": "^4.0.3",
    "@types/node": "^18.0.4",
    "@types/sharp": "^0.30.4",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.30.7",
    "@typescript-eslint/parser": "^5.30.7",
    "eslint": "^8.19.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "prettier": "^2.7.1",
    "ts-node": "^10.9.1",
    "typescript": "^4.7.4"

## Dependencies
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jasmine": "^4.2.1",
    "jasmine-spec-reporter": "^7.0.0",
    "sharp": "^0.30.7",
    "supertest": "^6.2.4"
