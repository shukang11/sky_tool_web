/** Created by treee at 2019/1/29 11:42 AM */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Icon, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { UserLogin } from "../reducers/user";
import md5 from 'md5';

class LoginComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _username: "",
      _password: ""
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
  }

  onSubmitHandle() {
    const { _username, _password } = this.state;
    const newPassword = md5(_password);
    this.props.login(_username, newPassword);
  }

  componentWillUpdate() {
    const { req_token } = this.props;
    if (req_token.length > 0) {
      this.props.history.push('/todo');
      return false;
    }
    return true;
  }

  render() {
    const { _username, _password } = this.state;
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
  console.log(state.user);
  
  return state.user;
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(UserLogin(username, password))
  };
};

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComp);

export default LoginForm;
