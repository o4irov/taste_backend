const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
// делаем функциональность authJwt и verifySignUp доступной для обработчиков маршрутов, 
// которые будут отвечать за регистрацию и процессы идентификации, аутентификации и авторизации
module.exports = {
    authJwt,
    verifySignUp
};