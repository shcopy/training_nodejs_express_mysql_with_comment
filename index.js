// 引入 library
const express = require('express');

// express 引入的是一個 function
const app = express();

// 引入 db 資料庫: mysql 模組 & 連線資料
const db = require('./db');

// 引入 express-session
const session = require('express-session');

// 記得要引入 body-parser 才能使用
const bodyParser = require('body-parser')

// 引入 connect-flash
const flash = require('connect-flash');

// 引入 moment 套件
const moment = require('moment');

// 設定時間格式
const shortDateFormat = "YYYY-MM-DD HH:mm:ss";
// 將 moment 和 shortDateFormat 放到 locals 全域環境中
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;

// 建立一個不易產生衝突的 port 用來測試
const port = 5001;

// 設定 app 載入 flash 模組：
app.use(flash());

// 引入 controller
const todoController = require('./controllers/todoController');
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController');

// 設定 view engine
app.set('view engine', 'ejs');

// 處理 UTF-8 編碼的資料
app.use(bodyParser.urlencoded({ extended: false }));

// 處理 json 資料
app.use(bodyParser.json());

// 在 app.js 中設定載入模組 express-session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

// 透過 locals 傳值給 view: session 功能和 errorMessage
app.use((req, res, next) => {
	// 有 username 代表有登入狀態
	res.locals.username = req.session.username
	res.locals.errorMessage = req.flash('errorMessage')
	// 記得加上 next() 把控制權轉移到下一個中間介
	next()
});

// 自己寫的中間介，用來導回上一頁
/*
在登入和註冊頁面，每當呼叫 next 時，就會將控制權給下一個中間介，
可以自己寫一個中間介 redirectBack，用來在提交表單後自動導回上一頁：
*/
function redirectBack(req, res, next) {
	res.redirect('back')
}

//---- 可直接使用 controller 的方法拿取資料和進行 render

// 在根目錄新增一個 addTodo 路由
// app.get('/', todoController.addTodo);

// 在根目錄增加一個首頁 index 的路由
/* app.get('/', (req, res) => {
	res.render('index')
}) */

app.get('/', commentController.index)

// 實作 login 路由
app.get('/login', userController.login);

// login 提交表單的路由
app.post('/login', userController.handleLogin, redirectBack);

// 實作 logout 路由
app.get('/logout', userController.logout);

// 新增一個處理 newTodo 的路由
app.post('/todos', todoController.newTodo);
app.get('/todos', todoController.getAll);
app.get('/todos/:id', todoController.get);

// 實作註冊功能
app.get('/register', userController.register);
app.post('/register', userController.handleRegister, redirectBack);

// 提交表單來新增 comment，同樣以 redirectBack 來導回上一頁
app.post('/comments', commentController.add, redirectBack);

// 刪除留言的路由：
app.get('/delete_comments/:id', commentController.delete);

// 讀取要編輯的 comment
app.get('/update_comments/:id', commentController.update);

// 執行修改 comment
app.post('/update_comments/:id', commentController.handleUpdate);

// 運行這個 port，參數分別為 port 和要執行的 function
app.listen(port, () => {
	// 連線資料庫
	db.connect();
	console.log(`Example app listening at http://localhost:${port}`)
});