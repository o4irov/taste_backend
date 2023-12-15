import Role from './models/Role';
import User from './models/User';
import Subscribtion from './models/Subscribtion';
import Post from './models/Post';
import UserPost from './models/UserPost';
import Favourite from './models/Favourite';
import Ingredient from './models/Ingredient';
import MeasurmentType from './models/MeasurmentType';
import Step from './models/Step';
import { DataTypes } from 'sequelize';

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

    role.hasOne(user, { foreignKey: 'role_id' });
    user.belongsTo(role, { foreignKey: 'role_id' });

    subscription.belongsTo(user, { foreignKey: 'user_id' });
    subscription.belongsTo(User, { foreignKey: 'subscriber_id' });

    userPost.belongsTo(user, { foreignKey: 'user_id' });
    userPost.belongsTo(post, { foreignKey: 'post_id' });

    favourite.belongsTo(user, { foreignKey: 'user_id' });
    favourite.belongsTo(post, { foreignKey: 'post_id' });

    ingredient.belongsTo(post, { foreignKey: 'post_id' });
    ingredient.belongsTo(measurmentType, { foreignKey: 'measurement_id' });

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
