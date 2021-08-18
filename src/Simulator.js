const {useState} = require("react");
const {Row, Col, Progress} = require("antd");
const {List, arrayMove} = require('react-movable');
const {Line} = require('@ant-design/charts');
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
    const [items, setItems] = useState(
        ['reflect', 'basic_synth', 'masters_mend']
    );
    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <List
                    values={items}
                    onChange={({oldIndex, newIndex}) =>
                        setItems(arrayMove(items, oldIndex, newIndex))
                    }
                    renderList={({children, props, isDragged}) => (
                        <ul
                            {...props}
                            style={{
                                padding: '1em',
                                cursor: isDragged ? 'grabbing' : undefined,
                                height: '100%',
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
                    <Col flex={1}><Progress type="circle" percent={100} width={80}/></Col>
                    <Col flex={1}><Progress type="circle" percent={75} width={80}/></Col>
                </Row>
                <br/>
                <Row>
                    <Col flex={2}><Progress percent={50} steps={7}/></Col>
                </Row>
                <br/>
                <Row>
                    <Col flex={22}><Progress
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={99.9}
                    /></Col>
                </Row>
            </Col>
            <Col span={12}>
                <Line {...config} />
            </Col>
        </Row>
    );
}