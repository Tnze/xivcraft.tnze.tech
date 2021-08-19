// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "./AI.worker"

const {useState} = require("react");
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

export const Simulator = (props) => {
    const [du, setDu] = useState(props.recipe.durability);
    const [cp, setCp] = useState(props.attr.craftPoint);
    const [pg, setPg] = useState(0);
    const [qu, setQu] = useState(0);
    const [simulateResult, setSimulateResult] = useState([[], []])
    const [items, setItems] = useState([]);

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
    const bp_solver_wasm = import("bp_solver_wasm")
    let simulate = _skills => console.log("not ready");
    bp_solver_wasm.then(m => {
        simulate = skills => {
            let s = new m.JsStatus(
                props.attr.level,
                props.attr.craftsmanship,
                props.attr.control,
                props.attr.craftPoint,
                false,
                props.recipe.recipeLevel,
                props.recipe.baseLevel,
                props.recipe.progress,
                props.recipe.quality,
                props.recipe.durability,
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
                    if (r) console.log(skills[i], r);
                    record(`[${Number(i) + 1}] ${skills_name_translate[skills[i]]}`, s);
                }
                setSimulateResult([resources, incomes]);
                console.log([resources, incomes])
                setDu(s.du());
                setCp(s.cp());
                setPg(s.pg());
                setQu(s.qu());
            } catch (e) {
                console.log(e);
            } finally {
                s.free();
            }
        };
    }).catch(console.error);
    const config = {
        data: simulateResult,
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
                    start: ['min', props.recipe.progress],
                    end: ['max', props.recipe.progress],
                    style: {
                        lineWidth: 1,
                        lineDash: [3, 3],
                    },
                    text: {
                        content: `完成进展阈值(${props.recipe.progress})`,
                        position: 'end',
                        style: {textAlign: 'end'},
                    },
                },
                {
                    type: 'line',
                    top: true,
                    start: ['min', props.recipe.quality],
                    end: ['max', props.recipe.quality],
                    style: {
                        lineWidth: 1,
                        lineDash: [3, 3],
                    },
                    text: {
                        content: `最高品质(${props.recipe.quality})`,
                        position: 'end',
                        style: {textAlign: 'end'},
                    },
                },
            ],
        }
    };
    const onDelete = i => {
        let newItems = Array.from(items);
        newItems.splice(i, 1);
        setItems(newItems)
        simulate(newItems)
    }
    const onDragEnd = result => {
        let newItems = items;
        // dropped outside the list
        if (result.destination) {
            newItems = reorder(
                items,
                result.source.index,
                result.destination.index
            );
            setItems(newItems)
            simulate(newItems)
        }
    };
    const appendSkill = sk => {
        let result = Array.from(items);
        result.push(sk);
        setItems(result);
        simulate(result)
    }
    const worker = new Worker();

    worker.postMessage({action: 'init', attr: props.attr, recipe: props.recipe});
    worker.onmessage = e => {
        switch (e.data.action) {
            case 'loading':
                props.setHelperStatus(e.data.loading.progress);
                break;
            default:
        }
    }
    const skillsButtonList = list =>
        <Row>
            {list.map((sk, i) =>
                <Col key={`[${i}] ${sk}`} flex={'48px'}>
                    <button
                        onClick={() => appendSkill(sk)}
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
            )}
        </Row>
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
                                    {items.map((item, index) => (
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
            <Row style={{marginTop: '30px'}} gutter={[16, 16]}>
                <Col span={8}>
                    <Row>
                        <Col flex={1}><Progress
                            type="circle"
                            percent={pg / props.recipe.progress * 100}
                            format={_percent => `${pg}`}
                            width={80}
                        /></Col>
                        <Col flex={1}><Progress
                            type="circle"
                            percent={qu / props.recipe.quality * 100}
                            format={_percent => `${qu}`}
                            width={80}
                        /></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col flex={2}><Progress
                            percent={du / props.recipe.durability * 100} steps={7}
                            format={_percent => `${du} Du`}
                        /></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col flex={22}><Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={cp / props.attr.craftPoint * 100}
                            format={_percent => `${cp} CP`}
                        /></Col>
                    </Row>
                    <Row>
                        {skillsButtonList([
                            'muscle_memory', 'reflect', 'trained_eye',
                            'basic_synth', 'brand_of_the_elements', 'careful_synth',
                            'focused_synth', 'groundwork', 'intensive_synth', 'delicate_synth',
                            'basic_touch', 'standard_touch', 'byregot_s_blessing',
                            'precise_touch', 'prudent_touch', 'focused_touch', 'preparatory_touch',
                            'masters_mend', 'waste_not', 'waste_not_ii', 'manipulation',
                            'inner_quiet', 'veneration', 'innovation', 'great_strides',
                            'name_of_the_elements', 'observe', 'final_appraisal',
                        ])}
                    </Row>
                </Col>
                <Col span={16}>
                    <DualAxes {...config} />
                </Col>
            </Row>
        </div>
    );
}