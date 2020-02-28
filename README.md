# dhc_test-automation

## Additional requirement dependencies

- [i18n-ts](https://www.npmjs.com/package/i18n-ts): handle locales
- [dotenv](https://www.npmjs.com/package/dotenv): manage environment variable
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata): required for typeorm
- [typeorm](https://www.npmjs.com/package/typeorm): mapping database with class

## Coding style:

We use `eslint` for typescript recommended code style altogether with `pettier` for code format.
For Visual Studio code, just install plugin `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode`. All settings are already configured.
If you want to change rules, referring to `.eslintrc.js` and `.prettierrc.js`.

## Localization


### Select language to run

Open the `.env` file at root and change the current `LANGUAGE` variable to the language you want to run.
Currently we only supports `en` (English) and `jp` (Japanese).

## Select environment (build url) to run test against

Open the `.env` file at root and change the current `HOST` variable to the url you want to run.


## Connection with MySQL database

If you are going to run some test case that requires database, open `.env` file at root and enter both `MYSQL_USERNAME` and `MYSQL_PASSWORD` environment variables.

## Run and Debug

### Prerequisite

Gondola plugin for VSC must be installed and license must be activated. Installing guide: https://docs.gondolatest.com/getting-started/#requirements

Before run we need to compile the code: 
- To compile just once: `npm run compile`
- To do real time compile: `npm run autocompile`

### Add prerequisite data for test 
Create Admin account after re-deploy the web app: `npm run test -- --grep "Prerequisite 1"`
Add initial data for new environment: `npm run init-data`
To add account and initial data automatically: `./init-data.bat`

### Run automation test

Run all test cases: `npm run test`
Run only one test case: `npm run test -- --grep <regex of test case name>`

### Debug
On VSC:

1. Add `@Debug` into test case name
2. Press `F5`
