const axios = require("axios");
const baseURL = "https://flights.roavhub.org/openapi";

class Landon {
    constructor(options) {
      this.apikey = options.apikey;
    }
  
    async getFlights() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `${baseURL}/flights/get`,
                data: { apikey: this.apikey }
            }).then(function (res) {
                if(res.data.flights.length === 0) {
                    return resolve("No Flights")
                } else {
                    return resolve(res.data.flights)
                }
            }).catch(function (err) {
                let data = err.response.data;
                if(data.status === "401" && data.message === "Unauthorized") {
                    return resolve("Unauthorized. An invalid token was provided.")
                } else if(data.status === "401" && data.message === "Missing Authorization Key") {
                    return resolve("Missing API Key")
                } else {
                    return resolve("Internal Server Error")
                }
            });
        });
    }

    async createFlight(options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${baseURL}/flights/create`,
                data: {
                    apikey: this.apikey,
                    flightnumber: options.flightnumber,
                    aircraft: options.aircraft,
                    departure_airport: options.departure_airport,
                    arrival_airport: options.arrival_airport,
                    game_url: options.game_url,
                    date: options.date,
                    time: options.time,
                    roavhub_ping: options.roavhub_ping
                }
            }).then(function (res) {
                resolve(`OK | ${res.data.details.flightID}`)
            }).catch(function (err) {
                let data = err.response.data;
                if(data.status === "400" && data.message === "Missing Body Parameters") {
                    return resolve("Missing Body Parameters. View the Developer Documentation to see which parameters are required. https://developers.roavflights.com")
                } else if(data.status === "400" && data.message === "Invalid Roblox Game URL. It must start with https://roblox.com/") {
                    return resolve("Invalid Roblox Game URL. It must start with https://roblox.com/")
                } else if(data.status === "400" && data.message === "Invalid Time Format") {
                    return resolve("Invalid Time Format. Example: 1:00am / 1:00pm\nAll times are in the UTC timezone")
                } else if(data.status === "400" && data.message === "roavhub_ping must be boolean") {
                    return resolve("\"roavhub_ping\" must be boolean (true/false)")
                } else if(data.status === "401" && data.message === "Unauthorized") {
                    return resolve("Unauthorized. An invalid token was provided.")
                } else if(data.status === "401" && data.message === "Missing Authorization Key") {
                    return resolve("Missing API Key")
                } else {
                    return resolve("Internal Server Error")
                }
            });
        });
    }

    async deleteFlight(options) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${baseURL}/flights/delete`,
                data: {
                    apikey: this.apikey,
                    flightID: options.flightID,
                }
            }).then(function (res) {
                resolve(`OK | Flight was deleted`)
            }).catch(function (err) {
                let data = err.response.data;
                if(data.status === "400" && data.message === "Missing Body Parameters") {
                    return resolve("Missing Body Parameters. View the Developer Documentation to see which parameters are required. https://developers.roavflights.com")
                } else if(data.status === "404" && data.message === "Flight not found") {
                    return resolve("Invalid FlightID. There's no entry for that FlightID in the Database.")
                } else if(data.status === "401" && data.message === "Unauthorized") {
                    return resolve("Unauthorized. An invalid token was provided.")
                } else if(data.status === "401" && data.message === "Missing Authorization Key") {
                    return resolve("Missing API Key")
                } else {
                    return resolve("Internal Server Error")
                }
            });
        });
    }
}
  
module.exports = Landon;