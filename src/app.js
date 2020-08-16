// NPM's
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Code File Inputs
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Express Function
const app = express()


// Express Config Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//// Static Files ////
app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => { // app.com/weather
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an location.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })


//// Handle Bars & Views (Interactive) ////
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lindsey P'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page', 
        name: 'Lindsey P'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello', 
        title: 'Help', 
        name: 'Lindsey P'
    })
})


//// 404 Page (Route Handler) ////
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lindsey P',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lindsey P',
        errorMessage: 'Page not found'
    })
})


//// Listen Function ////
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

