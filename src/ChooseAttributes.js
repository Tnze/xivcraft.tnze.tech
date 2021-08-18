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

function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

export const AttrSelector = (props) => {
    const [recipe, setRecipe] = useState(['custom']);
    const onRecipeChange = (x) => {
        setRecipe(x)
        if (x[0] !== "custom") {
            let recipe = Culinarian.find(e => e.recipeId === x[1]);
            props.onChangeRecipe({
                recipeLevel: recipe.level,
                baseLevel: recipe.baseLevel,
                progress: recipe.difficulty,
                quality: recipe.maxQuality,
                durability: recipe.durability,
            })
        }
    }

    const onChangeLevel = v => props.onChangeAttributes({level: v})
    const onChangeCraftsmanship = v => props.onChangeAttributes({craftsmanship: v})
    const onChangeControl = v => props.onChangeAttributes({control: v})
    const onChangeCraftPoint = v => props.onChangeAttributes({craftPoint: v})

    const onChangeRLV = v => props.onChangeRecipe({recipeLevel: v});
    const onChangeBLV = v => props.onChangeRecipe({baseLevel: v});
    const onChangeProgress = v => props.onChangeRecipe({progress: v});
    const onChangeQuality = v => props.onChangeRecipe({quality: v});
    const onChangeDurability = v => props.onChangeRecipe({durability: v});

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                >
                    <Form.Item label="等级">
                        <InputNumber min={1} max={80} value={props.attr.level} onChange={onChangeLevel}/>
                    </Form.Item>
                    <Form.Item label="作业精度">
                        <InputNumber min={1} value={props.attr.craftsmanship} onChange={onChangeCraftsmanship}/>
                    </Form.Item>
                    <Form.Item label="加工精度">
                        <InputNumber min={1} value={props.attr.control} onChange={onChangeControl}/>
                    </Form.Item>
                    <Form.Item label="制作力">
                        <InputNumber min={1} value={props.attr.craftPoint} onChange={onChangeCraftPoint}/>
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
                        <InputNumber value={props.recipe.recipeLevel} onChange={onChangeRLV} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"最大进展"}>
                        <InputNumber value={props.recipe.progress} onChange={onChangeProgress} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"最高品质"}>
                        <InputNumber value={props.recipe.quality} onChange={onChangeQuality} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"基础等级"}>
                        <InputNumber value={props.recipe.baseLevel} onChange={onChangeBLV} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                    <Form.Item label={"配方耐久"}>
                        <InputNumber value={props.recipe.durability} onChange={onChangeDurability} disabled={recipe[0] !== 'custom'}/>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}