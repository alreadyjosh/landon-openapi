<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://pileshare.com/u/edQNpM" width="546" alt="Landon-OpenAPI" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/uTAwkPAnas"><img src="https://img.shields.io/badge/Discord-1.8k-brightgreen?style=flat-square&logo=discord&logoColor=white" alt="Discord Server" /></a>
    <a href="https://www.npmjs.com/package/landon-openapi"><img src="https://img.shields.io/badge/npm-v1.0.0-blue?style=flat-square&logo=npm" alt="NPM Version" /></a>
    <a href="https://developers.roavflights.com/"><img src="https://img.shields.io/badge/API-ready-blueviolet?style=flat-square" alt="API Status" /></a>
  </p>
</div>

## About

The Landon OpenAPI Wrapper makes it easy for developers to interact with our Roblox Flight Planner System.

- Simple and easy to use
- 100% coverage of the Landon OpenAPI

## Installation

**Node.js 14.16.0 or newer is required.**

```sh-session
npm install landon-openapi
```

## Usage

Requiring the package and authenticating your app with an API Key:

```js
const Landon = require('landon-openapi');

const landonclient = new Landon({
    apikey: "o1mapx.qh3v2r2t7kb06tfkt2l6g75s.jmfi"
});
```

Afterwards we can get, create or delete flights.
#### Get all Flights

```js
let allFlights = await landonclient.getFlights();
console.log(allFlights)
```

#### Create a Flight

```js
const flight_info = {
    flightnumber: "RHT3894",
    aircraft: "A320",
    departure_airport: "Zurich",
    arrival_airport: "New York",
    game_url: "https://roblox.com/123",
    date: "2022-02-22",
    time: "1:00am",
    roavhub_ping: false
};

let createFlight = await landonclient.createFlight(flight_info);
console.log(createFlight)
```

#### Delete a Flight

```js
const flight_info = {
    flightID: "kjrdto1cua9acj7s1pbsqgzjmko9fzrymdli",
};

let deleteFlight = await landonclient.deleteFlight(flight_info);
console.log(deleteFlight)
```

## Links

- [Developer Documentation](https://developers.roavflights.com)
- [Discord Server](https://discord.gg/uTAwkPAnas)
- [GitHub](https://github.com/JoshyRBLX/landon-openapi) and [npm](https://www.npmjs.com/package/landon-openapi)