// 引入 db，也就是 connection
const db = require('../db');

const commentModel = { // 新增 comment 功能
	add: (username, content, cb) => {
        $query = 'INSERT INTO comments(username, content) VALUES(?, ?)';
		db.query($query, [username, content], (err, results) => {
			if (err) 
				return cb(err);
			cb(null);
		});
	},
	// 讀取 comment 功能
	getAll: (cb) => { // 資料庫關聯
		/* $query = `SELECT U.nickname, C.content 
                  FROM comments as C
                  LEFT JOIN users as U on U.username = C.username`; */
        $query = `SELECT U.nickname, U.created_at, C.content, C.id, C.username, C.created_at 
                  FROM comments as C
                  LEFT JOIN users as U on U.username = C.username
                  ORDER BY C.created_at DESC`
		db.query($query, (err, results) => {
			if (err) 
				return cb(err);
			cb(null, results);
		});
	},
	// 在 index 頁面讀取資料
	index: (req, res) => {
		commentModel.getAll((err, results) => {
			if (err) {
				console.log(err);
			}
			res.render('index', {
				comments: results
			});
		});
	},
    // 實作 delete 的 commentModel 部分
    delete: (username, id, cb) => {
        $query = `DELETE FROM comments WHERE id=? AND username=?`;
        db.query($query, [id, username], (err, results) => {
            if (err) 
                return cb(err);
            cb(null);
        });  
    },
    // 讀取相對應 id 的 comment
    get: (id, cb) => {
        // 資料庫關聯
        $query = `SELECT U.nickname, U.created_at, C.content, C.id, C.username, C.created_at 
                  FROM comments as C
                  LEFT JOIN users as U on U.username = C.username
                  WHERE C.id = ?`
        db.query($query, [id], (err, results) => {
            if (err) 
                return cb(err);
            // 如果結果是 undefined 就會傳空物件，可避免程式出現錯誤
            cb(null, results[0] || {});
        });
    },
    // 修改 Model 處理資料
    update: (username, id, content, cb) => {
        // 資料庫關聯
        $query = `UPDATE comments SET content=? WHERE  id=? AND username = ?`;
        db.query($query, [content, id, username], (err, results) => {
            if (err) 
             return cb(err);
            cb(null);
        });
    }
}

// 輸出 commentModel
module.exports = commentModel;