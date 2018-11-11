import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"order_sing"} sub={"orders"}>
                这是歌曲订单
            </Header>    
        )
    }
}

export default Index;