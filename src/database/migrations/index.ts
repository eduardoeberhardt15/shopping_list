import connection from '../connection';

const sql = [
    'DROP TABLE IF EXISTS list_item',
    'DROP TABLE IF EXISTS list',
    `create table if not exists list (
        id integer primary key autoincrement,
        status int,
        date datetime,
        user text);`,
    `create table if not exists list_item (
        id integer primary key autoincrement, 
        name text, 
        price double, 
        list int, 
        foreign key (list) references list (id));`,
    `insert into list values (null, 0, '${new Date()}', 1)`,
    "insert into list_item values (null, 'arroz', 15.5, 1)"
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
    tx.executeSql(`select * from 'list'`, [], (_, { rows }) => {
        console.log(rows)
    }), (sqlError) => {
        console.log(sqlError);
    }}, (txError) => {
    console.log(txError);
})

}