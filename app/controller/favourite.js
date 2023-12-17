const db = require('../config/db.config');
const globalFunctions = require('../config/global.functions');
const Favourite = db.favourite;
const Post = db.post;
const Ingredient = db.ingredient;
const MeasurmentType = db.measurmentType;
const Step = db.step;
const User = db.user;

exports.get = async (req, res) => {
    const result = await Favourite.findAll({
        where: {
            user_id: req.params.user_id,
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
    const formattedResult = result.map(userPost => ({
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

exports.add = (req, res) => {
    Favourite.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
    }).then((result) => {
        globalFunctions.sendResult(res, "Successfully favourited");
    }).catch((err) => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    Favourite.delete({
        where: {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        }
    }).then((result) => {
        globalFunctions.sendResult(res, "Successfully unfavourited");
    }).catch((err) => {
        globalFunctions.sendError(res, err);
    });
};