const db = require('../config/db.config');
const globalFunctions = require('../config/global.functions');
const Post = db.post;
const Ingredient = db.ingredient;
const MeasurmentType = db.measurmentType;
const Step = db.step;
const UserPost = db.userPost;
const User = db.user;

exports.findAll = async (req, res) => {
    const result = await UserPost.findAll({
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

exports.userPosts = (req, res) => {
    UserPost.findAll({
        where: {
            user_id: req.params.user_id,
        },
        include: [
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
    }).then((posts) => {
        globalFunctions.sendResult(res, posts);
    }).catch((err) => {
        globalFunctions.sendError(res, err);
    });
}

exports.createPost = (req, res) => {
    Post.create({
        title: req.body.title,
        title_image_url: req.body.title_image_url,
        likes: req.body.likes,
        views: req.body.views,
        time: req.body.time,
        portion: req.body.portion,
    }).then(object => {
        const post = object;
        UserPost.create({
            user_id: req.body.user_id,
            post_id: post.id,
        }).then(_ => {
            globalFunctions.sendResult(res, post);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.createIngredient = (req, res) => {
    Ingredient.create({
        name: req.body.name,
        post_id: req.params.post_id,
        measurment_id: req.body.measurment_id,
        quantity: req.body.quantity,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.createStep = (req, res) => {
    Step.create({
        post_id: req.params.post_id,
        number: req.body.number,
        body: req.body.body,
        image_url: req.body.image_url,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = async (req, res) => {
    const result = await Post.findByPk(req.params.id,
        {
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
        }).catch(err => {
            globalFunctions.sendError(res, err);
            return;
        });

    globalFunctions.sendResult(res, JSON.stringify(result));
};
