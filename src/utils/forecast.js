const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a4e6ba0dd5cab5c959a288172f9452fa&query=' + latitude + ',' + longitude + '&units=m'
    request({ url:url , json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!')
        } 
        else if( response.body.error ) {
            callback('Unable to find location')
        }
        else {
            
            const data = response.body
            callback(undefined, data.current.weather_descriptions[0] + `. It is currently ${data.current.temperature} out with humidity of ${data.current.humidity}%.It feels like ${data.current.feelslike} degrees out.`)
        }
        
    })
}

module.exports = forecast

