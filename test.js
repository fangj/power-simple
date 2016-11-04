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


// const setCommandAndWait=(command)=>setCommand(command).then(_=>wait(100));//设置命令发出后等待0.1s


//批量设置状态
// function setCommands(commands){
// 	commands.reduce((p,mac)=>p.then(_=>setCommandAndWait(mac)),Promise.resolve());
// }

const setCommands=(commands)=>{
	return api.post('/setb', {body:commands}).then(res=>{
		console.log('设置成功',res.body)
	}).catch(e=>{
		console.error(e)
	})
}

//测试
commands=[{"mac":"18:fe:34:cc:37:c7","status":"ON"},{"mac":"60:01:94:02:2b:3c","status":"OFF"},{"mac":"5c:ef:7f:87:58:e4","status":"ON"},{"mac":"18:fe:34:cc:34:d4","status":"OFF"}];
setCommands(commands)