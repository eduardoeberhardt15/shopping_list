import connection from '../connection';

export interface products{
    id:number,
    name:string,
    category?:number,
    favorite?: boolean
}

export default () => {

    const insert = ({name, category}:products):Promise<number> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`insert into products values (null, '${name}', 0, ${category} )`, [], 
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

    const update = ({favorite, productId}:Partial<products>) => {

        const defaultQuery = "UPDATE products SET";
        const endQuery = `WHERE id = ${productId}`;
        const sql:string[] = [];
        //if(price) sql.push(`${defaultQuery} price = '${price}' ${endQuery}`);
        sql.push(`${defaultQuery} favorite = '${favorite ? 1 : 0}' ${endQuery}`);       

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

    const getFavorite = ():Promise<products[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`SELECT * FROM 'products' WHERE favorite= '1'`, [], (_, { rows }) => {
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

    const findByName = (name:string):Promise<products[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from products where name like ? ORDER BY name ASC`, [`%${name}%`], (_, { rows }) => {
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

    const findByCategory = (category:string):Promise<products[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`SELECT p.id, p.name, p.favorite, c.name as category FROM products p 
                    LEFT JOIN category c ON p.category=c.id
                    WHERE c.name like ? ORDER BY p.name ASC`, [`%${category}%`], (_, { rows }) => {
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

    return {insert, update, getAll, findByListId, findByName, findByCategory, getFavorite};
}