import * as React from "react";
import { Layout, Menu, Icon, BackTop } from "antd";
import { Route } from "react-router";
import { connect } from "react-redux";

import allComponents from "../index";
import routesConfig from "../../routes/config";

import HomeSiderComp from "./HomeSider";
import HomeHeaderComp from "./HomeHeader";
import { IMenuItem, IMenuModel } from "./../../routes/config";
import { IAPPState, toggleCollapsedAction } from "src/reducers/app";
import "./home.scss";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface IHomeProps {
  isMenuCollapsed: boolean;
}

interface IHomeState {}
class HomeComp extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
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
    const { isMenuCollapsed } = this.props;

    return (
      <Layout className="root-container">
        <HomeHeaderComp></HomeHeaderComp>
        <Layout className="payload-container">
          <BackTop />
          <HomeSiderComp isMenuCollapsed={isMenuCollapsed} />
          <Content className="body-container">
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

const mapStateToProps = (state: { app: IAPPState }): IHomeProps => {
  return {
    isMenuCollapsed: state.app.isMenuCollapsed
  };
};

const mapDispatchToProps = dispatch => ({
  toggleMenuCollapse: (isCollapsed: boolean) =>
    dispatch(toggleCollapsedAction(isCollapsed))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComp);
