// 引入 db，也就是 connection
const db = require('../db');

const todoModel = {
	// 這裡要用 callback 來拿取資料
	getAll: (cb) => {
		$query = 'SELECT * FROM todos';
		db.query($query, (err, results) => {
			if (err) 
				return cb(err);
			// cb: 第一個參數為是否有錯誤，沒有的話就是 null，第二個才是結果
			cb(null, results)
		});
	},
	
	get: (id, cb) => {
		$query = 'SELECT * FROM todos WHERE id = ?';
		db.query($query, [id], (err, results) => {
			if (err) return cb(err);
			cb(null, results);
		});
	},

	// 新增 todoModel.add()
	add: (content, cb) => {
		$query = 'INSERT INTO todos(content) VALUES(?)';
		db.query($query, [content], (err, results) => {
			if (err) return cb(err);
				cb(null);
		});
	}
}

module.exports = todoModel;