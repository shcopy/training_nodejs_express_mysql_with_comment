// 引入 userModel
const userModel = require('../models/userModel')

// 引入 bcrypt
const bcrypt = require('bcryptjs');

// 加鹽，增加密碼的複雜程度
const saltRounds = 10;

const userController = {
	// 渲染登入畫面
	login: (req, res, next) => {
		res.render('login')
	},

	// 驗證登入狀態
	handleLogin: (req, res, next) => {
		/* if (req.body.password === 'abc') {
			req.session.isLogin = true;
			res.redirect('/');
		} else {
			req.flash('errorMessage', 'Please input the correct password.')
		} */

    const { username, password } = req.body;
    // 確認是否有填入資料
    if (!username || !password) {
      req.flash('errorMessage', '請輸入您的帳密！');
      // 每當呼叫 next 時，就會將控制權給下一個中間介 redirectBack(導回上一頁)
      return next();
    }
    // 輸入正確就從 userModel 找出 user 資料
    userModel.get(username, (err, user) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      if (!user) {
        req.flash('errorMessage', '使用者不存在');
        return next();
      }
      // 驗證密碼是否正確，三個參數代表: 明碼, 雜湊密碼, 方法
      bcrypt.compare(password, user.password, function (err, isSccess) {
        // 若出現錯誤或比對不成功，就顯示錯誤訊息
        if (err || !isSccess) {
          req.flash('errorMessage', '密碼錯誤');
          return next();
        }
        req.session.username = user.username;
        res.redirect('/')
      });
    })

	},

	// 登出: 清除 session 並導回首頁
	logout: (req, res, next) => {
		req.session.isLogin = false;
		res.redirect('/');
	},

	// 渲染註冊頁面
	register: (req, res, next) => { 
    // 把路徑設在 user 資料夾，較方便管理
		res.render('user/register');
	},

	// 驗證註冊
	handleRegister: (req, res, next) => { 
    // 從 resquest body 拿取 user 資料
		const {username, password, nickname} = req.body;
		if (!username || !password || !nickname) { 
      // 這裡用 return 就可避免 if-else 寫法增加層數
			return req.flash('errorMessage', '缺少必要欄位');
		}

    // 利用 bcrypt 套件對密碼進行雜湊處理
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // 若有 err 就直接顯示錯誤訊息
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      
      // 資料都沒問題的話，就可透過 userModel 寫入資料
      // 傳入一個物件，若有錯誤會回傳 cb 
      userModel.add({
        username,
        nickname,
        password: hash
      }, (err) => {
          if (err) {
            // 印出 err
            return req.flash('errorMessage', err.toString());
          }
        
        // 註冊成功就保持登入狀態，並導回首頁
        req.session.username = username;
        res.redirect('/');
      });
    });
	},

	logout: (req, res, next) => { // 登出就把 session 重置
		req.session.username = null;
		res.redirect('/');
	}
}

// 輸出 userController
module.exports = userController
