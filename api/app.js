var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apilist = require('./api/back/apilist')
var back_class = require('./api/back/back_class')
var article = require('./api/back/article')
var user = require('./api/back/user')
var front = require('./api/front/article')
var app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/apilist',apilist);
app.use('/api/back_class',back_class);
app.use('/api/article',article);
app.use('/api/user',user);
app.use('/api/front',front);
//加载ueditor 模块
var ueditor = require("ueditor");
//使用模块
app.use("/api/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if (req.query.action === 'uploadimage') {
      var foo = req.ueditor;

      var imgname = req.ueditor.filename;

      var img_url = '/ueditor/images/';
      res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
      res.setHeader('Content-Type', 'text/html'); //IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
      var dir_url = '/ueditor/images/';
      res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
      console.log('config.json')
      // console.log(configdata)
      // console.log(JSON.parse(configdata))
      res.setHeader('Content-Type', 'application/json');
      // res.send(JSON.stringify(configdata))
      res.redirect('/ueditor/nodejs/config.json');
  }
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
