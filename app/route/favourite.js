var { authJwt } = require("../middleware");

module.exports = (app) => {

    const favourite = require('../controller/favourite');

    app.get('/api/favourite/:user_id', [authJwt.verifyToken], favourite.get);

    app.post('/api/addFavourite', [authJwt.verifyToken], favourite.add);

    app.post('/api/deleteFavourite', [authJwt.verifyToken], favourite.delete);
};