import React, {Component} from 'react';
import {Row, Col, Steps} from 'antd';
import './App.css';

const {Step} = Steps;


class App extends Component {
    render() {
        return (
            <div className="App">
                由于Wasm不能提供求解器所需的内存，此网页版已不再维护并下线，请访问
                <a href="https://bbs.nga.cn/read.php?tid=28176186">https://bbs.nga.cn/read.php?tid=28176186</a>
                下载完整版程序。谢谢大家的支持。
            </div>
        );
    }
}

export default App;
