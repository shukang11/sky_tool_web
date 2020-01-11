import * as React from "react";
import { Button, Input, Form, Card, Row, Col } from "antd";
import { connect } from "react-redux";
import * as H from "history";
import { login, register } from "./../../services/user";
import { setTokenAction } from "../../reducers/user";
import "./login.scss";

const FormItem = Form.Item;

type ILoginProps = Readonly<{
  form: any;
  history: H.History;
  setTokenAction: Function;
}>;

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
    const values = this.props.form.getFieldsValue();
    const { name, password } = values;
    if (!name || !password) {
      return;
    }
    login(name, password).then(r => {
      if (!r || !r.data) {
        return;
      }
      localStorage.setItem("token", r.data.token);
      this.props.history.push("/app/dashboard");
    });
  }

  onRegisterClicked() {
    const values = this.props.form.getFieldsValue();
    const { name, password } = values;
    if (!name || !password) {
      return;
    }
    register(name, password).then(r => {
      if (!r || !r.data) {
        return;
      }
      this.onLoginClicked();
    });
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div>
      <Card bordered={false} className="container">
        <Form className="form-wrap">
          <FormItem>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "please inpput your name"
                },
                {
                  min: 5,
                  max: 18,
                  message: "请输入5-18位字符"
                }
              ]
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "please input your password"
                }
              ]
            })(<Input.Password placeholder="密码" required={true} />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    this.onLoginClicked();
                  }}
                >
                  登录
                </Button>
              </FormItem>
            </Col>
            <Col>
              <FormItem className="form-register">
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => {
                    this.onRegisterClicked();
                  }}
                >
                  注册
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: { user: any }) => {
  return { ...state.user };
};

const mapDispatchToProps = dispatch => ({
  setTokenAction: (token: string) => dispatch(setTokenAction(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create<ILoginProps>()(LoginComp));
