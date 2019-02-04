var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var Categories=require('./routes/categories');
var Usertbls=require('./routes/usertbls');
var Questions=require('./routes/questions');
var Answers=require('./routes/answers');
var Tests=require('./routes/tests');
var Tests_details=require('./routes/tests_details');
var Discussions=require('./routes/discussions');
var Comments=require('./routes/comments');
var Feedbacks=require('./routes/feedbacks');
var Discussionsjoin=require('./routes/getdiscussionjoin');
var Subcats=require('./routes/subcats');
var Ans_likes=require('./routes/ans_likes');
//var Que_views=require('./routes/que_views');
var Commentsjoin=require('./routes/getcommentjoin');
var Questionsjoin=require('./routes/getquestionjoin');
var Tests_detailsjoin=require('./routes/gettestdetailsjoin');
var Testsjoin=require('./routes/gettestjoin');

var Subcatjoin=require('./routes/getsubcatjoin');
var Ansjoin=require('./routes/getansjoin');

var Commentbydisid=require('./routes/getcommentbydisid');
var Answerbyqueid=require('./routes/getanswerbyqueid');
var Subcatbycatid=require('./routes/getsubcatbycatid');
var Feedbackjoin=require('./routes/getfeedbackjoin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/categories',Categories);
app.use('/usertbls',Usertbls);
app.use('/questions',Questions);
app.use('/answers',Answers);
app.use('/tests',Tests);
app.use('/tests_details',Tests_details);
app.use('/discussions',Discussions);
app.use('/comments',Comments);
app.use('/feedbacks',Feedbacks);
app.use('/discussionsjoin',Discussionsjoin);
app.use('/subcats',Subcats);
app.use('/ans_likes',Ans_likes);
//app.use('/que_views',Que_views);
app.use('/commentsjoin',Commentsjoin);
app.use('/questionsjoin',Questionsjoin);
app.use('/tests_detailsjoin',Tests_detailsjoin);
app.use('/testsjoin',Testsjoin);

app.use('/subcatjoin',Subcatjoin);
app.use('/ansjoin',Ansjoin);

app.use('/commentbydisid',Commentbydisid);
app.use('/answerbyqueid',Answerbyqueid);
app.use('/feedbackjoin',Feedbackjoin);
app.use('/subcatbycatid',Subcatbycatid);


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
