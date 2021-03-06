var express = require('express')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db.json', autoload: true ,timestampData:true});
var online={}; //在线状态

//静态文件
var path=require('path');
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

function setStatus(status,cb){
	db.update({ mac: status.mac }, status, { upsert: true,returnUpdatedDocs:true },cb);
}

//设置状态
app.post('/set', function (req, res) {
	var status=req.body;
	if(!status || !status.mac || !status.status){
		res.status(400);
		return res.end('格式错误，应该为{mac:"xxx",status:"ON"}');
	}
	setStatus(status,function (err, numReplaced, upsert) {
	  if(err){
	  	return res.status(500).end(err);
	  }else{
	  	return res.json(upsert);
	  }
	})
})

//批量设置状态
app.post('/setb', function (req, res) {
	var statuses=req.body;
	if(statuses && statuses instanceof Array){
		statuses.map(status=>setStatus(status));
		res.end();
	}else{
		res.status(400);
		return res.end('格式错误，应该为数组：[{mac:"xxx",status:"ON"}]');
	}
})


//查询所有状态
app.get('/all',function(req,res){
  db.find({}).sort({ updatedAt: -1 }).exec(function (err, docs) {
  	res.json(docs);
	});
})

//查询所有在线状态
app.get('/online',function(req,res){
	res.json(online);
})

//查询状态(必须放在最后)
app.get('/:mac', function (req, res) {
	var mac=req.params.mac;
	online[mac]=Date.now();//记录最后一次访问状态
	db.findOne({ mac: mac }, function (err, doc) {
  	var status=doc?doc.status:"ON";
  	res.end(status);
	});
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})