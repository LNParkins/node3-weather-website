const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ab5ff7424c96f17641d25ca0eb9b4669&query=' + latitude + ',' + longitude + '&units=f';
   
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to find location.', undefined);
        } else if (body.error) {
            callback('Unable to connect to find location.', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It currently is ' + body.current.temperature + ' degrees out.' + ' But it feels like ' + body.current.feelslike + ' degrees out.');
        }
    })
}


module.exports = forecast;
