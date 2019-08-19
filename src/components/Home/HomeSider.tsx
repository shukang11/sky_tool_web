import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

import routesConfig from "../../routes/config";
import { IMenuItem, IMenuModel } from "./../../routes/config";
const { Sider } = Layout;

interface IHomeSiderProps {
  isMenuCollapsed: boolean;
}

interface IHomeSiderState {}

class HomeSiderComp extends React.Component<IHomeSiderProps, IHomeSiderState> {
  constructor(props: IHomeSiderProps) {
    super(props);
  }

  renderSubMenuItem(item: IMenuItem) {
    return (
      <Menu.Item key={item.key}>
        <Link to={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    );
  }
  renderMenuItem(item: IMenuModel) {
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
        {item.subs.map(item => this.renderSubMenuItem(item))}
      </Menu.SubMenu>
    );
  }
  render() {
    return (
      <Sider trigger={null} collapsed={this.props.isMenuCollapsed} collapsible>
        <Menu theme="dark" mode="inline">
          {routesConfig.map(item =>
            item.subs ? this.renderMenuItem(item) : this.renderSubMenuItem(item)
          )}
        </Menu>
      </Sider>
    );
  }
}

export default HomeSiderComp;
