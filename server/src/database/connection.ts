import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        user: 'root',
        password: '123456789',
        database: 'nlw01'
    }
});

export default connection;