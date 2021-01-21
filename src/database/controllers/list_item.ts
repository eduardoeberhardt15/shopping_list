import connection from '../connection';

interface list_item{
    id?:number,
    name_id:number,
    price:number,
    amount?: number,
    list:number,
    complete?: boolean
}

export default () => {

    const insert = ({name_id, price, list}:list_item):Promise<number> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`insert into list_item values (null, '${name_id}', ${price}, 1, ${list}, 0)`, [], 
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

    const update = ({id, list, price, complete=0, amount}:Partial<list_item>) => { 

        const defaultQuery = "UPDATE list_item SET";
        const endQuery = `WHERE id = ${id} AND list = ${list}`;
        const sql:string[] = [];
        if(price) sql.push(`${defaultQuery} price = '${price}' ${endQuery}`);
        if(amount) sql.push(`${defaultQuery} amount = '${amount}' ${endQuery}`);
        sql.push(`${defaultQuery} complete = '${complete}' ${endQuery}`);

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                sql.map(sql=>
                tx.executeSql(sql, [], (_, { rowsAffected }) => {
                    //@ts-ignore
                    resolve(rowsAffected || 0)
                })), (sqlError:any) => {
                    console.log(sqlError);
                    reject(sqlError)
                }}, (txError) => {
                    console.log(txError);
                    reject(txError)
            })
        });

    }

    const deleteItem = ({id, list}:list_item):Promise<number> => { 

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`DELETE FROM list_item WHERE id=? AND list=?`, [id, list], (_, { rowsAffected }) => {
                    //@ts-ignore
                    resolve(rowsAffected || 0)
                }), (sqlError:any) => {
                    console.log(sqlError);
                    reject(sqlError)
                }}, (txError) => {
                    console.log(txError);
                    reject(txError)
            })
        });
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
                select li.id, p.name, li.list, li.price, li.amount, li.complete, p.favorite, p.id as productId from list_item li
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

    const totalPriceById = (id:number, complete?:number):Promise<list_item[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`
                select sum(li.price*li.amount) as total from list_item li
                LEFT JOIN products p
                ON li.name = p.id where li.list=? and li.complete=?`, [id, complete || 0], (_, { rows }) => {
                    
                    //@ts-ignore
                    resolve(rows["_array"][0].total || 0);
                    
                }), (sqlError:any) => {
                    console.log(sqlError);
                    reject(sqlError)
                }}, (txError) => {
                    console.log(txError);
                    reject(txError)
            })
        });

    }

    return {insert, update, getAll, findByListId, deleteItem, totalPriceById};
}