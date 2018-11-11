import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"person"} sub={"personnal"}>
                这是个人中心
            </Header>    
        )
    }
}

export default Index;