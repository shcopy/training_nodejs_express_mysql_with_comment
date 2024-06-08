// 引入 mysql 模組
var mysql = require('mysql');
// 建立連線
var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'app'
});

// connection.connect();
// $query = 'SELECT * from todos';

// // 使用 callback 來接收訊息: 連線成功就印出 todos 所有欄位
// connection.query(
//     $query, function (error, results, fields) {
// 	if (error) 
// 		throw error;
// 	console.log(results);
// });

// connection.end();

module.exports = connection;