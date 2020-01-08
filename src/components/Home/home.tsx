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
  renderRouteSubItem(item: IMenuItem): React.ReactNode {
    return (
      <Route
        key={item.key ? item.key : item.path}
        exact
        path={item.path}
        component={allComponents[item.component]}
      />
    );
  }

  renderRouteRootMenu(item: IMenuModel): React.ReactNode | Array<React.ReactNode> {
    if (!item.subMenu) {
      var renderItem: IMenuItem = {
        key: item.key,
        path: item.path,
        display: true,
        title: item.title,
        component: item.component
      }
      return this.renderRouteSubItem(renderItem)
    }
    return item.subMenu.map(i => this.renderRouteSubItem(i))
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
            {routesConfig.map(item => {
              return this.renderRouteRootMenu(item)
            })}
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
