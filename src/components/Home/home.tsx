import * as React from "react";
import { Layout } from "antd";
import { Route } from "react-router";
import { connect } from "react-redux";

import allComponents from "../index";
import routesConfig from "../../routes/config";

import HomeSiderComp from "./HomeSider";
import HomeHeaderComp from "./HomeHeader";
const { Content } = Layout;
import { IMenuItem, IMenuModel } from "./../../routes/config";
import { IAPPState, toggleCollapsedAction } from "src/reducers/app";

interface IHomeProps {
  isMenuCollapsed: boolean;
}

interface IHomeState {
}
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
      <Layout style={styles.BodyStyle}>
        <HomeSiderComp isMenuCollapsed={isMenuCollapsed} />
        <Layout>
          <HomeHeaderComp />
          <Content
            style={{
              background: "#fff",
              height: "100%",
              overflow: "initial",
              padding: "1rem"
            }}
          >
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

const mapStateToProps = (state: { app: IAPPState }): IHomeProps => {
  return {
    isMenuCollapsed: state.app.isMenuCollapsed
  };
};

const mapDispatchToProps = dispatch => ({
  toggleMenuCollapse: (isCollapsed: boolean) => dispatch(toggleCollapsedAction(isCollapsed))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComp);
