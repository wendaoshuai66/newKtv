import React from "react";
import "./index.scss";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"index"} sub={"index"}>
                这是首页
            </Header>    
        )
    }
}

export default Index;