import connection from '../connection';

const sql = [
    'DROP TABLE IF EXISTS list',
    'DROP TABLE IF EXISTS list_item',
    'create table if not exists list (id integer primary key autoincrement);',
    'create table if not exists list_item (id integer primary key autoincrement, name text, item int, foreign key (item) references list (id));',
    "insert into list_item (name) values ('arroz')"
];

export default () => {

connection.transaction(
    tx => {
        sql.map(sql=>
            tx.executeSql(sql)
        )
      
    }, (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
    }, () => {
        console.log("transaction complete call back ");
    });

    connection.transaction(tx => {
    tx.executeSql(`select * from 'list_item'`, [], (_, { rows }) => {
        console.log(rows)
    }), (sqlError) => {
        console.log(sqlError);
    }}, (txError) => {
    console.log(txError);
})

}