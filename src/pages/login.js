/** Created by treee at 2019/1/29 11:42 AM */

import React, { Component } from "react";
import { Form, Input, Icon, Button, Checkbox, message } from "antd";
import { connect } from "react-redux";
import { UserLogin } from "../reducers/user";
import md5 from 'md5';

class LoginComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _username: "",
      _password: "",
      indicator: null
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
  }

  onSubmitHandle() {
    const { _username, _password, _isLoading } = this.state;
    if (_isLoading === true) {
      message.warning("请稍后重试");
      return;
    }
    if (_username.length === 0) {
      message.warning("请输入账号", 1)
      return
    }
    if (_password.length === 0) {
      message.warning("请输入密码", 1)
      return
    }
    const indicator = message.loading("登录中，请稍后...")
    this.setState({
      indicator: indicator
    });
    const newPassword = md5(_password);
    this.props.login(_username, newPassword);
  }

  componentWillMount() {
    const { indicator } = this.state;
    const { isFetching, req_token } = this.props;
    if (isFetching === false && indicator !== null) {
      setTimeout(indicator, 0.1);
    }
    if (req_token !== null && req_token.length > 0) {
      this.props.history.push("/app");
    }
  }

  render() {
    const { _username, _password } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={styles.containerStyle} onSubmit={this.onSubmitHandle}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            onChange={e => this.setState({ _username: e.target.value })}
            value={_username}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ _password: e.target.value })}
            value={_password}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a href="">Forgot password</a>
          <Button
            style={styles.loginButtonStyle}
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const styles = {
  containerStyle: {
    margin: "1rem"
  },
  loginButtonStyle: {
    width: "100%"
  }
};

const mapStateToProps = state => {
  
  return {...state.user, isFetching: state.app.isFetching};
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(UserLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(LoginComp));
