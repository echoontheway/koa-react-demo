import React,{Component} from "react";

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <header>
                <nav>
                    <li>首页</li>
                    <li>酒店</li>
                    <li>机票</li>
                    <li>welcome,{this.props.userInfo.name}</li>
                </nav>
            </header>
        )
    }
}

