var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var User = db.user; // название модели смотреть в init-models.js

// Получение всех пользователей
exports.findAll = (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email', 'avatar_url', 'first_name', 'last_name', 'blog_description', 'role_id'],
    })
        .then(objects => {
            // возврат найденных записей
            globalFunctions.sendResult(res, objects)
        }).catch(err => {
            // возврат найденной ошибки
            globalFunctions.sendError(res, err)
        })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            User.update({
                username: req.body.username ?? user.username,
                email: req.body.email ?? user.email,
                password: req.body.password,
                avatar_url: req.body.avatar_url ?? user.avatar_url,
                first_name: req.body.first_name ?? user.first_name,
                last_name: req.body.last_name ?? user.last_name,
                blog_description: req.body.blog_description ?? user.blog_description,
                role_id: req.body.role_id ?? user.role_id,
                tg: req.body.tg ?? user.tg,
                youtube: req.body.youtube ?? user.youtube,
                vk: req.body.vk ?? user.vk,
            },
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then(object => {
                console.log(object);
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных пользователя по id
exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных пользователя по username
exports.findByUsername = (req, res) => {
    User.findAll({
        where: {
            username: req.params.username
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Получение данных пользователя по username
exports.findByEmail = (req, res) => {
    User.findAll({
        where: {
            email: req.params.email
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};