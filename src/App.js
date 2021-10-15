import React, {Component} from 'react';
import {Row, Col, Steps} from 'antd';
import './App.css';

const {Step} = Steps;


class App extends Component {
    render() {
        return (
            <div className="App">
                <a href="https://bbs.nga.cn/read.php?tid=28176186">桌面版生产模拟器 / 普通配方用求解器</a>
                <a href="https://bbs.nga.cn/read.php?tid=28846320">高难生产轮椅</a>

                <h>生产轮椅下载</h>
                v1.1.1.6 <a
                href="https://www.aliyundrive.com/s/Chr8axjZAfb">https://www.aliyundrive.com/s/Chr8axjZAfb</a>
                <s>v1.1.1.5 <a
                    href="https://www.aliyundrive.com/s/ECjwCvT2UAu">https://www.aliyundrive.com/s/ECjwCvT2UAu</a></s>
                <s>v1.1.1.4 <a
                    href="https://www.aliyundrive.com/s/JArYwywjx6v">https://www.aliyundrive.com/s/JArYwywjx6v</a></s>
                <s>v1.1.1.3 <a
                    href="https://www.aliyundrive.com/s/YE5L2F3bwCK">https://www.aliyundrive.com/s/YE5L2F3bwCK</a></s>

                <b><i>更新日志</i></b>
                v1.1.1.7 Coming Soon
                <ul>
                    <li>优化推荐技能优先级</li>
                    <li>添加悬浮窗动画</li>
                </ul>
                v1.1.1.6
                <ul>
                    <li>制作状态日志行添加开始制作的配方名</li>
                    <li>允许调整悬浮窗大小</li>
                    <li>技能优先级顺序微调</li>
                </ul>
                v1.1.1.5
                <ul>
                    <li>添加预计品质的精确数值显示</li>
                    <li>允许使用设计变动</li>
                </ul>
                v1.1.1.4
                <ul>
                    <li>提高制作系技能模拟精度</li>
                    <li>修复崇敬层数错误</li>
                    <li>修复掌握层数错误</li>
                </ul>
            </div>
        );
    }
}

export default App;
