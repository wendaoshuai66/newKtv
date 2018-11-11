import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"risk_change"} sub={"game"}>
                这是修改真心话
            </Header>    
        )
    }
}

export default Index;