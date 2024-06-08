// 引入 commentModel
const commentModel = require('../models/commentModel')

const commentController = {
  add: (req, res, next) => {
    const {username} = req.session
    const {content} = req.body
    if (!username) {
      req.flash('errorMessage', '請先登入');
      return next();
    }

    if (!content) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    
    // 若新增失敗就導回首頁
    commentModel.add(username, content, err => {
      return res.redirect('/');
    })
  },
  // 讀取 comment 功能
  getAll: (cb) => {
    // 資料庫關聯
    $query = `SELECT U.nickname, C.content FROM comments as C
              LEFT JOIN users as U on U.username = C.username`
    db.query($query, (err, results) => {
      if (err) 
        return cb(err);
      cb(null, results);
    });
  },
  // 在 index 頁面讀取資料
  index: (req, res, next) => {
    commentModel.getAll((err, results) => {
      if (err) {
        console.log(err);
      }
      res.render('index', {
        comments: results
      });
    });
  },
  // 新增控制 delete 的方法。
  /* 
  新增控制 delete 的方法。
  注意這裡的參數除了網址列上的 id，
  也需傳入 session 以確認是否為該 comment 作者
  */
  delete: (req, res, next) => {
    // 除了網址列上的 id，也需傳入 session 以確認是否為該 comment 作者
    commentModel.delete(req.session.username, req.params.id, err => {
      res.redirect('/');
    })
  },
  update: (req, res, next) => {
    commentModel.get(req.params.id, (err, result) => {
      res.render('./comment/update', {
        comment: result
      });
    });
  },
  handleUpdate: (req, res, next) => {
    // 後端驗證: 必須是本人才有權限修改
    commentModel.update(
      req.session.username, 
      req.params.id, 
      req.body.content, 
      err => {
        res.redirect('/')
      });
  }
}

// 輸出 commentController
module.exports = commentController;