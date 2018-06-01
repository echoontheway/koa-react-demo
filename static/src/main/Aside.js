import React,{Component} from 'react';
import {getRandomInt} from '../../../febe/utils';
import {picMap} from '../constants';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Image from './Image';

export default class Aside extends Component{
    constructor(props){
        super(props);
        this.ws = this.initSocket(props.userInfo.tel);
        this.state = {
            history:[],
            editorState: EditorState.createEmpty(),
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    }
    initSocket(tel){
        const ws = new WebSocket('ws://localhost:3000/chat');
        ws.onopen = ()=>{
            if(ws.bufferedAmount == 0){
                let message = ['hi','hello','sb??'][getRandomInt(0,3)];
                ws.send(message);
                this.setState(({history},props)=>({
                    history:[...history,{msg:message,user:tel}]
                }))
            }
        };
        ws.onmessage = (event)=> {
            this.setState(({history},props)=>({
                history:[...history,{msg:event.data,user:'000'}]
            }))
        };
        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };   
        return ws;  
    }
    onEditorStateChange(editorState){
        this.setState((prevState,props)=>({editorState}));
    }
    uploadImageCallBack(file){
        return new Promise((resolve,reject)=>{
            const data = new FormData();
            data.append('image', file);
            this.ws.send(data);
            this.ws.addEventListener('error',function(event){
                reject(event.data);
            })
            this.ws.addEventListener('onmessage',function(event){
                resolve(event.data);
            })
        })
    }
    render(){
        const {history,editorState} = this.state;
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
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            options: ['emoji', 'image'],
                            image: {component:Image,uploadCallback:this.uploadImageCallBack},                            
                        }}
                    />
                    <button>发送</button>
                </section>
            </aside>
        )
    }
}