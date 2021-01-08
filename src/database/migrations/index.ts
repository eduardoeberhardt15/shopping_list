import connection from '../connection';

const sql = [

    `create table if not exists category (
        id integer primary key,
        name text unique not null);`,
    
    `create table if not exists products (
        id integer primary key,
        name text unique not null,
        category integer not null,
        foreign key (category) references category (id));`,

    `create table if not exists list (
        id integer primary key autoincrement,
        status int not null,
        date datetime not null,
        user text not null,
        name text null);`,

    `create table if not exists list_item (
        id integer primary key autoincrement, 
        name int, 
        price double, 
        amount double,
        list int, 
        complete boolean,
        foreign key (list) references list (id),
        foreign key (name) references products (id));`,
    
    `INSERT INTO category VALUES (1, 'Hortifruti')`,
    `INSERT INTO category VALUES (2, 'Bebidas')`,
    `INSERT INTO category VALUES (3, 'Açougue')`,
    `INSERT INTO category VALUES (4, 'Lácteos')`,
    `INSERT INTO category VALUES (5, 'Padaria')`,
    `INSERT INTO category VALUES (6, 'Limpeza')`,
    `INSERT INTO category VALUES (7, 'Higiêne')`,
    `INSERT INTO category VALUES (8, 'Enlatados')`,
    `INSERT INTO category VALUES (9, 'Embutidos')`,
    `INSERT INTO category VALUES (10, 'Condimentos')`,
    `INSERT INTO category VALUES (11, 'Básicos')`,
    
    `INSERT INTO products VALUES (null, 'Abacate', 1)`,
    `INSERT INTO products VALUES (null, 'Abacaxi', 1)`,
    `INSERT INTO products VALUES (null, 'Açaí', 1)`,
    `INSERT INTO products VALUES (null, 'Acerola', 1)`,
    `INSERT INTO products VALUES (null, 'Amora', 1)`,
    `INSERT INTO products VALUES (null, 'Ata', 1)`,
    `INSERT INTO products VALUES (null, 'Banana', 1)`,
    `INSERT INTO products VALUES (null, 'Cacau', 1)`,
    `INSERT INTO products VALUES (null, 'Caqui', 1)`,
    `INSERT INTO products VALUES (null, 'Carambola', 1)`,
    `INSERT INTO products VALUES (null, 'Cereja', 1)`,
    `INSERT INTO products VALUES (null, 'Coco', 1)`,
    `INSERT INTO products VALUES (null, 'Figo', 1)`,
    `INSERT INTO products VALUES (null, 'Framboesa', 1)`,
    `INSERT INTO products VALUES (null, 'Fruta do conde', 1)`,
    `INSERT INTO products VALUES (null, 'Goiaba', 1)`,
    `INSERT INTO products VALUES (null, 'Groselha', 1)`,
    `INSERT INTO products VALUES (null, 'Ingá', 1)`,
    `INSERT INTO products VALUES (null, 'Jabuticaba', 1)`,
    `INSERT INTO products VALUES (null, 'Jaca', 1)`,
    `INSERT INTO products VALUES (null, 'Jambo', 1)`,
    `INSERT INTO products VALUES (null, 'Kiwi', 1)`,
    `INSERT INTO products VALUES (null, 'Laranja', 1)`,
    `INSERT INTO products VALUES (null, 'Limão', 1)`,
    `INSERT INTO products VALUES (null, 'Maçã', 1)`,
    `INSERT INTO products VALUES (null, 'Mamão', 1)`,
    `INSERT INTO products VALUES (null, 'Manga', 1)`,
    `INSERT INTO products VALUES (null, 'Maracujá', 1)`,
    `INSERT INTO products VALUES (null, 'Melancia', 1)`,
    `INSERT INTO products VALUES (null, 'Melão', 1)`,
    `INSERT INTO products VALUES (null, 'Morango', 1)`,
    `INSERT INTO products VALUES (null, 'Pera', 1)`,
    `INSERT INTO products VALUES (null, 'Pessego', 1)`,
    `INSERT INTO products VALUES (null, 'Pitanga', 1)`,
    `INSERT INTO products VALUES (null, 'Romã', 1)`,
    `INSERT INTO products VALUES (null, 'Tamara', 1)`,
    `INSERT INTO products VALUES (null, 'Tangerina', 1)`,
    `INSERT INTO products VALUES (null, 'Uva', 1)`,
    
    `INSERT INTO products VALUES (null, 'Abobora', 1)`,
    `INSERT INTO products VALUES (null, 'Abobrinha', 1)`,
    `INSERT INTO products VALUES (null, 'Acelga', 1)`,
    `INSERT INTO products VALUES (null, 'Agrião', 1)`,
    `INSERT INTO products VALUES (null, 'Alcachofra', 1)`,
    `INSERT INTO products VALUES (null, 'Alface', 1)`,
    `INSERT INTO products VALUES (null, 'Alho', 1)`,
    `INSERT INTO products VALUES (null, 'Alho-poró', 1)`,
    `INSERT INTO products VALUES (null, 'Almeirão', 1)`,
    `INSERT INTO products VALUES (null, 'Aspargo', 1)`,
    `INSERT INTO products VALUES (null, 'Batata', 1)`,
    `INSERT INTO products VALUES (null, 'Berinjela', 1)`,
    `INSERT INTO products VALUES (null, 'Beterraba', 1)`,
    `INSERT INTO products VALUES (null, 'Brocolis', 1)`,
    `INSERT INTO products VALUES (null, 'Cará', 1)`,
    `INSERT INTO products VALUES (null, 'Cenoura', 1)`,
    `INSERT INTO products VALUES (null, 'Cebola', 1)`,
    `INSERT INTO products VALUES (null, 'Chicória', 1)`,
    `INSERT INTO products VALUES (null, 'Chuchu', 1)`,
    `INSERT INTO products VALUES (null, 'Couve', 1)`,
    `INSERT INTO products VALUES (null, 'Couve-flor', 1)`,
    `INSERT INTO products VALUES (null, 'Escarola', 1)`,
    `INSERT INTO products VALUES (null, 'Espinafre', 1)`,
    `INSERT INTO products VALUES (null, 'Grao-de-bico', 1)`,
    `INSERT INTO products VALUES (null, 'Inhame', 1)`,
    `INSERT INTO products VALUES (null, 'Jiló', 1)`,
    `INSERT INTO products VALUES (null, 'Lentilha', 1)`,
    `INSERT INTO products VALUES (null, 'Mandioca', 1)`,
    `INSERT INTO products VALUES (null, 'Milho-verde', 1)`,
    `INSERT INTO products VALUES (null, 'Nabo', 1)`,
    `INSERT INTO products VALUES (null, 'Palmito', 1)`,
    `INSERT INTO products VALUES (null, 'Pepino', 1)`,
    `INSERT INTO products VALUES (null, 'Pimentão', 1)`,
    `INSERT INTO products VALUES (null, 'Quiabo', 1)`,
    `INSERT INTO products VALUES (null, 'Raiz forte', 1)`,
    `INSERT INTO products VALUES (null, 'Repolho', 1)`,
    `INSERT INTO products VALUES (null, 'Rucula', 1)`,
    `INSERT INTO products VALUES (null, 'Salsinha', 1)`,
    `INSERT INTO products VALUES (null, 'Salsão', 1)`,
    `INSERT INTO products VALUES (null, 'Tomate', 1)`,
    `INSERT INTO products VALUES (null, 'Vagem', 1)`,

    `INSERT INTO products VALUES (null, 'Agua', 2)`,
    `INSERT INTO products VALUES (null, 'Cha', 2)`,
    `INSERT INTO products VALUES (null, 'Café', 2)`,
    `INSERT INTO products VALUES (null, 'Refrigerante', 2)`,
    `INSERT INTO products VALUES (null, 'Vinho', 2)`,
    `INSERT INTO products VALUES (null, 'Cerveja', 2)`,
    `INSERT INTO products VALUES (null, 'Suco', 2)`,
    `INSERT INTO products VALUES (null, 'Energético', 2)`,
    `INSERT INTO products VALUES (null, 'Poupa', 2)`,

    `INSERT INTO products VALUES (null, 'Carne de boi', 3)`,
    `INSERT INTO products VALUES (null, 'Carne de porco', 3)`,
    `INSERT INTO products VALUES (null, 'Carne de frango', 3)`,
    `INSERT INTO products VALUES (null, 'Peixe', 3)`,
    `INSERT INTO products VALUES (null, 'Camarão', 3)`,
    `INSERT INTO products VALUES (null, 'Frutos do mar', 3)`,
    `INSERT INTO products VALUES (null, 'Ovos', 3)`,

    `INSERT INTO products VALUES (null, 'Leite', 4)`,
    `INSERT INTO products VALUES (null, 'Achocolatado', 4)`,
    `INSERT INTO products VALUES (null, 'Leite condensado', 4)`,
    `INSERT INTO products VALUES (null, 'Creme de leite', 4)`,
    `INSERT INTO products VALUES (null, 'Queijo', 4)`,
    `INSERT INTO products VALUES (null, 'Queijo-ralado', 4)`,
    `INSERT INTO products VALUES (null, 'Iogurte', 4)`,
    `INSERT INTO products VALUES (null, 'Manteiga', 4)`,
    `INSERT INTO products VALUES (null, 'Margarina', 4)`,
    `INSERT INTO products VALUES (null, 'Requeijão', 4)`,

    `INSERT INTO products VALUES (null, 'Pao', 5)`,
    `INSERT INTO products VALUES (null, 'Pao-de-queijo', 5)`,
    `INSERT INTO products VALUES (null, 'Biscoito', 5)`,
    `INSERT INTO products VALUES (null, 'Bolacha', 5)`,
    `INSERT INTO products VALUES (null, 'Bolo', 5)`,
    `INSERT INTO products VALUES (null, 'Torta', 5)`,
    `INSERT INTO products VALUES (null, 'Cuca', 5)`,
    `INSERT INTO products VALUES (null, 'Sonho', 5)`,
    `INSERT INTO products VALUES (null, 'Salgado', 5)`,

    `INSERT INTO products VALUES (null, 'Sabão em pó', 6)`,
    `INSERT INTO products VALUES (null, 'Amaciante', 6)`,
    `INSERT INTO products VALUES (null, 'Sabão em barra', 6)`,
    `INSERT INTO products VALUES (null, 'Alcool', 6)`,
    `INSERT INTO products VALUES (null, 'Agua sanitária', 6)`,
    `INSERT INTO products VALUES (null, 'Detergente', 6)`,
    `INSERT INTO products VALUES (null, 'Desinfetante', 6)`,
    `INSERT INTO products VALUES (null, 'Sacos de lixo', 6)`,
    `INSERT INTO products VALUES (null, 'Tira manchas', 6)`,
    `INSERT INTO products VALUES (null, 'Esponja', 6)`,
    `INSERT INTO products VALUES (null, 'Palha de aço', 6)`,
    `INSERT INTO products VALUES (null, 'Limpa vidros', 6)`,
    `INSERT INTO products VALUES (null, 'Desengordurante', 6)`,

    `INSERT INTO products VALUES (null, 'Sabonete', 7)`,
    `INSERT INTO products VALUES (null, 'Pasta de dente', 7)`,
    `INSERT INTO products VALUES (null, 'Papel higiênico', 7)`,
    `INSERT INTO products VALUES (null, 'Hidratante', 7)`,
    `INSERT INTO products VALUES (null, 'Fio dental', 7)`,
    `INSERT INTO products VALUES (null, 'Shampoo', 7)`,
    `INSERT INTO products VALUES (null, 'Condicionador', 7)`,
    `INSERT INTO products VALUES (null, 'Cotonete', 7)`,
    `INSERT INTO products VALUES (null, 'Absorvente', 7)`,
    `INSERT INTO products VALUES (null, 'Enxaguante bucal', 7)`,
    `INSERT INTO products VALUES (null, 'Lamina de barbear', 7)`,

    `INSERT INTO products VALUES (null, 'Milho', 8)`,
    `INSERT INTO products VALUES (null, 'Ervilha', 8)`,
    `INSERT INTO products VALUES (null, 'Atum', 8)`,
    `INSERT INTO products VALUES (null, 'Azeitona', 8)`,
    `INSERT INTO products VALUES (null, 'Cogumelo', 8)`,
    `INSERT INTO products VALUES (null, 'Salrdinha', 8)`,
    `INSERT INTO products VALUES (null, 'Alspargo', 8)`,

    `INSERT INTO products VALUES (null, 'Presunto', 9)`,
    `INSERT INTO products VALUES (null, 'Apresuntado', 9)`,
    `INSERT INTO products VALUES (null, 'Peito de peru', 9)`,
    `INSERT INTO products VALUES (null, 'Salame', 9)`,
    `INSERT INTO products VALUES (null, 'Mortadela', 9)`,
    `INSERT INTO products VALUES (null, 'Bacon', 9)`,
    `INSERT INTO products VALUES (null, 'Salsiha', 9)`,
    `INSERT INTO products VALUES (null, 'Carne seca', 9)`,

    `INSERT INTO products VALUES (null, 'Catchup', 10)`,
    `INSERT INTO products VALUES (null, 'Mostarda', 10)`,
    `INSERT INTO products VALUES (null, 'Maionese', 10)`,
    `INSERT INTO products VALUES (null, 'Molho de tomate', 10)`,
    `INSERT INTO products VALUES (null, 'Alecrin', 10)`,
    `INSERT INTO products VALUES (null, 'Cravo', 10)`,
    `INSERT INTO products VALUES (null, 'Canela', 10)`,
    `INSERT INTO products VALUES (null, 'Noz-moscada', 10)`,
    `INSERT INTO products VALUES (null, 'Oregano', 10)`,
    `INSERT INTO products VALUES (null, 'Pimenta', 10)`,
    `INSERT INTO products VALUES (null, 'Coentro', 10)`,
    `INSERT INTO products VALUES (null, 'Vinagre', 10)`,
    `INSERT INTO products VALUES (null, 'Azeite', 10)`,

    `INSERT INTO products VALUES (null, 'Arroz', 11)`,
    `INSERT INTO products VALUES (null, 'Feijão', 11)`,
    `INSERT INTO products VALUES (null, 'Macarrão', 11)`,
    `INSERT INTO products VALUES (null, 'Farinha de trigo', 11)`,
    `INSERT INTO products VALUES (null, 'Farinha de milho', 11)`,
    `INSERT INTO products VALUES (null, 'Farinha de mandioca', 11)`,
    `INSERT INTO products VALUES (null, 'Oleo', 11)`,
    `INSERT INTO products VALUES (null, 'Sal', 11)`,
    `INSERT INTO products VALUES (null, 'Acucar', 11)`,
    `INSERT INTO products VALUES (null, 'Fermento', 11)`,
    `INSERT INTO products VALUES (null, 'Gelatina', 11)`,
    `INSERT INTO products VALUES (null, 'Massas', 11)`,
    `INSERT INTO products VALUES (null, 'Compota', 11)`,


];

/*

*/

const sqlReset = [
    'DROP TABLE IF EXISTS list_item',
    'DROP TABLE IF EXISTS list',
    'DROP TABLE IF EXISTS products',
    'DROP TABLE IF EXISTS category'
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