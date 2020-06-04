import path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        user: 'root',
        password: '123456789',
        database: 'nlw01'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
};
