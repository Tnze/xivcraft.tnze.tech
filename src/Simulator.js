const {useState} = require("react");
const {Row, Col, Progress} = require("antd");
const {List, arrayMove} = require('react-movable');
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
    const [simulateResult, setSimulateResult] = useState([])
    const [items, setItems] = useState(
        [
            'reflect', 'manipulation', 'veneration', 'waste_not_ii',
            'groundwork', 'groundwork', 'groundwork', 'innovation',
            'preparatory_touch', 'preparatory_touch', 'preparatory_touch',
            'preparatory_touch', 'great_strides', 'innovation',
            'prudent_touch', 'great_strides', 'byregot_s_blessing',
            'veneration', 'observe', 'focused_synth', 'basic_synth',
        ]
    );
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
                let i = 0;
                let result = skills.map(sk => {
                    let r = s.cast_skills(sk);
                    if (r) console.log(sk, r);
                    return {
                        skill: `[${i++}] ${skills_name_translate[sk]}`,
                        durability: s.du(),
                        craftPoint: s.cp(),
                        progress: s.pg(),
                        quality: s.qu(),
                    }
                });
                setSimulateResult(result);
                console.log(result)
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
        data: [simulateResult, simulateResult],
        xField: 'skill',
        yField: ['craftPoint', 'durability'],
        geometryOptions: [
            {
                geometry: 'line',
                color: '#29cae4',
                stepType: 'vh',
            },
            {
                geometry: 'line',
                color: '#586bce',
                stepType: 'vh',
            },
        ],
    };
    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <List
                    values={items}
                    onChange={({oldIndex, newIndex}) => {
                        setItems(arrayMove(items, oldIndex, newIndex));
                        simulate(items);
                    }}
                    renderList={({children, props, isDragged}) => (
                        <ul
                            {...props}
                            style={{
                                padding: '1em',
                                cursor: isDragged ? 'grabbing' : undefined,
                                height: '450px',
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                            }}
                        >
                            {children}
                        </ul>
                    )}
                    renderItem={({value, props, isDragged, isSelected}) => (
                        <li
                            {...props}
                            style={{
                                ...props.style,
                                listStyleType: 'none',
                                cursor: isDragged ? 'grabbing' : 'grab',
                                color: '#333',
                                borderRadius: '5px',
                                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                                backgroundColor: isDragged || isSelected ? 'transparent' : 'transparent'
                            }}
                        >
                            <SkillIcon skill={value}/>
                            <span
                                style={{
                                    display: 'inline-block',
                                    height: '48px',
                                    lineHeight: '48px',
                                    textAlign: 'left',
                                    verticalAlign: 'middle',
                                }}
                            >{skills_name_translate[value]}</span>
                        </li>
                    )}
                />
            </Col>
            <Col span={6}>
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
            </Col>
            <Col span={12}>
                <DualAxes {...config} />
            </Col>
        </Row>
    );
}