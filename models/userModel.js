// 引入 db，也就是 connection
const db = require('../db');

const userModel = { // 新增 user 功能
	add: (user, cb) => {
		db.query('INSERT INTO users(username, password, nickname) VALUES(?, ?, ?)', [
			user.username, user.password, user.nickname
		], (err, results) => {
			if (err) 
				return cb(err);
			cb(null);
		});
	},

	// 登入 -> 讀取 user 功能
	get: (username, cb) => {
		db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
			if (err) 
				return cb(err);
			cb(null, results[0]);
		});
	}
}

module.exports = userModel;
