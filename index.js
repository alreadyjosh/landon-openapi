const axios = require("axios")
const baseURL = "https://flights.roavhub.org/openapi"

class Landon {
    constructor(options) {
        if (options?.apikey) this.apiKey = options.apikey
        else throw new Error("An API key must be provided on initialization.")

        this.request = axios.create({
            baseURL: baseURL
        })
    }
  
    getFlights() {
        return new Promise(async (resolve) => {
            try {
                const res = await this.request({
                    method: 'get',
                    url: "/flights/get",
                    data: {
                        apikey: this.apiKey
                    }
                })

                if (res && res.data && res.data.flights && res.data.flights.length < 1) {
                    return resolve({
                        status: "success",
                        data: []
                    })
                }
                else {
                    return resolve({
                        status: "success",
                        data: res.data.flights
                    })
                }
            }
            catch (error) {
                const data = error?.response?.data
                const errors = {
                    "Unauthorized": "Unauthorized. An invalid token was provided.",
                    "Missing Authorization Key": "Missing API Key"
                }

                if (!error && !error.response && !error.response.data) {
                    return resolve({
                        status: "error",
                        data: "Invalid Server Response"
                    })
                }
                
                if (data.status === "401") {
                    if (errors.includes(data.message)) {
                        return resolve({
                            status: "error",
                            data: errors[data.message]
                        })
                    }
                    else {
                        return resolve({
                            status: "error",
                            data: `Undocumented Error. Code: ${data?.status}`
                        })
                    }
                }
                else {
                    return resolve({
                        status: "error",
                        data: "Internal Server Error"
                    })
                }
            }
        })
    }

    createFlight(options) {
        return new Promise(async (resolve) => {
            try {
                const res = await this.request({
                    method: 'post',
                    url: "/flights/create",
                    data: {
                        apikey: this.apiKey,
                        flightnumber: options?.flightnumber,
                        aircraft: options?.aircraft,
                        departure_airport: options?.departure_airport,
                        arrival_airport: options?.arrival_airport,
                        game_url: options?.game_url,
                        date: options?.date,
                        time: options?.time,
                        roavhub_ping: options?.roavhub_ping
                    }
                })

                if (res && res.data) {
                    return resolve({
                        status: "success",
                        data: {
                            message: res.data?.message,
                            details: res.data?.details
                        }
                    })
                }
            }
            catch (error) {
                const data = error?.response?.data
                const errors = {
                    "Missing Body Parameters": "View the Developer Documentation to see which parameters are required. https://developers.roavflights.com",
                    "Invalid Roblox Game URL. It must start with https://roblox.com/": "Invalid Roblox Game URL. It must start with https://roblox.com/",
                    "Invalid Time Format": "Invalid Time Format. Example: 1:00am / 1:00pm\nAll times are in the UTC timezone",
                    "roavhub_ping must be boolean": "\"roavhub_ping\" must be boolean (true/false)",

                    "Unauthorized": "Unauthorized. An invalid token was provided.",
                    "Missing Authorization Key": "Missing API Key"
                }

                if (!error && !error.response && !error.response.data) {
                    return resolve({
                        status: "error",
                        data: "Invalid Server Response"
                    })
                }
                
                if (data.status === "400" && data.status === "401") {
                    if (errors.includes(data.message)) {
                        return resolve({
                            status: "error",
                            data: errors[data.message]
                        })
                    }
                    else {
                        return resolve({
                            status: "error",
                            data: `Undocumented Error. Code: ${data?.status}`
                        })
                    }
                }
                else {
                    return resolve({
                        status: "error",
                        data: "Internal Server Error"
                    })
                }
            }
        })
    }

    deleteFlight(options) {
        return new Promise(async (resolve) => {
            try {
                const res = await this.request({
                    method: 'post',
                    url: "/flights/delete",
                    data: {
                        apikey: this.apiKey,
                        flightID: options?.flightID
                    }
                })

                if (res && res.data) {
                    return resolve({
                        status: "success",
                        data: res?.data?.message
                    })
                }
            }
            catch (error) {
                const data = error?.response?.data
                const errors = {
                    "Missing Body Parameters": "View the Developer Documentation to see which parameters are required. https://developers.roavflights.com",

                    "Flight not found": "Invalid FlightID. There's no entry for that FlightID in the Database.",

                    "Unauthorized": "Unauthorized. An invalid token was provided.",
                    "Missing Authorization Key": "Missing API Key"
                }

                if (!error && !error.response && !error.response.data) {
                    return resolve({
                        status: "error",
                        data: "Invalid Server Response"
                    })
                }
                
                if (data.status === "400" && data.status === "401" || data.status === "404") {
                    if (errors.includes(data.message)) {
                        return resolve({
                            status: "error",
                            data: errors[data.message]
                        })
                    }
                    else {
                        return resolve({
                            status: "error",
                            data: `Undocumented Error. Code: ${data?.status}`
                        })
                    }
                }
                else {
                    return resolve({
                        status: "error",
                        data: "Internal Server Error"
                    })
                }
            }
        })
    }
}
  
module.exports = Landon