import connection from '../connection';

const sql = [
    
    `create table if not exists products (
        id integer primary key autoincrement,
        name text unique not null,
        category text not null);`,

    `create table if not exists list (
        id integer primary key autoincrement,
        status int not null,
        date datetime not null,
        user text not null);`,

    `create table if not exists list_item (
        id integer primary key autoincrement, 
        name int, 
        price double, 
        list int, 
        foreign key (list) references list (id),
        foreign key (name) references products (id));`,
];

const sqlReset = [
    'DROP TABLE IF EXISTS list_item',
    'DROP TABLE IF EXISTS list',
    'DROP TABLE IF EXISTS products'
];

export default () => {

    const init = ():Promise<boolean> =>{

        return new Promise((resolve, reject) => {
            connection.transaction(
                tx => {
                    sql.map(sql=>
                        tx.executeSql(sql)
                    )
                
                }, (error) => {
                    console.log("error call back : " + JSON.stringify(error));
                    reject(false);
                }, () => {
                    console.log("Init tables");
            });

            resolve(true);
        });
        
    }

    const reset = async ():Promise<boolean> =>{

        connection.transaction(
            tx => {
                sqlReset.map(sql=>
                    tx.executeSql(sql)
                )
              
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("Tables dropped");
            });
        await init();
        return true;
    }


    return {init, reset};
}