import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"order_goods"} sub={"orders"}>
                这是商品订单
            </Header>    
        )
    }
}

export default Index;