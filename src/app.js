const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const koaBody = require('koa-body');
const session = require('koa-session');

const app = new Koa();
const router = new Router();

const CONFIG = {
  key: 'sid', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 1200000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: false, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));


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
  ctx.cookies.set('view', n,      {
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: new Date('2018-05-16'),  // cookie失效时间
    httpOnly: false,  // 是否只用于http请求中获取
    overwrite: false  // 是否允许重写
  });
  ctx.response.body = n + ' views';
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
    res.data = {name:telMap[reqData.tel]};
    let n = ctx.session.views || 0;
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