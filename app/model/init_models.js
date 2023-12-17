const Role = require('./role');
const User = require('./user');
const Subscribtion = require('./subscription');
const Post = require('./post');
const UserPost = require('./user_post');
const Favourite = require('./favourite');
const Ingredient = require('./ingredient');
const MeasurmentType = require('./measurement_type');
const Step = require('./step');
const { DataTypes } = require('sequelize');

function initModels(sequelize) {
    var role = Role(sequelize, DataTypes);
    var user = User(sequelize, DataTypes);
    var subscription = Subscribtion(sequelize, DataTypes);
    var post = Post(sequelize, DataTypes);
    var userPost = UserPost(sequelize, DataTypes);
    var favourite = Favourite(sequelize, DataTypes);
    var ingredient = Ingredient(sequelize, DataTypes);
    var measurmentType = MeasurmentType(sequelize, DataTypes);
    var step = Step(sequelize, DataTypes);

    post.hasMany(ingredient, { foreignKey: 'post_id' });
    post.hasMany(step, { foreignKey: 'post_id' });

    role.hasOne(user, { foreignKey: 'role_id' });

    user.belongsTo(role, { foreignKey: 'role_id' });

    subscription.belongsTo(user, { foreignKey: 'user_id' });
    subscription.belongsTo(user, { foreignKey: 'subscriber_id' });

    userPost.belongsTo(user, { foreignKey: 'user_id' });
    userPost.belongsTo(post, { foreignKey: 'post_id' });

    favourite.belongsTo(user, { foreignKey: 'user_id' });
    favourite.belongsTo(post, { foreignKey: 'post_id' });

    ingredient.belongsTo(post, { foreignKey: 'post_id' });
    ingredient.belongsTo(measurmentType, { foreignKey: 'measurment_id' });

    step.belongsTo(post, { foreignKey: 'post_id' });

    return {
        role,
        user,
        subscription,
        post,
        userPost,
        favourite,
        ingredient,
        measurmentType,
        step,
    }
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
