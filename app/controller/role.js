const db = require('../config/db.config');
const globalFunctions = require('../config/global.functions.js');
const Role = db.role;

exports.findAll = (req, res) => {
    Role.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.create = (req, res) => {
    Role.create({
        name: req.body.name,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.update = (req, res) => {
    Role.update({
        name: req.body.name
    },
        {
            where: {
                id: req.params.id,
            },
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.delete = (req, res) => {
    Role.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    Role.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};