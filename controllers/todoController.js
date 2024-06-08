// 先從 model 引入 todos 資料
const todoModel = require('../models/todoModel');

// 建立一個 todoController 物件，透過方法來存取 model 的資料
const todoController = { 
	// 傳入參數 req, res
	getAll: (req, res, next) => {
		// 改成 callback 非同步操作
		todoModel.getAll((err, results) => { 
			// 如果有 err 就印出錯誤訊息
			if (err) return console.log(err);
			// 不然就把 todos 傳給 view
			res.render('./todo/todos', {
				todos: results
			})
		})
	},

	// 傳入參數 req, res
	get: (req, res, next) => {
		const id = req.params.id;
		todoModel.get(id, (err, results) => {
			if (err) return console.log(err);
			res.render('./todo/todo', {
				// 注意回傳的結果 array，必須取 results[0] 才會是一個 todo
			  todo: results[0]
			})
		})
	},

	// 這裡只負責 render 頁面，並不是真的處理新增 todo
	addTodo: (req, res) => {
        res.render('./todo/addTodo');
	},
	newTodo: (req, res) => {
		// 透過 body-parser 解析 resquest body 來拿取 content
		const content = req.body.content;
		// 先輸出確認是否有拿到資料
		//res.end(content);
		todoModel.add(content, (err) => {
			if (err) return console.log(err);
			// 重新導回 todos 頁面
			res.redirect('./todo/todos');
		})
	},
}

// 輸出 todoController
module.exports = todoController;