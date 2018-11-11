import React, {Component} from 'react'
import Header from "../../components/header/header"
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class Addgoods extends React.Component{
    state = {
        name:'',
        price:0,
        counts:0,
        hot:0,
        unit:'瓶',
        tid:1
    };
    submit(){
        fetch('/api/admin/goods_add',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.state)
        }).then(a=>a.json()).then(b=>{
            if(b==="yes"){
                message.success('添加成功',0.5);
                this.setState({
                    name:'',
                    price:0,
                    counts:0,
                    hot:0,
                    unit:'瓶',
                    tid:1
                })
            }else{
                message.error('添加失败',0.5)
            }
        })
    };
    render(){
        const layout ={
            labelCol:{span:2},
            wrapperCol: { span: 6 },
        };
        const { getFieldDecorator } = this.props.form;
        const {counts,hot,unit}=this.state;
        return(
            <Form onSubmit={(e)=>{e.preventDefault();this.submit()}}>
                <FormItem label={"商品名称"} {...layout}>
                    {getFieldDecorator('name',{
                        rules:[
                            {required:true,message:'内容不能为空'},
                            {min:2,message:'不得少于两位'}
                        ]
                    })(
                        <Input  autoComplete="off" onChange={(e)=>this.setState({name:e.target.value})}/>
                    )}
                </FormItem>
                <FormItem label={"商品价格"} {...layout}>
                    {getFieldDecorator('price',{
                        rules:[
                            {required:true,message:'必须是数字'},
                        ]
                    })(
                    <Input type='number' autoComplete="off" onChange={(e)=>this.setState({price:e.target.value})}/>
                    )}
                </FormItem>
                <FormItem label={"库存"} {...layout}>
                    <Input value={counts} type='number' autoComplete="off" onChange={(e)=>this.setState({counts:e.target.value})}/>
                </FormItem>
                <FormItem label={"火热度"} {...layout}>
                    <Input value={hot} type='number' autoComplete="off" onChange={(e)=>this.setState({hot:e.target.value})}/>
                </FormItem>
                <FormItem label={"单位"} {...layout}>
                    <Input value={unit} autoComplete="off" onChange={(e)=>this.setState({unit:e.target.value})}/>
                </FormItem>
                <FormItem label={"类别"} {...layout}>
                    {getFieldDecorator('tid',{
                        rules:[
                            {required:true,message:'必须是1或2'},
                        ]
                    })(
                    <Input type='number' autoComplete="off" onChange={(e)=>this.setState({tid:e.target.value})}/>
                    )}
                </FormItem>
                <FormItem wrapperCol={{offset:2}}>
                    <Button type="primary" htmlType='submit'>提交</Button>
                </FormItem>
            </Form>
        )
    }
    componentDidMount(){
        this.props.form.validateFields();
    }
}
const AddGoods = Form.create()(Addgoods);
class Addshop extends React.Component{
    render(){
        return(
            <Header selected={'g_add'}>
                <AddGoods></AddGoods>
            </Header>
        )
    }

}
export default Addshop;