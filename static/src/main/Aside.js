import React,{Component} from 'react';
import {getRandomInt} from '../../../febe/utils';
import {picMap} from '../constants';


export default class Aside extends Component{
    constructor(props){
        super(props);
        this.initSocket(props.userInfo.tel);
        this.state = {
            history:[]
        }
    }
    initSocket(tel){
        const socket = new WebSocket('ws://localhost:3000/chat');
        socket.onopen = ()=>{
            setInterval(()=>{
                if(socket.bufferedAmount == 0){
                    let message = ['hi','hello','sb??'][getRandomInt(0,3)];
                    socket.send(message);
                    this.setState(({history},props)=>({
                        history:[...history,{msg:message,user:tel}]
                    }))
                }
            }, 2000);
        };
        socket.onmessage = (event)=> {
            this.setState(({history},props)=>({
                history:[...history,{msg:event.data,user:'000'}]
            }))
        };  
    }
    
    
    render(){
        const {history} = this.state;
        return(
            <aside>
                <section className="head">
                    <div className="name">
                        在线咨询
                    </div>
                </section>
                <section className="history">
                    {
                        history.map(({msg,user},idx)=>(
                            <div key={idx} className={user==='000'?'left_msg':'right_msg'}>
                                <img className="avatar" src={picMap[user]} />
                                <span className="msg">{msg}</span>
                            </div>
                        ))
                    }
                </section>
                <section className="current">
                </section>
            </aside>
        )
    }
}