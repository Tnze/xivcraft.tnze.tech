import Culinarian from './recipes/Culinarian.json';

const {useState} = require("react");
const {Row, Col, Form, InputNumber, Cascader} = require("antd");

function item_to_list(item) {
    return ({
        label: item.name.cn,
        value: item.recipeId,
    })
}

const data = [
    {
        value: "custom",
        label: '自定义',
    },
    {
        value: "culinarian",
        label: '烹调师',
        children: Culinarian.map(item_to_list),
    },
];

function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
}

function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

export const AttrSelector = () => {
    const [level, setLevel] = useState('80');
    const [craftsmanship, setCraftsmanship] = useState('2830');
    const [control, setControl] = useState('2710');
    const [craftPoint, setCraftPoint] = useState('636');

    const [recipe, setRecipe] = useState(['custom']);
    const [baseLevel, setBaseLevel] = useState('80');
    const [rlv, setRlv] = useState('510');
    const [prog, setProg] = useState('8591');
    const [qual, setQual] = useState('56662');
    const onRecipeChange = (x) => {
        setRecipe(x)
        if (x[0] !== "custom") {
            let recipe = Culinarian.find(e => e.recipeId === x[1]);
            setRlv(recipe.level);
            setBaseLevel(recipe.baseLevel);
            setProg(recipe.difficulty);
            setQual(recipe.maxQuality);
            console.log(x, recipe)
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                >
                    <Form.Item label="等级">
                        <InputNumber min={1} max={80} value={level} onChange={setLevel}/>
                    </Form.Item>
                    <Form.Item label="作业精度">
                        <InputNumber min={1} value={craftsmanship} onChange={setCraftsmanship}/>
                    </Form.Item>
                    <Form.Item label="加工精度">
                        <InputNumber min={1} value={control} onChange={setControl}/>
                    </Form.Item>
                    <Form.Item label="制作力">
                        <InputNumber min={1} value={craftPoint} onChange={setCraftPoint}/>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={12}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                >
                    <Form.Item label={"预设配方"}>
                        <Cascader
                            options={data}
                            defaultValue={recipe}
                            onChange={onRecipeChange}
                            placeholder="请选择"
                            showSearch={{filter}}
                        />
                    </Form.Item>
                    <Form.Item label={"配方品级"}>
                        <InputNumber value={rlv} onChange={setRlv} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"最大进展"}>
                        <InputNumber value={prog} onChange={setProg} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"最高品质"}>
                        <InputNumber value={qual} onChange={setQual} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"基础等级"}>
                        <InputNumber value={baseLevel} onChange={setBaseLevel} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}