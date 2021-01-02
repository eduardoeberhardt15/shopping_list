import connection from '../connection';

export default () => {

    const insert = () => {

        connection.transaction(tx => {
            tx.executeSql(`insert into list values (null, 0, '${new Date()}', 1)`, [], 
            (success)=> {
                console.log(success)
            }), 
            (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        });
    }

    const update = () => {

    }

    const getAll = () => {

        connection.transaction(tx => {
            tx.executeSql(`select * from 'list'`, [], (_, { rows }) => {
                console.log(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        })

    }

    const findById = (id:string) => {

        connection.transaction(tx => {
            tx.executeSql(`select * from list where id=?`, [id], (_, { rows }) => {
                console.log(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        })

    }

    return {insert, update, getAll, findById};
}