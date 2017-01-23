import logger from '../logger';

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.render('home/index', {});
	});

}
