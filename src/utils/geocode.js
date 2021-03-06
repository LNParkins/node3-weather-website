const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibG5wYXJraW5zIiwiYSI6ImNrZG9vN3Q0bTBucTkycW8xZmpiNnAwYm0ifQ.QBWw3zZBZ6HrarHhoUAHlg&limit=1';

    request({ url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to find location.', undefined)
        } else if (body.features.length === 0){
            callback('Unable to connect to find location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;