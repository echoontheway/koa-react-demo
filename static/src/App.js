import React,{Component} from "react";
import Login from './Login';
import Main from './main';
import { connect } from 'react-redux';
import {b64DecodeUnicode,getcookie} from '../../febe/utils';
import { format } from "url";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      login:this.hasLogined(),
      userInfo:window.userInfo
    }
  }

  /**刷新页面时，验证session的有效性，若有效，则仍然保持登录态*/
  hasLogined(){
    let sid = getcookie('sid');
    if(sid){
      try{
        sid = JSON.parse(b64DecodeUnicode(sid))
      }catch(e){
        console.log(e);
      }
      return sid&&sid._expire>Date.now()
    }
  }

  componentWillReceiveProps(nextProps){
    const {userInfo} = nextProps 
    if(userInfo){
      const {data,status,msg} = userInfo
      this.setState((prevState)=>({
        login:status===0&&data,
        userInfo:data
      }))
    }
  }

  render(){
    const {login,userInfo} = this.state;
    return (
      <div>
          {login?<Main userInfo={userInfo} />:<Login />}    
      </div>
    );
  }
};


const mapStateToProps = state => {
  const {userInfo} = state.loginOrOut
  return {
      userInfo
  }
}

export default connect(
  mapStateToProps
)(App)
