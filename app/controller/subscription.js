const db = require('../config/db.config');
const globalFunctions = require('../config/global.functions.js');
const Subscription = db.subscription;
const User = db.user;

exports.findAllSubscribtions = (req, res) => {
    Subscription.findAll({
        where: {
            subscriber_id: req.params.user_id,
        },
        include: [
            {
                model: User,
                attributes: ["id", "username", "first_name", "last_name", "avatar_url"],
            },
        ]
    }).then((subscriptions) => {
        globalFunctions.sendResult(res, subscriptions);
    }).catch((err) => {
        globalFunctions.sendError(res, err);
    });
};

exports.findAllSubscribers = (req, res) => {
    Subscription.findAll({
        where: {
            user_id: req.params.user_id,
        },
        include: [
            {
                model: User,
                attributes: ["id", "username", "first_name", "last_name", "avatar_url"],
            },
        ]
    }).then((subscriptions) => {
        globalFunctions.sendResult(res, subscriptions);
    }).catch((err) => {
        globalFunctions.sendError(res, err);
    });
};

exports.create = (req, res) => {
    console.log(req.body);
    Subscription.create({
        user_id: req.body.user_id,
        subscriber_id: req.body.subscriber_id,
    }).then((result) => {
        globalFunctions.sendResult(res, result);
    }).catch((err) => {
        globalFunctions.sendError(res, err);
    });
};