import winston from 'winston';
import moment from 'moment';
import fs from 'fs';

if (!fs.existsSync('logs')) {
	fs.mkdirSync('logs');
}

module.exports = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: 'logs/task-manager.log',
			maxsize: 100000,
			maxFiles: 10,
            timestamp: () => { return moment().format('YYYY-MM-DD HH:mm:ss') }
		})
	]
});
