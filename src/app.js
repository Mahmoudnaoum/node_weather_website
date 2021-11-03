const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { stat } = require('fs')

const app = express()
const port = process.env.PORT || 3000
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')   

//Setup handlebar engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Naoum'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Mahmoud Naoum'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help page',
        name: 'Mahmoud Naoum',
        helpText: 'This is help'
    })
})


app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You should provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        else {
            forecast(data.longitude, data.latitude, (error, forecastData )=>{
                if(error) {
                    return res.send({
                        error: error
                    })
                }
                else {
                    res.send({
                        forecast: forecastData,
                        location: data.location,
                        address: req.query.address
                    })
                }
                
            })    
        }
        })

})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Mahmoud Naoum',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Mahmoud Naoum',
        errorMessage: 'Page not found'
    })
})


app.listen(port, ()=>{
    console.log('The server is up!')
})