var express = require('express');
var bodyParser = require('body-parser');
var db = require('./app/config/db.config.js');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({ force: false }); // force обозначает автоматическое создание таблиц в базе данных при запуске проекта

app.listen(3000)

var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
}

app.use(cors(corsOptions));

var auth = require('./app/route/auth.js');
auth(app);

var user = require('./app/route/user.js');
user(app);

var role = require('./app/route/role.js');
role(app);

var recipe = require('./app/route/recipe.js');
recipe(app);

var subscription = require('./app/route/subscription.js');
subscription(app);