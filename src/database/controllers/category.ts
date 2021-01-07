import connection from '../connection';

export interface category{
    id:number,
    name:string,

}

export default () => {

    const getAll = ():Promise<category[]> => {

        return new Promise((resolve, reject) => {
            connection.transaction(tx => {
                tx.executeSql(`select * from category ORDER BY name ASC`, [], (_, { rows }) => {
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


    return {getAll};
}