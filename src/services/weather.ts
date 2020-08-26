import request from 'request';

//Weather API call

const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${ process.env.SECRET_KEY}&q=`;

function getData(city) {
    return new Promise( (resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': WEATHER_API + city,
            'headers': {
            },
          };
        request(options, function (error, response) {
            if (error) throw reject(error);
            resolve(response.body);
        });
    })
}

export default getData;