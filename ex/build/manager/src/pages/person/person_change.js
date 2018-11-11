import React from "react";
import Header from "components/header/header.js"

class Index extends React.Component {
    render() {
        return (
            <Header select={"person_change"} sub={"personnal"}>
                这是个人中心修改密码
            </Header>    
        )
    }
}

export default Index;