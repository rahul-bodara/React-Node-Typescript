
const table = async () => {

  const options = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'whether'
    },
  };
  const knex = require('knex')(options);

  knex.schema.createTable('weather', (table) => {
    table.increments('id')
    table.string('weather')
    table.float('temperature')
    table.string('cityName')
    table.string('description')
    table.string('country')
    table.string('speed')
    table.date('date')
  }).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
      knex.destroy();
    });
}
module.exports = table;