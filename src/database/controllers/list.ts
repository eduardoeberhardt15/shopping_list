import connection from '../connection';

export interface list{
    id:number,
    status:number,
    date:Date,
    user:string,
    name?:string,
}

export default () => {

    const query = (sql:string):Promise<list[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(sql, [], (_, { rows }) => {
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

    const insert = ():Promise<number> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`insert into list values (null, 0, '${new Date()}', 1, '')`, [], 
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

    const update = ({name, status, id}:Partial<list>) => {

        const defaultQuery = "UPDATE list SET";
        const endQuery = `WHERE id = ${id}`;
        const sql:string[] = [];
        if(name) sql.push(`${defaultQuery} name = '${name}' ${endQuery}`);
        if(status) sql.push(`${defaultQuery} status = '${status}' ${endQuery}`);

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

    const getAll = ():Promise<list[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from 'list'`, [], (_, { rows }) => {
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

    const getAllOpen = async():Promise<list[]> => {

        const sql = "SELECT * FROM list WHERE status = 0";
        const list = await query(sql);
        return list;
    }

    const getAllClosed = async():Promise<list[]> => {

        const sql = "SELECT * FROM list WHERE status = 1";
        const list = await query(sql);
        return list;
    }

    const findById = (id:number):Promise<list> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from list where id=?`, [id], (_, { rows }) => {
                    //@ts-ignore
                    resolve(rows["_array"][0] || {})
                }), (sqlError:any) => {
                    console.log(sqlError);
                    reject(sqlError)
                }}, (txError) => {
                    console.log(txError);
                    reject(txError)
            })
        });

    }

    return {insert, update, getAll, findById, getAllOpen, getAllClosed};
}