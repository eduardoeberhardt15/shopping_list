import connection from '../connection';
import {AsyncStorage} from 'react-native';
const version = 2;

const sql = [

    `create table if not exists category (
        id integer primary key,
        name text unique not null);`,
    
    `create table if not exists products (
        id integer primary key,
        name text unique not null,
        favorite boolean,
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
    
    `INSERT INTO products VALUES (null, 'Abacate', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Abacaxi', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Açaí', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Acerola', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Amora', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Ata', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Banana', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Cacau', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Caqui', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Carambola', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Cereja', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Coco', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Figo', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Framboesa', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Fruta do conde', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Goiaba', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Groselha', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Ingá', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Jabuticaba', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Jaca', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Jambo', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Kiwi', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Laranja', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Limão', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Maçã', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Mamão', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Manga', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Maracujá', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Melancia', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Melão', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Morango', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Pera', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Pessego', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Pitanga', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Romã', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Tamara', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Tangerina', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Uva', 0, 1)`,
    
    `INSERT INTO products VALUES (null, 'Abobora', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Abobrinha', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Acelga', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Agrião', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Alcachofra', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Alface', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Alho', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Alho-poró', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Almeirão', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Aspargo', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Batata', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Berinjela', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Beterraba', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Brocolis', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Cará', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Cenoura', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Cebola', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Chicória', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Chuchu', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Couve', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Couve-flor', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Escarola', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Espinafre', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Grao-de-bico', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Inhame', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Jiló', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Lentilha', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Mandioca', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Milho-verde', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Nabo', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Palmito', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Pepino', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Pimentão', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Quiabo', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Raiz forte', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Repolho', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Rucula', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Salsinha', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Salsão', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Tomate', 0, 1)`,
    `INSERT INTO products VALUES (null, 'Vagem', 0, 1)`,

    `INSERT INTO products VALUES (null, 'Agua', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Cha', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Café', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Refrigerante', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Vinho', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Cerveja', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Suco', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Energético', 0, 2)`,
    `INSERT INTO products VALUES (null, 'Poupa', 0, 2)`,

    `INSERT INTO products VALUES (null, 'Carne de boi', 0, 3)`,
    `INSERT INTO products VALUES (null, 'Carne de porco', 0, 3)`,
    `INSERT INTO products VALUES (null, 'Carne de frango', 0, 3)`,
    `INSERT INTO products VALUES (null, 'Peixe', 0, 3)`,
    `INSERT INTO products VALUES (null, 'Camarão', 0, 3)`,
    `INSERT INTO products VALUES (null, 'Frutos do mar', 0, 3)`,
    `INSERT INTO products VALUES (null, 'Ovos', 0, 3)`,

    `INSERT INTO products VALUES (null, 'Leite', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Achocolatado', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Leite condensado', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Creme de leite', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Queijo', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Queijo-ralado', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Iogurte', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Manteiga', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Margarina', 0, 4)`,
    `INSERT INTO products VALUES (null, 'Requeijão', 0, 4)`,

    `INSERT INTO products VALUES (null, 'Pao', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Pao-de-queijo', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Biscoito', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Bolacha', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Bolo', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Torta', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Cuca', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Sonho', 0, 5)`,
    `INSERT INTO products VALUES (null, 'Salgado', 0, 5)`,

    `INSERT INTO products VALUES (null, 'Sabão em pó', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Amaciante', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Sabão em barra', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Alcool', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Agua sanitária', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Detergente', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Desinfetante', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Sacos de lixo', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Tira manchas', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Esponja', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Palha de aço', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Limpa vidros', 0, 6)`,
    `INSERT INTO products VALUES (null, 'Desengordurante', 0, 6)`,

    `INSERT INTO products VALUES (null, 'Sabonete', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Pasta de dente', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Papel higiênico', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Hidratante', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Fio dental', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Shampoo', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Condicionador', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Cotonete', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Absorvente', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Enxaguante bucal', 0, 7)`,
    `INSERT INTO products VALUES (null, 'Lamina de barbear', 0, 7)`,

    `INSERT INTO products VALUES (null, 'Milho', 0, 8)`,
    `INSERT INTO products VALUES (null, 'Ervilha', 0, 8)`,
    `INSERT INTO products VALUES (null, 'Atum', 0, 8)`,
    `INSERT INTO products VALUES (null, 'Azeitona', 0, 8)`,
    `INSERT INTO products VALUES (null, 'Cogumelo', 0, 8)`,
    `INSERT INTO products VALUES (null, 'Salrdinha', 0, 8)`,
    `INSERT INTO products VALUES (null, 'Alspargo', 0, 8)`,

    `INSERT INTO products VALUES (null, 'Presunto', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Apresuntado', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Peito de peru', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Salame', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Mortadela', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Bacon', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Salsiha', 0, 9)`,
    `INSERT INTO products VALUES (null, 'Carne seca', 0, 9)`,

    `INSERT INTO products VALUES (null, 'Catchup', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Mostarda', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Maionese', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Molho de tomate', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Alecrin', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Cravo', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Canela', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Noz-moscada', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Oregano', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Pimenta', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Coentro', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Vinagre', 0, 10)`,
    `INSERT INTO products VALUES (null, 'Azeite', 0, 10)`,

    `INSERT INTO products VALUES (null, 'Arroz', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Feijão', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Macarrão', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Farinha de trigo', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Farinha de milho', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Farinha de mandioca', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Oleo', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Sal', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Acucar', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Fermento', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Gelatina', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Massas', 0, 11)`,
    `INSERT INTO products VALUES (null, 'Compota', 0, 11)`,


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

    const init = async ():Promise<boolean> =>{

        const actualVersion = await AsyncStorage.getItem("version") || 0;
        if(Number(actualVersion)!==version){
            await reset();
            AsyncStorage.setItem("version", String(version));
        }
        

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
        //await init();
        return true;
    }


    return {init, reset};
}