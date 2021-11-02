const request = require('request')
const geocode = (city, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=pk.eyJ1IjoibWFobW91ZG5hb3VtIiwiYSI6ImNrdjAwc2xrZzB1ZmIyd3BiMm9yZzRneDYifQ.z8tcqaStYDyumZGy3mAExQ&limit=1'
    request({ url:url, json:true}, (error, response) => {
        if( error ){ 
            callback('Unable to connect to location service!')
            console.log('Unable to connect to location service!')
        }
        else if ( response.body.features.length === 0) {
            callback('Unable to find location. Try another search')
            console.log('Unable to find location. Try another search')
        }
        else {
            const data = response.body.features[0].center
            callback(undefined,{
                latitude: data[1],
                longitude: data[0],
                location: response.body.features[0].place_name
            })
        }   
    })  
}

module.exports = geocode