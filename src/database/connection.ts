import * as SQLite from 'expo-sqlite';

const connection = SQLite.openDatabase('database.db');
connection.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on'));

export default connection;