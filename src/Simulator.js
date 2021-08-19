// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "./AI.worker"

const {Component} = require("react");
const {Row, Col, Progress} = require("antd");
const {DragDropContext, Droppable, Draggable} = require('react-beautiful-dnd');
const {DualAxes} = require('@ant-design/charts');
const {SkillIcon} = require("./SkillIcon");

const skills_name_translate = {
    "basic_synth": "制作",
    "basic_touch": "加工",
    "masters_mend": "精修",
    "inner_quiet": "内静",
    "observe": "观察",
    "tricks_of_the_trade": "秘诀",
    "waste_not": "俭约",
    "veneration": "崇敬",
    "standard_touch": "中级加工",
    "great_strides": "阔步",
    "innovation": "改革",
    "name_of_the_elements": "元素之美名",
    "brand_of_the_elements": "元素之印记",
    "final_appraisal": "最终确认",
    "waste_not_ii": "长期俭约",
    "byregot_s_blessing": "比尔格的祝福",
    "precise_touch": "集中加工",
    "muscle_memory": "坚信",
    "careful_synth": "模范制作",
    "manipulation": "掌握",
    "prudent_touch": "俭约加工",
    "focused_synth": "注视制作",
    "focused_touch": "注视加工",
    "reflect": "闲静",
    "preparatory_touch": "坯料加工",
    "groundwork": "坯料制作",
    "delicate_synth": "精密制作",
    "intensive_synth": "集中制作",
    "trained_eye": "工匠的神速技巧",
}

const SkillsButtonList = (props) =>
    [
        'muscle_memory', 'reflect', 'trained_eye',
        'basic_synth', 'brand_of_the_elements', 'careful_synth',
        'focused_synth', 'groundwork', 'intensive_synth', 'delicate_synth',
        'basic_touch', 'standard_touch', 'byregot_s_blessing',
        'precise_touch', 'prudent_touch', 'focused_touch', 'preparatory_touch',
        'masters_mend', 'waste_not', 'waste_not_ii', 'manipulation',
        'inner_quiet', 'veneration', 'innovation', 'great_strides',
        'name_of_the_elements', 'observe', 'final_appraisal',
    ].map((sk, i) =>
        <Col key={`[${i}] ${sk}`} flex={'48px'}>
            <button
                onClick={() => props.appendSkill(sk)}
                style={{
                    margin: 0,
                    padding: 0,
                    outline: 'none',
                    border: 'none',
                }}
            >
                <SkillIcon skill={sk}/>
            </button>
        </Col>
    )


export class Simulator extends Component {
    constructor(props) {
        super(props);

        const worker = new Worker();
        worker.onmessage = e => {
            switch (e.data.action) {
                case 'loading':
                    this.props.setHelperStatus(e.data.loading.progress);
                    break;
                case 'result':
                    let result = JSON.parse(e.data.result);
                    this.setState({exItems: result})
                    this.simulate(this.state.items.concat(result))
                    break;
                default:
            }
        }

        this.state = {
            du: props.recipe.durability,
            cp: props.attr.craftPoint,
            pg: 0,
            qu: 0,
            simulate: _skills => console.log("simulator is not ready"),
            simulateResult: [[], []],
            items: [],
            exItems: [],
            worker,
        }
    }

    componentDidMount() {
        this.state.worker.postMessage({
            action: 'init',
            attr: this.props.attr,
            recipe: this.props.recipe,
        });
        this.props.setHelperStatus(0);
    }

    componentWillUnmount() {
        this.state.worker.terminate();
    }

    onItemsChange(skills) {
        this.simulate(skills);
        this.state.worker.postMessage({
            action: 'resolve',
            pre: skills,
        })
    }

    simulate(skills) {
        import("bp_solver_wasm").then(m => {
            let s = new m.JsStatus(
                this.props.attr.level,
                this.props.attr.craftsmanship,
                this.props.attr.control,
                this.props.attr.craftPoint,
                false,
                this.props.recipe.recipeLevel,
                this.props.recipe.baseLevel,
                this.props.recipe.progress,
                this.props.recipe.quality,
                this.props.recipe.durability,
            );
            try {
                let resources = [];
                let incomes = [];
                let record = (sk, s) => {
                    resources.push({
                        skill: sk,
                        value: s.du(),
                        key: 'durability'
                    })
                    resources.push({
                        skill: sk,
                        value: s.cp(),
                        key: 'craft_points'
                    })
                    incomes.push({
                        skill: sk,
                        value: s.pg(),
                        key: 'progress'
                    })
                    incomes.push({
                        skill: sk,
                        value: s.qu(),
                        key: 'quality'
                    })
                };
                record('[0] 初始状态', s);
                for (let i in skills) {
                    let r = s.cast_skills(skills[i]);
                    if (r) {
                        console.log(skills[i], r)
                        break;
                    }
                    record(`[${Number(i) + 1}] ${skills_name_translate[skills[i]]}`, s);
                }
                this.setState({
                    simulateResult: [resources, incomes],
                    du: s.du(),
                    cp: s.cp(),
                    pg: s.pg(),
                    qu: s.qu(),
                })
            } catch (e) {
                console.log(e);
            } finally {
                s.free();
            }
        }).catch(console.error);
    }

    render() {
        // a little function to help us with reordering the result
        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };
        const grid = 8;
        const getItemStyle = (isDragging, draggableStyle) => ({
            // some basic styles to make the items look a bit nicer
            userSelect: 'none',

            // change background colour if dragging
            background: 'transparent',

            // styles we need to apply on draggables
            ...draggableStyle,
        });

        const getListStyle = isDraggingOver => ({
            background: 'transparent',
            display: 'flex',
            padding: grid,
            overflow: 'auto',
        });

        const config = {
            data: this.state.simulateResult,
            xField: 'skill',
            yField: ['value', 'value'],
            geometryOptions: [
                {
                    geometry: 'column',
                    isStack: true,
                    seriesField: 'key'
                },
                {
                    geometry: 'line',
                    seriesField: 'key',
                    stepType: 'hvh',
                },
            ],
            xAxis: {
                label: {
                    autoRotate: true,
                    autoHide: false,
                    autoEllipsis: false,
                },
            },
            annotations: {
                value: [
                    {
                        type: 'line',
                        top: true,
                        start: ['min', this.props.recipe.progress],
                        end: ['max', this.props.recipe.progress],
                        style: {
                            lineWidth: 1,
                            lineDash: [3, 3],
                        },
                        text: {
                            content: `完成进展阈值(${this.props.recipe.progress})`,
                            position: 'end',
                            style: {textAlign: 'end'},
                        },
                    },
                    {
                        type: 'line',
                        top: true,
                        start: ['min', this.props.recipe.quality],
                        end: ['max', this.props.recipe.quality],
                        style: {
                            lineWidth: 1,
                            lineDash: [3, 3],
                        },
                        text: {
                            content: `最高品质(${this.props.recipe.quality})`,
                            position: 'end',
                            style: {textAlign: 'end'},
                        },
                    },
                ],
            }
        };
        const onDelete = i => {
            let newItems = Array.from(this.state.items);
            newItems.splice(i, 1);
            this.setState({items: newItems});
            this.onItemsChange(newItems);
        }
        const onDragEnd = result => {
            // dropped outside the list
            if (result.destination) {
                let newItems = reorder(
                    this.state.items,
                    result.source.index,
                    result.destination.index
                );
                this.setState({items: newItems});
                this.onItemsChange(newItems);
            }
        };
        const appendSkill = sk => {
            let result = Array.from(this.state.items);
            result.push(sk);
            this.setState({items: result});
            this.onItemsChange(result)
        }
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {this.state.items.map((item, index) => (
                                            <Draggable
                                                key={`[${index}]${item}`}
                                                draggableId={`[${index}]${item}`}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                        onContextMenu={(e) => {
                                                            onDelete(index);
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <SkillIcon skill={item}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    {this.state.exItems.map((item, i) =>
                        <Col style={{margin: 0, padding: 0}} key={`[${i}] ${item}`} flex={'48px'}>
                            <SkillIcon skill={item}/>
                        </Col>
                    )}
                </Row>
                <Row style={{marginTop: '30px'}} gutter={[16, 16]}>
                    <Col span={8}>
                        <Row>
                            <Col flex={1}><Progress
                                type="circle"
                                percent={this.state.pg / this.props.recipe.progress * 100}
                                format={_percent => `${this.state.pg}`}
                                width={80}
                            /></Col>
                            <Col flex={1}><Progress
                                type="circle"
                                percent={this.state.qu / this.props.recipe.quality * 100}
                                format={_percent => `${this.state.qu}`}
                                width={80}
                            /></Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col flex={2}><Progress
                                percent={this.state.du / this.props.recipe.durability * 100} steps={7}
                                format={_percent => `${this.state.du} Du`}
                            /></Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col flex={22}><Progress
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                                percent={this.state.cp / this.props.attr.craftPoint * 100}
                                format={_percent => `${this.state.cp} CP`}
                            /></Col>
                        </Row>
                        <Row>
                            <SkillsButtonList appendSkill={appendSkill}/>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <DualAxes {...config} />
                    </Col>
                </Row>
            </div>
        );
    }
}