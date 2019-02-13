/** Created by treee at 2018/8/7 下午2:31 */
import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { receiveData } from "../http/request";
import Routes from "../routes";
import routesConfig from "../routes/config";

const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;

class HomeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.didToggleSider = this.didToggleSider.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.renderSubMenuItem = this.renderSubMenuItem.bind(this);
  }

  didToggleSider() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  renderMenuItem(item) {
    return (
      <Menu.Item key={item.key}>
        <Link to={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    );
  }

  renderSubMenuItem(item) {
    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
          </span>
        }
      >
        {item.subs.map(item => this.renderMenuItem(item))}
      </Menu.SubMenu>
    );
  }

  render() {
    const { auth } = this.props;

    return (
      <Layout style={styles.BodyStyle}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div style={styles.LogoStyle} />
          <Menu theme="dark" mode="inline">
            {routesConfig["menus"].map(item =>
              item.subs
                ? this.renderSubMenuItem(item)
                : this.renderMenuItem(item)
            )}
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
              minHeight: 280,
              overflow: "initial"
            }}
          >
            <Routes auth={auth} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  BodyStyle: {
    height: "100%",
    width: "100%",
    minHeight: "100%"
  },
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
};

const mapStateToProps = state => {
  const auth = { data: {} },
    responsive = { data: {} };
  return { auth, responsive };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComp);
