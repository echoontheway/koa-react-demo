import React,{Component} from "react";
import ReactDOM from "react-dom";
import Login from './Login';
import Welcome from './Welcome';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      welcome:false,
      login:true,
      userInfo:{}
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  getUserInfo(userInfo){
    this.setState((prevState)=>({
      login:false,
      welcome:true,
      userInfo
    }))
  }
  render(){
    const {userInfo,login,welcome} = this.state;
    return (
      <div>
          <h1>here~koa-react-jest</h1>
          {login&&<Login getUserInfo={this.getUserInfo}/>}
          {welcome&&<Welcome {...userInfo} />}
      </div>
    );
  }
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));