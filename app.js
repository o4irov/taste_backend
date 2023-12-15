import express from 'express';
import bodyParser from 'body-parser';
import db from './app/config/db.confg';
import cors from 'cors';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({ force: false }); // force обозначает автоматическое создание таблиц в базе данных при запуске проекта

app.listen(5000)

var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
}

app.use(cors(corsOptions));