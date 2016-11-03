require('isomorphic-fetch');
var Frisbee =require( 'frisbee').default;

const api = new Frisbee({
  baseURI: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


//等待函数
const wait =(ms)=> new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});

//使用举例
wait(1000).then(()=>{console.log("等了1秒")})


//取状态接口
function getStatus(mac){
	return api.get("/"+mac).then(res=>res.body)
	.catch(e=>{
		console.error(e)
	})
}

//测试
const mac="aa:bb:cc";
getStatus(mac).then(status=>console.log(mac,status));


//设置状态接口
const setCommand=(command)=>{
	return api.post('/set', {body:command}).then(res=>{
		console.log('设置成功',res.body)
	}).catch(e=>{
		console.error(e)
	})
}
//测试
const command={"mac":"aa:bb:cc:xx","status":"ON"};
setCommand(command)


const setCommandAndWait=(command)=>setCommand(command).then(_=>wait(100));//设置命令发出后等待0.1s


//批量设置状态
function setComands(commands){
	commands.reduce((p,mac)=>p.then(_=>setCommandAndWait(mac)),Promise.resolve());
}

//测试
commands=[{"mac":"aa:bb:cc:11","status":"ON"},{"mac":"aa:bb:cc:22","status":"OFF"},{"mac":"aa:bb:cc:33","status":"OFF"},{"mac":"aa:bb:cc:44","status":"OFF"}];
setComands(commands)