import React from "react";
import Header from "components/header/header.js";
import { Form, Icon, Input, Button, Radio, InputNumber, Upload, Modal } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class AddForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 12 },
          };
        return (
            <Form>
                <FormItem label={"商品名称"} {...formItemLayout}>
                    <Input></Input>
                </FormItem>
                <FormItem label={"商品价格"} {...formItemLayout}>
                    <Input></Input>
                </FormItem>
                <FormItem label={"商品图片"} {...formItemLayout}>
                    <Input></Input>
                </FormItem>
                <FormItem label={"商品热度"} {...formItemLayout}>
                    <InputNumber min={1} max={5} defaultValue={3} />
                </FormItem>
                <FormItem label={"商品数量"} {...formItemLayout}>
                    <Input></Input>
                </FormItem>
                <FormItem label={"商品单位"} {...formItemLayout}>
                    <Input></Input>
                </FormItem>
                <FormItem label={"商品类别"} {...formItemLayout}>
                    <RadioGroup value={0}>
                        <Radio value={0}>酒水</Radio>
                        <Radio value={1}>零食</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem wrapperCol={{ span: 12, offset: 2 }}>
                    <Button>提交</Button>
                </FormItem>
            </Form>
        )
    }
}

const AddFormGoods = Form.create()(AddForm);
class Index extends React.Component {
    render() {
        return (
            <Header select={"goods_change"} sub={"goods"}>
                <AddFormGoods></AddFormGoods>
            </Header>    
        )
    }
}

export default Index;