/** Created by treee at 2018/8/7 下午2:31 */
import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;
class HomeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.didToggleSider = this.didToggleSider.bind(this);
  }

  didToggleSider() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div style={styles.LogoStyle} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                style={styles.TriggerStyle}
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.didToggleSider}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const styles = {
    TriggerStyle: {
        fontSize: "1.3rem",
        lineHeight: "3rem",
        padding: "0 1rem",
        cursor: "pointer",
        transition: "color .3s"
    },
    LogoStyle: {
        height: "2rem",
        background: "rgba(255, 255, 255, .2)",
        margin: "1rem"
    }
}

export default HomeComp;
