import { Sequelize } from "sequelize";
const db = new Sequelize('sistemaRecepcion', 'root', '',{
    host:'127.0.0.1', //localhost
    dialect:'mysql',
    port: 3306
});

export default db