import React, { Component } from 'react';
import './App.css';

import 'rsuite/dist/styles/rsuite-dark.css';
import {
  Form, FormGroup, FormControl, ControlLabel, HelpBlock, InputNumber,
  IntlProvider, Icon, Nav, Sidenav, Navbar,
  Container, Header, Content, Footer, Sidebar,
  FlexboxGrid, Panel, PanelGroup, Col, Row,
  TreePicker, Button, Progress
} from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';

import('bp_solver_wasm').then(module => { console.log(module) })


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
        <Col md={5}>制作力<Line vertical percent={100} showInfo={false}/></Col>
        <Col md={5}>耐久度<Line vertical percent={100} showInfo={false}/></Col>
        <Col md={14}>
          进展<Line percent={80} showInfo={false} />
          品质<Line percent={30} showInfo={false} />
        </Col>
      </Row>
    </Panel>
  )
}

const PlayerAttributesCard = props => (
  <Form>
    <FormGroup>
      <ControlLabel>等级</ControlLabel>
      <InputNumber min={0} max={80} defaultValue={80} name="level" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>作业精度</ControlLabel>
      <InputNumber min={0} name="craftsmanship" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>加工精度</ControlLabel>
      <InputNumber min={0} name="craft" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>制作力</ControlLabel>
      <InputNumber min={0} name="cp" />
    </FormGroup>
  </Form>
);

const data = [
  {
    value: {},
    label: '自定义'
  },
  {
    value: {},
    label: '配方A',
  },
]

const RecipeCard = props => (
  <Form>
    <FormGroup>
      <ControlLabel>选择配方</ControlLabel>
      <TreePicker defaultExpandAll data={data} style={{ width: 246 }} />
    </FormGroup>
    <FormGroup>
      <ControlLabel>配方等级</ControlLabel>
      <InputNumber disabled={true} />
    </FormGroup>
    <FormGroup>
      <ControlLabel>等级</ControlLabel>
      <InputNumber disabled={true} />
    </FormGroup>
    <FormGroup>
      <ControlLabel>进展</ControlLabel>
      <InputNumber disabled={true} />
    </FormGroup>
    <FormGroup>
      <ControlLabel>品质</ControlLabel>
      <InputNumber disabled={true} />
    </FormGroup>
    <FormGroup>
      <ControlLabel>耐久</ControlLabel>
      <InputNumber disabled={true} />
    </FormGroup>
  </Form>
);


const PageMain = () => {
  return (
    <div>
      <PanelGroup accordion defaultActiveKey={1} bordered>
        <Panel header="玩家属性" eventKey={1}>
          <PlayerAttributesCard />
        </Panel>
        <Panel header="配方数值" eventKey={2}>
          <RecipeCard />
        </Panel>
      </PanelGroup>
      <CraftStatus />
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
    this.handleToggle = this.handleToggle.bind(this);
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
                    <Button color="black" href="https://github.com/Tnze">
                      <Icon icon="github" /> Tnze
                    </Button>
                  </Nav>
                </Sidenav.Body>
              </Sidenav>
              <Nav>
              </Nav>
              <NavToggle expand={expand} onChange={this.handleToggle} />
            </Sidebar>

            <PageMain />
          </Container>
        </div>
      </IntlProvider>
    );
  }
}

export default App;
