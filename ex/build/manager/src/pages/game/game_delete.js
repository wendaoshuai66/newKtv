import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"risk_delete"} sub={"game"}>
                这是删除真心话
            </Header>    
        )
    }
}

export default Index;