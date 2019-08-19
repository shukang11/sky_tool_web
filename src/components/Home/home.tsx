import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { Route } from "react-router";

import allComponents from "../index";
import routesConfig from "../../routes/config";

import HomeSiderComp from './HomeSider';
const { Content } = Layout;
import { IMenuItem, IMenuModel } from "./../../routes/config";

interface IHomeProps {}

interface IHomeState {
  isMenuCollapsed: boolean;
}
class HomeComp extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      isMenuCollapsed: false
    };
  }
  renderRouteItem(item: IMenuItem) {
    return (
      <Route
        key={item.key}
        exact
        path={item.key}
        component={allComponents[item.component]}
      />
    );
  }

  renderSubRouteItem(item: IMenuModel) {
    return item.subs.map(r => this.renderRouteItem(r));
  }
  render() {
    const { isMenuCollapsed } = this.state;

    return (
      <Layout style={styles.BodyStyle}>
        <HomeSiderComp isMenuCollapsed={isMenuCollapsed}></HomeSiderComp>
        <Layout>
          <Content
            style={{
              background: "#fff",
              height: "100%",
              overflow: "initial"
            }}
          >
            {/* <Route exact path='/app/tool/todo' component={TodoComp} /> */}
            {routesConfig.map(item =>
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
    cursor: "pointer"
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
export default HomeComp;
