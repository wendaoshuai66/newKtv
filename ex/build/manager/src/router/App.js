import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Index from "../pages/index/index";
import Person from "../pages/person/person";
import PersonChange from "../pages/person/person_change";
import RiskAdd from "../pages/game/game_add";
import RiskChange from "../pages/game/game_change";
import RiskDelete from "../pages/game/game_delete";
import GoodsAdd from "../pages/goods/goods_add";
import GoodsChange from "../pages/goods/good_change";
import GoodsDelete from "../pages/goods/good_delete";
import OrderSing from "../pages/order/order_sing";
import OrderGoods from "../pages/order/order_goods";
import Login from "../pages/login/login";
 
class App extends Component {
  render() {
    return (
      <Router>
        <div className="login">
          <Route exact path="/login" component={Login}></Route>
          <Route exact path='/admin/index' component={Index}/>
          <Route path='/admin/person' component={Person}/>
          <Route path='/admin/person/change' component={PersonChange}/>
          <Route path='/admin/risk/add' component={RiskAdd}/>
          <Route path='/admin/risk/change' component={RiskChange}/>
          <Route path='/admin/risk/delete' component={RiskDelete}/>
          <Route path='/admin/goods/add' component={GoodsAdd}/>
          <Route path='/admin/goods/change' component={GoodsChange}/>
          <Route path='/admin/goods/delete' component={GoodsDelete}/>
          <Route path='/admin/order/sing' component={OrderSing}/>
          <Route path='/admin/order/goods' component={OrderGoods}/>
        </div>
      </Router>
    )
  }
}

export default App;
