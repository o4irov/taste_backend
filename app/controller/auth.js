var db = require("../config/db.config");
var config = require("../config/auth.config");
var User = db.user;
var globalFunctions = require('../config/global.functions.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// регистрация пользователя
exports.register = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10), // генерация хеша пароля
        avatar_url: req.body.avatar_url,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        blog_description: req.body.blog_description,
        role_id: req.body.role_id,
    })
        .then(() => {
            var result = {
                message: "Пользователь зарегистрирован"
            };
            globalFunctions.sendResult(res, result);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// проверка данных пользователя
exports.login = (req, res) => {
    const password = req.body.password;
    if (req.body.username === undefined) {
        loginUserByEmail(res, req.body.email, password);
    } else {
        loginUserByUsername(res, req.body.username, password);
    }
};

function loginUserByEmail(res, email, password) {
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            loginUser(res, user, password);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
}

function loginUserByUsername(res, username, password) {
    User.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            loginUser(res, user, password);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
}

function loginUser(res, user, password) {
    if (!user) {
        res.status(404).send({ message: "Неверно введенный логин и/или пароль" });
        return;
    }

    var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );
    if (!passwordIsValid) {
        res.status(401).send({
            accessToken: null,
            message: "Неверно введенный логин и/или пароль"
        });
        return;
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "10h" // 10 часов — время действия токена
    });
    console.log("Токен при авторизации");
    console.log(token);
    var object = {
        id: user.id,
        username: user.username,
        accessToken: token
    };
    globalFunctions.sendResult(res, object);
}

// обновление токена jwt (когда срок действия текущего истекает)
exports.refreshToken = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                globalFunctions.sendError(res, "Неверно введенный логин и/или пароль");
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: "1h" // 1 час — время действия токена
            });
            console.log("Новый токен");
            console.log(token);
            var object = {
                id: user.id,
                username: user.username,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// проверка, что пользователь авторизован
exports.userBoard = (req, res) => {
    globalFunctions.sendResult(res, "Пользователь авторизован");
};