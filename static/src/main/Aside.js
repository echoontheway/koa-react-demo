import React,{Component} from 'react';
import {getRandomInt,stringifyEach} from '../../../febe/utils';
import { EditorState,convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Image from './Image';
import Layer from '../components/layer';
import { format } from 'util';

export default class Aside extends Component{
    constructor(props){
        super(props);
        this.ws = this.initSocket();
        this.state = {
            history:[],
            editorState: EditorState.createEmpty(),
            showPicSrc:''
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
        this.clickSend = this.clickSend.bind(this);
    }
    initSocket(){
        const ws = new WebSocket('ws://localhost:3000/chat');
        ws.onopen = ()=>{
            if(ws.bufferedAmount == 0){
                let msg = ['hi','hello','sb??'][getRandomInt(0,3)];
                this.send({msg});
            }
        };
        ws.onmessage = (event)=> {
            const type = event.data instanceof Blob?'img':'txt';
            const msg = type==='img'?URL.createObjectURL(event.data):event.data;
            this.setState(({history},props)=>({
                history:[...history,{msg,user:'000',type}]
            }))
        };
        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };   
        return ws;  
    }
    send({msg,type}){
        const user = this.props.userInfo.tel;
        this.ws.send(msg);
        msg = type==='img'?URL.createObjectURL(msg):msg;
        this.setState(({history},props)=>({
            history:[...history,{msg,type,user}],
            editorState:EditorState.createEmpty(),
        }))
    }
    clickSend(){
        this.send({msg:convertToRaw(this.state.editorState.getCurrentContent()).blocks.map(({text})=>text).join('')})
    }
    onEditorStateChange(editorState){
        this.setState({editorState});
    }
    uploadImageCallBack(file){
        return new Promise((resolve,reject)=>{
            this.send({msg:file,type:'img'});
        })
    }
    amplifyPic(src){
        this.setState({showPicSrc:src})
    }
    render(){
        const {history,editorState,showPicSrc} = this.state;
        return(
            <aside>
                <section className="head">
                    <div className="name">
                        在线咨询
                    </div>
                </section>
                <section className="history">
                    {
                        history.map(({msg,user,type},idx)=>(
                            <div key={idx} className={user==='000'?'left_msg':'right_msg'}>
                                <img className="avatar" src={`//localhost:3000/static/images/${user}.png`} />
                                {type=='img'?<img className="msg" width='20%' height='20%' src={msg} onClick={this.amplifyPic.bind(this,msg)}/>:<span className="msg">{msg}</span>}
                            </div>
                        ))
                    }
                    {showPicSrc&&<Layer><img src={showPicSrc} /></Layer>}
                </section>
                <section className="current">
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        editorRef={(ref)=>this.editorRef=ref}
                        toolbar={{
                            options: ['emoji', 'image'],
                            image: {component:Image,uploadCallback:this.uploadImageCallBack},                            
                        }}
                    />
                    <button onClick={this.clickSend}>发送(S)</button>
                </section>
            </aside>
        )
    }
}