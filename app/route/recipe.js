var { authJwt } = require("../middleware");

module.exports = (app) => {

    const recipe = require('../controller/recipe');

    // Получение всех групп
    app.get('/api/posts', recipe.findAll);

    app.post('/api/addPost', [authJwt.verifyToken], recipe.createPost);

    app.post('/api/addIngredient/:post_id', [authJwt.verifyToken], recipe.createIngredient);

    app.post('/api/addStep/:post_id', [authJwt.verifyToken], recipe.createStep);

    app.post('/api/deletePost/:id', [authJwt.verifyToken], recipe.delete);

    app.get('/api/post/:id', recipe.findById);

};