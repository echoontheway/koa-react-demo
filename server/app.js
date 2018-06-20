import {telMap,chatTxt} from './constants'

const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const koaBody = require('koa-body');
const session = require('koa-session');
const views = require('koa-views');
const app = new Koa();
const router = new Router();

const CONFIG = {
  key: 'sid', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 20*60000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: false, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

const logger = async (ctx, next) => {
  console.log(`${Date.now()} ${ctx.method} ${ctx.url}`);
  await next();
}

const page = async ctx =>{
  let tel,name
  if(!ctx.session.isNew){
     tel = ctx.session.id.split('_')[0];
     name = telMap[tel];
  }
  //必须await
  await ctx.render('index', {
    userInfo:{
      name,
      tel
    }
  });
}

const logout = ctx =>{
  let res = {
    status:0,
    msg:'succeed',
    data:null
  }
  ctx.session = null;
  ctx.body = res;
}

const login = ctx =>{
  const reqData = ctx.request.body;
  let res = {
    status:0,
    msg:'succeed',
    data:null
  }
  if(reqData.tel&&telMap[reqData.tel]){
    res.data = {
      tel:reqData.tel,
      name:telMap[reqData.tel]
    };
    let sid = `${reqData.tel}_${Date.now()}`;
    ctx.session.id = sid;
  }else{
    res.status = 1
    res.msg = 'login failure,check your Tel'
  }
  ctx.body = res
}

app.use(logger);

app.use(serve(path.join(__dirname,'../'),{
  gzip: true,
  autogz: true
}));

app.use(koaBody({multipart:true}));

app.use(session(CONFIG, app));


//优先走views,若views不存在，走静态文件伺服器serve
app.use(
  views(path.join(__dirname,'../views'), {
    map: { html: 'dot' },
    default: 'dot'
  })
)

router
.get('/',page)
.post('/api/login',login)
.post('/api/logout',logout)

app.use(router.routes())
.use(router.allowedMethods());


app.on('error', (err, ctx) => {
    console.log('server error', err, ctx)
});

module.exports = app;