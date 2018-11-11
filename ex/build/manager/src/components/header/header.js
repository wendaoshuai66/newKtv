import React from "react";
import "./header.scss";
import avatar from "./avatar.jpg";
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
        <Header className="header" style={{ background: '#105FA4' }}>
          <div className="logo" />
          <Menu
            mode="horizontal"
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <SubMenu title={<span className="avatar"><img src={avatar} alt="头像" style={{width: "50px", height: "50px"}} /><i className="on bottom b-white" /></span>}>
              <MenuItemGroup title="用户中心">
                <Menu.Item key="setting:1">你好</Menu.Item>
                <Menu.Item key="setting:2"><Link to={'/admin/person'}>个人信息</Link></Menu.Item>
                <Menu.Item key="logout"><span><Link to={'/admin/loginout'}>退出登录</Link></span></Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to={'/admin'}>首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff', "height": "calc(100vh - 180px)" }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[this.props.select]}
                defaultOpenKeys={[this.props.sub]}
                style={{ height: '100%' }}
              >
                <Menu.Item key="index"><span><Icon type="desktop" /><Link to={'/admin'}>首页</Link></span></Menu.Item>
                <SubMenu key="personnal" title={<span><Icon type="user" />个人资料</span>}>
                  <Menu.Item key="person"><Link to={'/person'}>个人信息</Link></Menu.Item>
                  <Menu.Item key="person_change"><Link to={'/person/change'}>密码修改</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="game" title={<span><Icon type="laptop" />游戏管理</span>}>
                  <Menu.Item key="risk_add"><Link to={'/risk/add'}>添加真心话</Link></Menu.Item>
                  <Menu.Item key="risk_change"><Link to={'/risk/change'}>修改真心话</Link></Menu.Item>
                  <Menu.Item key="risk_delete"><Link to={'/risk/delete'}>删除真心话</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="goods" title={<span><Icon type="notification" />商品管理</span>}>
                  <Menu.Item key="goods_delete"><Link to={'/goods/delete'}>查看商品</Link></Menu.Item>
                  <Menu.Item key="goods_add"><Link to={'/goods/add'}>修改商品</Link></Menu.Item>
                  <Menu.Item key="goods_change"><Link to={'/goods/change'}>添加商品</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="orders" title={<span><Icon type="appstore" />订单管理</span>}>
                  <Menu.Item key="order_sing"><Link to={'/order/sing'}>歌单管理</Link></Menu.Item>
                  <Menu.Item key="order_goods"><Link to={'/order/goods'}>订单管理</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
        <style>{`
            .ant-menu-submenu-horizontal > .ant-menu {
                width: 120px;
                left: -40px;
            }
        `}</style>
      </Layout>

    )
  }
}

export default HeaderCustom;