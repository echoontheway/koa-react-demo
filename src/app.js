const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router()

app.use(serve(path.join(__dirname,'../static/dist')));

const logger = async (ctx, next) => {
  console.log(`${Date.now()} ${ctx.method} ${ctx.url}`);
  await next();
}
app.use(logger);
app.use(koaBody());

const page =  async (ctx,next) => {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.type = 'html';
  ctx.cookies.set('view', n);
  ctx.body = await new Promise(function(resolve,reject){
    fs.readFile('./static/dist/index.html','utf8',function(err,data){
      if(err){
        ctx.app.emit('error', err, ctx);
        reject(err);
      }
      resolve(data);
    })
  })
};

const login = ctx =>{
  const reqData = ctx.request.body;
  const telMap = {
    "123":'echo',
    "456":'summer'
  }
  let res = {
    status:0,
    msg:'succeed',
    data:null
  }
  if(reqData.tel&&telMap[reqData.tel]){
    res.data = {name:telMap[reqData.tel]}
  }else{
    res.status = 1
    res.msg = 'login failure,check your Tel'
  }
  ctx.body = res
}

router.get('/', page)
.post('/api/login',login)


app.use(router.routes())
.use(router.allowedMethods());


app.on('error', (err, ctx) => {
    console.log('server error', err, ctx)
});

module.exports = app;