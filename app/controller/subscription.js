const db = require('../config/db.config');
const globalFunctions = require('../config/global.functions.js');
const Subscription = db.subscription;
const Post = db.post;
const Ingredient = db.ingredient;
const MeasurmentType = db.measurmentType;
const Step = db.step;
const UserPost = db.userPost;
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

exports.findSubscriptionPosts = async (req, res) => {
    var subscriptions = await Subscription.findAll({
        where: {
            subscriber_id: req.params.user_id,
        },
    }).catch((err) => {
        globalFunctions.sendError(res, err);
        return;
    });

    var ids = new Set();
    subscriptions.map((subscription) => {
        ids.add(subscription.user_id);
    });

    const result = await UserPost.findAll({
        where: {

        },
        include: [
            {
                model: User,
                attributes: ["id", "username", "first_name", "last_name", "avatar_url"],
            },
            {
                model: Post,
                attributes: ["id", "title", "title_image_url", "likes", "views", "time", "portion"],
                include: [
                    {
                        model: Ingredient,
                        attributes: ['id', 'name', 'quantity'],
                        include: [
                            {
                                model: MeasurmentType,
                                attributes: ['name', 'small_name'],
                                required: false, // Используйте false, если хотите получить записи, даже если нет соответствия в MeasurementType
                            },
                        ],
                    },
                    {
                        model: Step,
                        attributes: ['id', 'number', 'body', 'image_url'],
                    },
                ],
            }
        ]
    }).catch(err => {
        globalFunctions.sendError(res, err);
        return;
    });

    // Преобразование результатов в желаемый формат
    const formattedResult = result
        .filter(userPost => ids.has(userPost.User.id))
        .map(userPost => ({
            post: {
                id: userPost.Post.id,
                title: userPost.Post.title,
                title_image_url: userPost.Post.title_image_url,
                likes: userPost.Post.likes,
                views: userPost.Post.views,
                time: userPost.Post.time,
                portion: userPost.Post.portion
            },
            ingredients: userPost.Post.Ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
                MeasurmentType: {
                    name: ingredient.MeasurmentType ? ingredient.MeasurmentType.name : null,
                    small_name: ingredient.MeasurmentType ? ingredient.MeasurmentType.small_name : null,
                },
                quantity: ingredient.quantity,
            })),
            steps: userPost.Post.Steps.map(step => ({
                id: step.id,
                number: step.number,
                body: step.body,
                image_url: step.image_url,
            })),
            author: userPost.User,
        }));

    globalFunctions.sendResult(res, JSON.stringify(formattedResult));
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