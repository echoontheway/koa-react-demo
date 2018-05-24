import React,{Component} from "react";
import Header from './Header';
import Aside from './Aside';

export default class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {userInfo} = this.props
        return (
            <div className="main">
                <Header userInfo={userInfo}></Header>
                <div className="container">
                    <Aside userInfo={userInfo}></Aside> 
                    <main>main</main>
                </div>
                <footer>footer</footer>
            </div>
        )
    }
}