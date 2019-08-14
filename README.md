# Interview Scheduler

This project was created as a learning exercise at Lighthouse Labs in Montreal. Please note that it is not intended, nor recommended, for general use.

## Features

Users can book an interview with an interviewer by selecting a time-slot on a chosen day
Users can edit an existing interview by clicking the 'edit' button and changing their name or chosen interviewer
Users can remove an interview by clicking the 'delete' icon on a chosen interview, a confirmation screen will appear before the destructive action
Data persists upon restart of the server (as long as the database is not reset)
Built using functional components and hooks new to React.js version 16.8

## Setup

Install dependencies with `npm install`.

## Run scheduler-api server

from in the scheduler-api folder

```sh
npm start
```

to run in error mode, in order to test that errors are caught

```sh
npm run error
```

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshots

### Create a new interview

![Create a new interview](https://github.com/robinwebber/newScheduler/blob/master/docs/Create.png)
