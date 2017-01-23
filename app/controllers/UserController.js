import bcrypt from "bcryptjs";

import UserModel from "../models/UserModel";
import logger from "../logger";

module.exports = (app) => {

    const model = new UserModel;
    const user = {
        userName: null,
        userLogin: null,
        userPassword: null,
        userEmail: null,
        userPhone: null,
        userCellPhone: null
    };

    app.get('/api/user', (req, res) => {
        try {
            model.getAll()
            .then( (users) => {
                return res.status(202).render('user/list', { users: users });
            })
            .catch( (error) => {
                logger.error(error.message);
                return res.status(500).render('errors/500', { message: error.message });
            });

        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: e.message });
        }
    });

    app.get('/api/user/create', (req, res) => {
        try {
            return res.status(202).render('user/form', { user: user });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: error.message });
        }
    });

    app.get('/api/user/update/:id', (req, res) => {
        try {
            let id = req.params.id;

            model.getById(id)
            .then( (user) => {
                return res.status(202).render('user/form', { user: user });
            })
            .catch( (error) => {
                logger.error(error.message);
                return res.status(500).render('errors/500', { message: error.message });
            });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: error.message });
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
                return res.status(500).render('errors/500', { message: error.message });
            });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: e.message });
        }
    });

    app.post('/api/user', (req, res) => {
        try {
            let salt       = bcrypt.genSaltSync(10);
            let attributes = req.body;

            logger.info(JSON.stringify(attributes));

            attributes.userPassword  = bcrypt.hashSync(attributes.userPassword, salt);

            model.create(attributes)
            .then( (user) => {
                // return res.status(201).json(user);
                return res.redirect('/api/user');
            })
            .catch( (error) => {
                logger.error(error.message);
                return res.status(500).render('errors/500', { message: error.message });
            });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: e.message });
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
                return res.status(500).render('errors/500', { message: error.message });
            });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: e.message });
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
                return res.status(500).render('errors/500', { message: error.message });
            });
        } catch (e) {
            logger.error(e.message);
            return res.status(500).render('errors/500', { message: e.message });
        }
    });
};
