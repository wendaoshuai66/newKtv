import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header  select={"risk_add"} sub={"game"}>
                这是添加真心话
            </Header>    
        )
    }
}

export default Index;