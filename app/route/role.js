var { authJwt } = require("../middleware");

module.exports = (app) => {

    const role = require('../controller/role');

    app.get('/api/roles', role.findAll);

    app.post('/api/addRole', [authJwt.verifyToken], role.create);

    app.post('/api/updateRole/:id', [authJwt.verifyToken], role.update);

    app.post('/api/deleteRole/:id', [authJwt.verifyToken], role.delete);

    app.get('/api/role/:id', [authJwt.verifyToken], role.findById);

};