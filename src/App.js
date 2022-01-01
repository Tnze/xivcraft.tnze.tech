import React, {Component} from 'react';
import {Row, Col, Steps} from 'antd';
import './App.css';

const {Step} = Steps;


class App extends Component {
    render() {
        return (
            <div className="App">
                帖子1：<a href="https://bbs.nga.cn/read.php?tid=28176186">桌面版生产模拟器 / 普通配方用求解器</a><br/>
                <br/>
                生产模拟器网页版已封存，短期内不再提供服务（我懒。<br/>
                <br/>
                帖子2：<a href="https://bbs.nga.cn/read.php?tid=28846320">高难生产轮椅</a><br/>
                <br/><br/>
                <b><i>生产轮椅下载</i></b><br/>
                <br/>
                v1.1.1.12 <a href="https://www.aliyundrive.com/s/NQu4pPur3ym">https://www.aliyundrive.com/s/NQu4pPur3ym</a><br/>
                <s>v1.1.1.11 <a
                href="https://www.aliyundrive.com/s/8rSyLw33T9G">https://www.aliyundrive.com/s/8rSyLw33T9G</a></s><br/>
                <s>v1.1.1.10 <a
                    href="https://www.aliyundrive.com/s/SAXDjmjZ2us">https://www.aliyundrive.com/s/SAXDjmjZ2us</a></s><br/>
                <s>v1.1.1.9 <a
                    href="https://www.aliyundrive.com/s/4g52NVEfJX1">https://www.aliyundrive.com/s/4g52NVEfJX1</a></s><br/>
                <s>v1.1.1.6 <a
                    href="https://www.aliyundrive.com/s/Chr8axjZAfb">https://www.aliyundrive.com/s/Chr8axjZAfb</a></s><br/>
                <s>v1.1.1.5 <a
                    href="https://www.aliyundrive.com/s/ECjwCvT2UAu">https://www.aliyundrive.com/s/ECjwCvT2UAu</a></s><br/>
                <s>v1.1.1.4 <a
                    href="https://www.aliyundrive.com/s/JArYwywjx6v">https://www.aliyundrive.com/s/JArYwywjx6v</a></s><br/>
                <s>v1.1.1.3 <a
                    href="https://www.aliyundrive.com/s/YE5L2F3bwCK">https://www.aliyundrive.com/s/YE5L2F3bwCK</a></s><br/>

                <br/>
                <b><i>更新日志</i></b><br/>
                <br/>
                v1.1.1.12 元旦特别版
                <ul>
                    <li>为悬浮窗添加了可爱的蓝色边框（？</li>
                    <li>略微调整了技能的优先顺序</li>
                    <li>大幅优化了插件的大小</li>
                </ul>

                v1.1.1.11
                <ul>
                    <li>更新了版本号</li>
                </ul>

                v1.1.1.10
                <ul>
                    <li>修复无法正常加载的问题</li>
                </ul>

                v1.1.1.9（已删除，请更新v1.1.1.10）
                <ul>
                    <li>将求解器保存指文件的功能处于实验阶段，并且非常缓慢，不建议使用（）</li>
                    <li>多显示了一些数据</li>
                    <li>自动检查更新【并没有做】</li>
                    <li>抓包小工具（？）</li>
                </ul>

                v1.1.1.8 (内部版本)
                <ul>
                    <li>支持将加载的求解器保存至文件下次直接加载</li>
                    <li><s>支持自动检查更新</s>（并没有）</li>
                </ul>

                v1.1.1.7 (内部版本)
                <ul>
                    <li>优化推荐技能</li>
                    <li>添加悬浮窗动画</li>
                    <li>错误处理</li>
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
