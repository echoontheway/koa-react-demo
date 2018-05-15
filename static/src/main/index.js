import React,{Component} from "react";
import Header from './Header';

export default class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Header userInfo={this.props.userInfo}></Header>
                <div className="container">
                    <aside>aside</aside> 
                    <main>main</main>
                </div>
                <footer>footer</footer>
            </div>
        )
    }
}