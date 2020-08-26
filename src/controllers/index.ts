import getData from '../services/weather'
import connection from './connection'
const knex = require('knex')(connection);

// knex.schema.createTable('weather', (table) => {
//     table.increments('id')
//     table.string('weather')
//     table.float('temperature')
//     table.string('cityName')
//     table.string('description')
//     table.string('country')
//     table.string('speed')
//     table.date('date')
// }).then(() => console.log("table created"))
// .catch((err) => { console.log(err); throw err })
// .finally(() => {
//     knex.destroy();
// });



async function routes(fastify, opts, next) {

    // Get Weather Data
    fastify.get('/:name', async (req, res) => {
        const {name} = req.params;
        const data = await getData(name);
        res.status(200).send({ status: '200 Ok', message: data});
    });

    // Post WeatherData
    fastify.post('/:name', async (req, res) => {


        var today = new Date();
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date1 = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        const weather = req.body.weather[0].main;
        const temperature = req.body.main.temp;
        const cityName = req.body.name;
        const description = req.body.weather[0].description;
        const country = req.body.sys.country;
        const speed = req.body.wind.speed;
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const weatherData = {
            weather,temperature,cityName,description,country,speed,date
        }

        // Fetch data from DB
        knex.from('weather').select("*").where('cityName', '=', cityName)
        .then((rows : any) => {
                res.status(200).send({ status: '200 Ok', message: rows});
        })
        .catch((err) => { console.log( err); throw err })
        .finally(() => {

        });

        // Insert data in DB
        knex('weather').insert(weatherData).then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {

        });
    });
}
module.exports = routes;