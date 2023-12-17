var { authJwt } = require("../middleware");

module.exports = (app) => {

    const subscription = require('../controller/subscription');

    app.get('/api/subscribtions/:user_id', [authJwt.verifyToken], subscription.findAllSubscribtions);

    app.get('/api/subscribtionsPosts/:user_id', [authJwt.verifyToken], subscription.findSubscriptionPosts);

    app.get('/api/subscribers/:user_id', [authJwt.verifyToken], subscription.findAllSubscribers);

    app.post('/api/subscribe', [authJwt.verifyToken], subscription.create);
};