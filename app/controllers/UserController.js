import bcrypt from "bcryptjs";

import UserModel from "../models/UserModel";
import logger from "../logger";

module.exports = (app) => {

    const model = new UserModel;

    app.get('/api/user', (req, res) => {
        try {
            model.getAll()
            .then( (users) => {
                return res.status(202).render('user/list', { users: users });
            })
            .catch( (error) => {
                logger.error(error.message);
                return res.status(500).end(error.message);
            });

        } catch (e) {
            logger.error(e.message);
            return res.status(500).send(e.message);
        }
    });

    app.get('/api/user/:id', (req, res) => {
        try {
            let id = req.params.id;

            model.getById(id)
                .then( (user) => {
                    return res.status(202).render('user/list', { users: [user] });
                })
                .catch( (error) => {
                    logger.error(error.message);
                    // return res.status(500).end(error.message);
                    return res.status(500).render('errors/500', {message: error.message});
                });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).send(e.message);
        }
    });

    app.post('/api/user', (req, res) => {
        try {
            let salt       = bcrypt.genSaltSync(10);
            let attributes = req.body;

            attributes.userPassword  = bcrypt.hashSync(attributes.userPassword, salt);

            model.create(attributes)
                .then( (user) => {
                    return res.status(201).json(user);
                })
                .catch( (error) => {
                    logger.error(error.message);
                    return res.status(500).end(error.message);
                });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).send(e.message);
        }
    });

    app.put('/api/user/:id', (req, res) => {
        try {
            let id         = req.params.id;
            let attributes = req.body;

            model.update(id, attributes)
                .then( (user) => {
                    res.status(202).json(user);
                })
                .catch( (error) => {
                    logger.error(error.message);
                    return res.status(500).end(error.message);
                });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).send(e.message);
        }
    });

    app.delete('/api/user/:id', (req, res) => {
        try {
            let id = req.params.id;

            model.delete(id)
                .then( (user) => {
                    let response = (user) ? true : false;
                    return res.status(200).json({delete: response});
                })
                .catch( () => {
                    logger.error(error.message);
                    return res.status(500).end(error.message);
                });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).send(e.message);
        }
    });
};
