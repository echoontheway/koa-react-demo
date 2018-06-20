import {getcookie,b64DecodeUnicode,getRandomInt} from '../febe/utils';
import {telMap, chatTxt} from './constants';
const fs = require('fs');
const path= require('path');

const validateUser = function(cookie){
    let sid = getcookie('sid',cookie)
    if(sid){
        sid = JSON.parse(b64DecodeUnicode(sid));
        const uid = sid.id.split('_')[0];
        if(telMap[uid]){
            return uid;
        }
    }
}

const enableWss = wss =>{
    wss.on('connection', function connection(ws,req) {
        let uid  = validateUser(req.headers.cookie);
        if(uid){
            ws.on('message', function(msg) {
                let resMsg = msg=='hi'||msg=='hello'?msg:chatTxt[getRandomInt(0,chatTxt.length)];
                if(Buffer.isBuffer(msg)){
                    fs.readdir(path.join(__dirname,`./images/`),function(err,files){   
                        if(err){
                            console.error('read error',err);
                        }else{
                            let chosenFile = files.find(item=>item.startsWith(`${uid}_`));
                            fs.readFile(path.join(__dirname,`./images/${chosenFile}`),function(err,data){
                                if(err){
                                    console.log('read error',err);
                                }else{
                                    ws.send(data);
                                }
                            })      
                        }  
                    });
                    fs.writeFile(path.join(__dirname,`./images/${uid}_${Date.now()}.png`),msg,function(err){   
                        if(err){
                            console.error('write error',err);
                        } 
                    });
                }else{
                    ws.send(msg);
                } 
                
            });
        }else{
            ws.close(4001,'Invalid user');
        }
    });    
}


module.exports = enableWss;