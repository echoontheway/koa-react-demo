import React,{Component} from "react";
import ReactDOM from "react-dom";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            errMsg:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){

        const url = 'api/login';
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({tel:this.input.value}), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(res => {
            if(res.status===0){
                this.props.getUserInfo(res.data);
            }else{
                this.setState((prevState)=>({errMsg:res.msg}))
            }
          });
        e.preventDefault();
    }
    
    render(){
        const {errMsg} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Tel:<input type="text"  ref={(input) => this.input = input} required />
                </label>
                <input type="submit" value="Submit" />
                {errMsg&&<div className="error-msg">{errMsg}</div>}
            </form>
        )
    }


}

