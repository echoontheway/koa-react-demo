import {getcookie,b64DecodeUnicode,getRandomInt} from '../febe/utils';
import {telMap, chatTxt} from './constants'

const validateUser = function(cookie){
    let sid = getcookie('sid',cookie)
    if(sid){
        sid = JSON.parse(b64DecodeUnicode(sid));
        const uid = sid.id.split('_')[0];
        if(telMap[uid]){
            return true;
        }
    }
}

const enableWss = wss =>{
    wss.on('connection', function connection(ws,req) {
        if(validateUser(req.headers.cookie)){
            ws.on('message', function incoming(message) {
                let res = message=='hi'||message=='hello'?message:chatTxt[getRandomInt(0,chatTxt.length)];
                ws.send(res);
            });
        }else{
            ws.close(4001,'Invalid user');
        }
    });    
}


module.exports = enableWss;