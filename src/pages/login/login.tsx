import * as React from "react";
import { Button, Input, message } from "antd";
import "./login.css";

import {login, register} from './../../services/user';

interface ILoginProps {}

interface ILoginState {
  name: string;
  password: string;
}

class LoginComp extends React.Component<ILoginProps, ILoginState> {
  constructor(props: Readonly<ILoginProps>) {
    super(props);
    this.state = {
      name: "",
      password: ""
    };
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.onRegisterClicked = this.onRegisterClicked.bind(this);
  }

  onLoginClicked() {
    const { name, password } = this.state;
    if (name.length === 0) {
      message.warning('请输入正确的名称');
      return;
    }
    if (password.length < 6 || password.length >  18) {
      message.warning('请输入6-18位密码');
      return;
    }

    login(name, password).then(resp => {
      console.log(JSON.stringify(resp));
    }).catch(error => {
        console.log(JSON.stringify(error));
    });
  }

  onRegisterClicked() {
    const { name, password } = this.state;
    if (name.length === 0) {
      message.warning('请输入正确的名称');
      return;
    }
    if (password.length < 6 || password.length >  18) {
      message.warning('请输入6-18位密码');
      return;
    }
    register(name, password).then(r => {
      console.log(r);
    }).catch(e => {
      console.log(e);
    });
  }
  render() {
    const { name, password } = this.state;
    return (
      <div className='container'>
        <Input
          className="input-item"
          placeholder="请输入用户名"
          value={name}
          onChange={e => {
            this.setState({
              name: e.target.value
            });
          }}
        />
        <Input.Password
          className="input-item"
          placeholder="密码"
          value={password}
          onChange={e => {
            this.setState({
              password: e.target.value
            });
          }}
          required={true}
        />
        <div className="input-item">
          <Button
            className="input-item-button-login"
            size="large"
            color="blue"
            onClick={this.onLoginClicked}
          >
            登录
          </Button>
          <Button
            className="input-item-button-register"
            size="large"
            onClick={this.onRegisterClicked}
          >
            注册
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginComp;
