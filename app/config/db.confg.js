import Sequelize from 'sequelize';
// Подключение моделей
import { initModels } from '../model/init-models';

var dbProperties = {
    database: 'taste', // название базы данных
    username: 'root', // имя пользователя, для которого настроены права к базе данных, 'root' задаётся по умолчанию
    password: '', // пароль пользователя, по умолчанию пароль пустой
    host: 'localhost', // имя сервера, на котором расположена база данных
    dialect: 'mysql', // используемая СУБД
    pool: { // параметры соединения
        max: 5, // максимальное количество одновременно открытых соединений
        min: 0, // минимальное количество соединений
        acquire: 30000, // максимальное время в миллисекундах, в течение которого пул (набор соединений к БД) будет пытаться установить соединение, прежде чем выдаст ошибку
        idle: 10000 // время в миллисекундах, в течение которого соединение может простаивать, прежде чем оно будет удалено
    }
};

var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        }
    }
);

var db = initModels(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;