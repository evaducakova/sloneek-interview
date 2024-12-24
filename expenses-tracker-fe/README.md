# ExpensesTrackerFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
The tests are created for app.component, services and utils

## Application Expense Tracker

There are three tabs in the navigation in the upper right corner. Transactions, Categories and Data Visualization

## Transactions dashboard

The Transactions table displays stored transactions using local storage and NgRx state management. Users can add new transactions or generate sample data using a dedicated button, which creates both transactions and categories. The dashboard also shows the balance, including total expenses, total income, and net balance. 

## Categories

The Categories dashboard displays two columns for both income and expense categories. Users can add new categories, modify existing ones, or delete them.

## Data Visualization

The Data Visualization tab displays various charts and graphs for visualizing data, including pie charts and bar graphs. It also shows average values for expenses and incomes.
