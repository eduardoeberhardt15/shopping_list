import connection from "../connection";

export interface list {
  id: number;
  status: number;
  date: Date;
  user: string;
  name?: string;
}

export default () => {
  const query = (sql: string): Promise<list[]> => {
    return new Promise((resolve, reject) => {
      connection.transaction(
        (tx) => {
          // eslint-disable-next-line no-unused-expressions
          tx.executeSql(sql, [], (_, { rows }) => {
            resolve(rows["_array"] || []);
          }),
            (sqlError: string) => {
              console.log(sqlError);
              reject(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
          reject(txError);
        }
      );
    });
  };

  const insert = (name: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      connection.transaction(
        (tx) => {
          // eslint-disable-next-line no-unused-expressions
          tx.executeSql(
            `insert into list values (null, 0, '${new Date()}', 1, '${name}')`,
            [],
            function (tx, res) {
              resolve(res.insertId);
            }
          ),
            (sqlError: string) => {
              console.log("sqlError", sqlError);
              reject(sqlError);
            };
        },
        (txError) => {
          console.log("txError", txError);
          reject(txError);
        }
      );
    });
  };

  const update = ({ name, status, id }: Partial<list>) => {
    const defaultQuery = "UPDATE list SET";
    const endQuery = `WHERE id = ${id}`;
    const sql: string[] = [];
    if (name) sql.push(`${defaultQuery} name = '${name}' ${endQuery}`);
    if (status) sql.push(`${defaultQuery} status = '${status}' ${endQuery}`);

    return new Promise((resolve, reject) => {
      connection.transaction(
        (tx) => {
          // eslint-disable-next-line no-unused-expressions
          sql.map((sql) =>
            tx.executeSql(sql, [], (_, { rowsAffected }) => {
              resolve(rowsAffected || 0);
            })
          ),
            (sqlError: string) => {
              console.log(sqlError);
              reject(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
          reject(txError);
        }
      );
    });
  };

  const getAll = (): Promise<list[]> => {
    return new Promise((resolve, reject) => {
      connection.transaction(
        (tx) => {
          // eslint-disable-next-line no-unused-expressions
          tx.executeSql(`select * from 'list'`, [], (_, { rows }) => {
            resolve(rows["_array"] || []);
          }),
            (sqlError: string) => {
              console.log(sqlError);
              reject(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
          reject(txError);
        }
      );
    });
  };

  const getAllOpen = async (): Promise<list[]> => {
    const sql = "SELECT * FROM list WHERE status = 0";
    const list = await query(sql);
    return list ? list : [];
  };

  const getAllClosed = async (): Promise<list[]> => {
    const sql = "SELECT * FROM list WHERE status = 1";
    const list = await query(sql);
    return list;
  };

  const findById = (id: number): Promise<list> => {
    return new Promise((resolve, reject) => {
      connection.transaction(
        (tx) => {
          // eslint-disable-next-line no-unused-expressions
          tx.executeSql(
            `select * from list where id=?`,
            [id],
            (_, { rows }) => {
              resolve(rows["_array"][0] || {});
            }
          ),
            (sqlError: string) => {
              console.log(sqlError);
              reject(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
          reject(txError);
        }
      );
    });
  };

  return { insert, update, getAll, findById, getAllOpen, getAllClosed };
};
