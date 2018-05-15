import React,{Component} from "react";
import { connect } from 'react-redux';
import { fetchPosts } from './actions';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            errMsg:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {userInfo} = nextProps;
        if(userInfo&&userInfo.status !==0 ){
            this.setState((prevState)=>{
                errMsg:userInfo.msg                
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.fetchLogin({
            tel:this.input.value
        })
    }
    
    render(){
        const {errMsg} = this.state;
        const {isFetching} = this.props;
        return (
            <form onSubmit={this.handleSubmit} className="login box">
                <label>
                    <input type="text" placeholder="登陆手机号" ref={(input) => this.input = input} required />
                </label>
                {errMsg&&<div className="error-msg">{errMsg}</div>}
                <br />
                <input type="submit" value={isFetching?'登   录   中......':'登   录'} />
            </form>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchLogin: req => dispatch(fetchPosts(req))
})

const mapStateToProps = state => {
    const {userInfo,isFetching} = state.postsByLogin
    return {
        isFetching,
        userInfo
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)



