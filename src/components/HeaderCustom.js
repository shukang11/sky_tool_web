import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router";
import { bindActionCreators } from "redux";

import { ToggleMenuCollapsed } from "../reducers/app";
class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.didToggleSider = this.didToggleSider.bind(this);
  }

  didToggleSider() {
    const { toggleMenuCollapsed } = this.props;
    toggleMenuCollapsed();
  }

  render() {
    const { isMenuCollapsed } = this.props;
    return (
      <div style={styles.ContainerStyle}>
        <Icon
          style={styles.IconStyle}
          type={isMenuCollapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.didToggleSider}
        />
        <div style={styles.rightMarginStyle}>
          <Icon style={styles.IconStyle} type={"user"} />
          <Icon style={styles.IconStyle} type={"logout"} />
        </div>
      </div>
    );
  }
}

const styles = {
  ContainerStyle: {
    lineHeight: "rem"
  },
  IconStyle: {
    fontSize: "2rem",
    lineHeight: "3rem",
    padding: "0 0.3rem",
    cursor: "pointer"
  },
  ToggleStyle: {
    transition: "color .3s"
  },
  rightMarginStyle: {
    marginRight: "1rem",
    float: "right"
  }
};

const mapStateToProps = state => {
  return state.app;
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenuCollapsed: bindActionCreators(ToggleMenuCollapsed, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
