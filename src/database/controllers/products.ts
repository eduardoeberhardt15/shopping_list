import connection from '../connection';

interface products{
    id?:number,
    name:string,
    category:string
}

export default () => {

    const insert = ({name, category}:products):Promise<number> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`insert into products values (null, '${name}', '${category}' )`, [], 
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

    const getAll = ():Promise<products[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from 'products'`, [], (_, { rows }) => {
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

    const findByListId = (id:number):Promise<products[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from products where list=?`, [id], (_, { rows }) => {
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