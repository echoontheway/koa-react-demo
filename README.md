# koa-react-demo
koa+react搭建一个比较完整的web前后端的例子  
1.登录&退出 (koa-session)  
2.在线咨询 (websocket)

## node
框架：koa  
功能：提供接口，伺服静态文件  
启动：npm start      

## front-end
框架及重要模块：react + react-redux  
功能：登录页、主页  
打包：webpack4    
- 代理接口至koa应用  
- start模式下提供HMR等  
- build模式下进行代码分割及合并、编译、压缩等优化       
启动：npm start

## test
框架及重要模块:jest + supertest  
启动：npm test  
