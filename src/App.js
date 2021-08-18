import React, {Component} from 'react';
import {Row, Col, Steps} from 'antd';
import {AttrSelector} from './ChooseAttributes';
import {Simulator} from './Simulator';
import './App.css';
const {Step} = Steps;



class App extends Component {
    state = {
        current: 0,
    };

    onChange = current => {
        this.setState({current});
    };

    render() {
        const {current} = this.state;
        return (
            <div className="App">
                <Row gutter={[16, 16]}>
                    <Col span={16} offset={4}>
                        <Steps current={current} onChange={this.onChange}>
                            <Step title="选择属性及配方" description="请输入您的装备属性，并选择需要制作的道具"/>
                            <Step title="编排技能" description="通过点选及拖拽设计制作流程，并实时查看模拟结果"/>
                            {/*<Step title="导出宏" description="将您的技能导出为游戏宏方便一键使用"/>*/}
                        </Steps>
                    </Col>
                </Row>
                <Row className="Content">
                    <Col span={18} offset={3}>
                        {current === 0 ? <AttrSelector/> : <Simulator/>}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
