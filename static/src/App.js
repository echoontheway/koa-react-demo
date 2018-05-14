import React,{Component} from "react";
import Login from './Login';
import Main from './main';
import { connect } from 'react-redux';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      login:false
    }
  }

  componentWillReceiveProps(nextProps){
    const {userInfo} = nextProps
    if(userInfo&&userInfo.status===0){
      this.setState((prevState)=>({
        login:true
      }))
    }
  }

  render(){
    const {login} = this.state;
    const {userInfo} = this.props;
    return (
      <div>
          {login?<Main userInfo={userInfo} />:<Login />}    
      </div>
    );
  }
};


const mapStateToProps = state => ({
  userInfo:state.userInfo
})

export default connect(
  mapStateToProps
)(App)



