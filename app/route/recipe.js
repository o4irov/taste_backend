var { authJwt } = require("../middleware");

module.exports = (app) => {

    const recipe = require('../controller/recipe');

    app.get('/api/posts', recipe.findAll);

    app.get('/api/userPosts/:user_id', recipe.userPosts);

    app.post('/api/addPost', [authJwt.verifyToken], recipe.createPost);

    app.post('/api/addIngredient/:post_id', [authJwt.verifyToken], recipe.createIngredient);

    app.post('/api/addStep/:post_id', [authJwt.verifyToken], recipe.createStep);

    app.post('/api/deletePost/:id', [authJwt.verifyToken], recipe.delete);

    app.get('/api/post/:id', recipe.findById);

};