import connection from '../connection';

interface list_item{
    id?:number,
    name:number,
    price:number,
    list:number
}

export default () => {

    const insert = ({name, price, list}:list_item):Promise<number> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`insert into list_item values (null, '${name}', ${price}, ${list})`, [], 
                function(tx, res) {
                    resolve(res.insertId);
                }), 
                (sqlError:any) => {
                    console.log("sqlError",sqlError);
                    reject(sqlError);
                }}, (txError) => {
                    console.log("txError",txError);
                    reject(txError)
            });
            
        });
    }

    const update = () => {

    }

    const getAll = ():Promise<list_item[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from 'list_item'`, [], (_, { rows }) => {
                    //@ts-ignore
                    resolve(rows["_array"] || [])
                }), (sqlError:any) => {
                    console.log(sqlError);
                    reject(sqlError)
                }}, (txError) => {
                    console.log(txError);
                    reject(txError)
            })
        });

    }

    const findByListId = (id:number):Promise<list_item[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`
                select * from list_item li
                LEFT JOIN products p
                ON li.name = p.id where li.list=?`, [id], (_, { rows }) => {
                    //@ts-ignore
                    resolve(rows["_array"] || [])
                }), (sqlError:any) => {
                    console.log(sqlError);
                    reject(sqlError)
                }}, (txError) => {
                    console.log(txError);
                    reject(txError)
            })
        });

    }

    return {insert, update, getAll, findByListId};
}