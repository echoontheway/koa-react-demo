import React,{Component} from "react";
import { connect } from 'react-redux';
import { logout } from '../actions';

class Header extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(e){
        e.preventDefault();
        this.props.fetchLogout();
    }
    render(){
        return (
            <header>
                <nav>
                    <li>首页</li>
                    <li>酒店</li>
                    <li>机票</li>
                    <li>
                        <span>
                            {this.props.userInfo.name}
                        </span>
                        <span className="logout" onClick={this.logout}>
                            退出
                        </span>
                    </li>
                </nav>
            </header>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchLogout: () => dispatch(logout())
})

export default connect(
    null,
    mapDispatchToProps
)(Header)

