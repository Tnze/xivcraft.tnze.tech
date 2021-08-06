import React, { Component } from 'react';
import './App.css';

import 'rsuite/dist/styles/rsuite-dark.css';
import {
  Form, FormGroup, FormControl, ControlLabel, HelpBlock, InputNumber,
  IntlProvider, Icon, Nav, Sidenav, Navbar,
  Container, Header, Content, Footer, Sidebar,
  FlexboxGrid, Panel, PanelGroup, Col, Row,
  TreePicker, Button, Progress, Grid, Alert,
} from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
import Culinarian from './recipes/Culinarian.json';

var run = undefined;
import('bp_solver_wasm').then(module => {
  run = module.run;
  // let result = module.run(76, 1069, 981, 357, false, 290, 70, 2214, 32860, 60);
  // console.log(result);
})

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const CraftStatus = () => {
  const { Line, Circle, } = Progress;
  return (
    <Panel header="制作" bordered>
      <Row>
        <Col md={5}>制作力<Line vertical percent={100} showInfo={false} /></Col>
        <Col md={5}>耐久度<Line vertical percent={100} showInfo={false} /></Col>
        <Col md={14}>
          进展<Line percent={80} showInfo={false} />
          品质<Line percent={30} showInfo={false} />
        </Col>
      </Row>
    </Panel>
  )
}

const PlayerAttributesCard = props => {
  return (
    <Form fluid>
      <FormGroup>
        <ControlLabel>等级</ControlLabel>
        <InputNumber min={0} max={80} defaultValue={76} name="level" onChange={(e) => props.set_level(e)} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>作业精度</ControlLabel>
        <InputNumber min={0} defaultValue={1069} name="craftsmanship" onChange={(e) => props.set_craftsmanship(e)} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>加工精度</ControlLabel>
        <InputNumber min={0} defaultValue={981} name="craft" onChange={(e) => props.set_craft(e)} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>制作力</ControlLabel>
        <InputNumber min={0} defaultValue={357} name="craft_points" onChange={(e) => props.set_craft_points(e)} />
      </FormGroup>
    </Form>
  );
};

function item_to_list(item) {
  return ({
    label: item.name.cn,
    value: {
      rlv: item.level,
      recipe_player_level: item.baseLevel,
      progress: item.difficulty,
      quality: item.maxQuality,
      durability: item.durability
    }
  })
}

const data = [
  {
    value: "",
    label: '自定义'
  },
  {
    value: "culinarian",
    label: '烹调师',
    children: Culinarian.map(item_to_list),
  },
];

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {
        rlv: 0,
        recipe_player_level: 0,
        progress: 0,
        quality: 0,
        durability: 0
      },
    };
  }
  handleSelectChange = (item) => {
    this.setState(prevState => ({
      selectedItem: item
    }));
    this.props.handleUpdateRecipe(item);
  }
  render() {
    return (
      <Form fluid>
        <FormGroup>
          <ControlLabel>选择配方</ControlLabel>
          <TreePicker
            data={data}
            style={{ width: 246 }}
            onChange={this.handleSelectChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>配方等级</ControlLabel>
          <InputNumber disabled={true} value={this.state.selectedItem.rlv} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>等级</ControlLabel>
          <InputNumber disabled={true} value={this.state.selectedItem.recipe_player_level} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>进展</ControlLabel>
          <InputNumber disabled={true} value={this.state.selectedItem.progress} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>品质</ControlLabel>
          <InputNumber disabled={true} value={this.state.selectedItem.quality} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>耐久</ControlLabel>
          <InputNumber disabled={true} value={this.state.selectedItem.durability} />
        </FormGroup>
      </Form>
    )
  }
}


const PageMain = () => {
  let attributes = {
    level: 76,
    craftsmanship: 1069,
    craft: 981,
    craft_points: 357
  }
  let recipe = {
    rlv: 0,
    recipe_player_level: 0,
    progress: 0,
    quality: 0,
    durability: 0
  };
  return (
    <div>
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={6}>
            <Panel header="玩家属性" eventKey={1}>
              <PlayerAttributesCard
                set_level={(v) => attributes.level = v}
                set_craftsmanship={(v => attributes.craftsmanship = v)}
                set_craft={(v) => attributes.craft = v}
                set_craft_points={(v) => attributes.craft_points = v}
              />
            </Panel>
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Panel header="配方数值" eventKey={2}>
              <RecipeCard handleUpdateRecipe={(item) => recipe = item} />
            </Panel>
          </Col>
          <Col>
            <CraftStatus />
            <Button color="green" onClick={() => {
              console.log("start", attributes, recipe);
              let result = run(
                attributes.level,
                attributes.craftsmanship,
                attributes.craft,
                attributes.craft_points,
                false,
                recipe.rlv,
                recipe.recipe_player_level,
                recipe.progress,
                recipe.quality,
                recipe.durability
              );
              console.log(result);
              Alert.success('解：' + result, 0)
            }}>开始求解！
            </Button>
            <p> 
              Q1: 这是什么？<br/>
              A1: ff14生产求解器<br/>
              <br/>
              Q2: 怎么用？<br/>
              A2: 先输入玩家属性，再选择配方，最后点击“开始求解！”<br/>
              <br/>
              Q3: 为什么浏览器卡住了？<br/>
              A3: 因为没有把运算放到后台线程去做，所以把界面卡住了。如果浏览器显示“页面未响应”，请选择“等待”<br/>
              <br/>
              Q4: 要卡多久？<br/>
              A4: 大概两分钟，求得的解可以复制并导入<a href="http://ffxiv.tk/crafter/#/simulator">生产模拟器</a><br/>
              <br/>
              Q5: 为什么不把运算放到后台？<br/>
              A5: 我不会写前端（绝对不是因为懒，嗯）<br/>
              <br/>
              Q6: 上面那几个进度条一样的东西是干啥的？<br/>
              A6: 没用，好看的。<br/>
              <br/>
              Q7: 这个求解器有什么特点？<br/>
              A7: 
              - 优点：能在可接受的时间内求出 <b>最 优 解</b><br/>
              - 缺点：慢（还没有进度提示）<br/>
              - 缺点2：还没写完，所以只支持闲静起手<br/>
              <br/>
              Q8: 你这界面真丑 &amp;&amp; (我有改进意见 || 我可以帮忙做前端 || 我想把它整合进自己的模拟器)<br/>
              A8: 点左边那个青色的按钮，可以联系到我。<br/>
            </p>
          </Col>
        </Row>
      </Grid>

    </div>
  );
}

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            <Icon icon={expand ? 'angle-left' : 'angle-right'} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
    this.selected_item = null;
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleSelectedItemChange(item) {
    this.selected_item = item;
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }
  render() {
    const { expand } = this.state;
    return (
      <IntlProvider locale={zhCN}>
        <div className="show-fake-browser sidebar-page">
          <Container>
            <Sidebar
              style={{ display: 'flex', flexDirection: 'column' }}
              width={expand ? 260 : 56}
              collapsible
            >
              <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                <Sidenav.Header>
                  <div style={headerStyles}>
                    <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                    <span style={{ marginLeft: 12 }}> 生产制作求解器</span>
                  </div>
                </Sidenav.Header>
                <Sidenav.Body>
                  <Nav>
                    <Nav.Item eventKey="1" active icon={<Icon icon="home" />}>
                      介绍
                    </Nav.Item>
                    <Nav.Item eventKey="2" icon={<Icon icon="dashboard" />}>
                      求解
                    </Nav.Item>
                    <Nav.Item eventKey="3" icon={<Icon icon="attribution" />}>
                      算法
                    </Nav.Item>
                    <Button color="cyan" href="https://github.com/Tnze">
                      <Icon icon="github" /> Tnze
                    </Button>
                  </Nav>
                </Sidenav.Body>
              </Sidenav>
              <Nav>
              </Nav>
              <NavToggle expand={expand} onChange={this.handleToggle} />
            </Sidebar>
            <Content>
              <PageMain />
            </Content>
          </Container>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
