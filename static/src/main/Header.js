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
                    <li>index</li>
                    <li>tab1</li>
                    <li>tab2</li>
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

