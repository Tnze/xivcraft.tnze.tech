import React, {Component} from 'react';
import {Row, Col, Steps} from 'antd';
import {AttrSelector} from './ChooseAttributes';
import {Simulator} from './Simulator';
import './App.css';

const {Step} = Steps;


class App extends Component {
    state = {
        currentPage: 0,
        attributes: {
            level: 80,
            craftsmanship: 2830,
            control: 2710,
            craftPoint: 636,
        },
        recipe: {
            recipeLevel: 510,
            baseLevel: 80,
            progress: 8591,
            quality: 56662,
            durability: 70,
        }
    };

    onChangePage = current =>
        this.setState({currentPage: current});
    onChangeAttributes = attr =>
        this.setState({attributes: Object.assign(this.state.attributes, attr)});
    onChangeRecipe = recipe =>
        this.setState({recipe: Object.assign(this.state.recipe, recipe)});

    render() {
        const {currentPage} = this.state;
        const attrSelector = <AttrSelector
            attr={this.state.attributes}
            onChangeAttributes={this.onChangeAttributes}
            recipe={this.state.recipe}
            onChangeRecipe={this.onChangeRecipe}
        />;
        const simulator = <Simulator
            attr={this.state.attributes}
            recipe={this.state.recipe}
        />;
        return (
            <div className="App">
                <Row gutter={[16, 16]}>
                    <Col span={16} offset={4}>
                        <Steps current={currentPage} onChange={this.onChangePage}>
                            <Step title="选择属性及配方" description="请输入您的装备属性，并选择需要制作的道具"/>
                            <Step title="编排技能" description="通过点选及拖拽设计制作流程，并实时查看模拟结果"/>
                            <Step title="导出宏" description="将您的技能导出为游戏宏方便一键使用"/>
                        </Steps>
                    </Col>
                </Row>
                <Row className="Content">
                    <Col span={18} offset={3}>
                        {currentPage === 0 ? attrSelector : simulator}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
