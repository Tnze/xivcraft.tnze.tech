const {useState} = require("react");
const {Row, Col, Progress} = require("antd");
const {List, attayMove} = require('react-movable');
const {Line} = require('@ant-design/charts');

export const Simulator = () => {
    const data = [
        {
            skill: '制作',
            key: 'du',
            value: 106,
        },
        {
            skill: '掌握',
            key: 'cp',
            value: 110,
        },
        {
            skill: '简约',
            key: 'du',
            value: 88,
        },
        {
            skill: '比尔格的祝福',
            key: 'cp',
            value: 91,
        },
    ];
    const config = {
        data: data,
        xField: 'skill',
        yField: 'value',
        legend: false,
        seriesField: 'key',
        stepType: 'hvh',
    };
    return (
        <Row>
            <Col span={6}></Col>
            <Col span={18}>
                <Line {...config} />
                <Row gutter={[100, 100]}>
                    <Col span={4}><Progress type="circle" percent={75}/></Col>
                    <Col span={4}><Progress type="circle" percent={75}/></Col>
                </Row>
            </Col>
        </Row>
    );
}