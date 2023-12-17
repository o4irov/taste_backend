var { authJwt } = require("../middleware");

module.exports = (app) => {

    const user = require('../controller/user');

    // Получение всех пользователей
    app.get('/api/users', user.findAll);

    // Обновление данных пользователя по id
    app.post('/api/updateUser/:id', [authJwt.verifyToken], user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUser/:id', [authJwt.verifyToken], user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', [authJwt.verifyToken], user.findById);

    // Получение пользователя по username
    app.get('/api/user/username/:username', user.findByUsername);

    // Получение пользователя по email
    app.get('/api/user/username/:email', user.findByEmail);
};