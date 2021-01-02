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

    return {insert};
}