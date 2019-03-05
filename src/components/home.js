/** Created by treee at 2018/8/7 下午2:31 */
import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router";

import allComponents from "../components/index";
import routesConfig from "../routes/config";
import CustomHeader from "./HeaderCustom";

const { Sider, Content } = Layout;

class HomeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.renderSubMenuItem = this.renderSubMenuItem.bind(this);
    this.renderRouteItem = this.renderRouteItem.bind(this);
    this.renderSubRouteItem = this.renderSubRouteItem.bind(this);
    this.didClickedUser = this.didClickedUser.bind(this);
  }


  didClickedUser() {

  }

  renderRouteItem(item) {
    return (
      <Route
        key={item.key}
        exact
        path={item.key}
        component={allComponents[item.component]}
      />
    );
  }

  renderSubRouteItem(item) {
    return item.subs.map(r => this.renderRouteItem(r));
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
    const { auth, isMenuCollapsed } = this.props;

    return (
      <Layout style={styles.BodyStyle}>
        <Sider trigger={null} collapsible collapsed={isMenuCollapsed}>
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
          <CustomHeader></CustomHeader>
          <Content
            style={{
              background: "#fff",
              height: "100%",
              overflow: "initial"
            }}
          >
            {/* <Route exact path='/app/tool/todo' component={TodoComp} /> */}
            {routesConfig["menus"].map(item =>
              item.subs
                ? this.renderSubRouteItem(item)
                : this.renderRouteItem(item)
            )}
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
  UserIconStyle: {
    marginRight: "1.3rem",
    lineHeight: "3rem",
    padding: "0 1rem",
    cursor: "pointer",
  },
  LogoStyle: {
    height: "2rem",
    background: "rgba(255, 255, 255, .2)",
    margin: "1rem"
  },
  FooterStyle: {
    textAlign: "center"
  }
};

const mapStateToProps = state => {
  const auth = { data: {} },
    responsive = { data: {} };
    const {isMenuCollapsed} = state.app;
  return { auth, responsive, isMenuCollapsed };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComp);
