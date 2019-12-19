import * as React from "react";
import { Avatar, Button, Row, Col } from "antd";
import "./HomeHeader.scss";
import { connect } from "react-redux";
import { IUSERState as IUser, setTokenAction, setUserInfo } from "./../../reducers/user";
import { getInfo } from "../../services/user";

type IHomeHeaderProps = Readonly<{
  user: IUser;
  setTokenAction?: Function;
  setUserInfo?: Function;
}>;

interface IHomeHeaderState {}
class HomeHeaderComp extends React.Component<
  IHomeHeaderProps,
  IHomeHeaderState
> {
  logoutClicked = () => {
    this.props.setTokenAction(null);
  };

  componentDidMount() {
    getInfo().then(r => {
      if (!r || !r.data) {
        return;
      }
      var user: IUser = {
        email: r.data.email
      }
      this.props.setUserInfo(user)
    });
  }
  render() {
    const { isLogedIn, email } = this.props.user;
    return (
      <div className="header-container">
        <Row className="header">
          <Col span={4}></Col>
          <Col span={20}>
            <div className="right">
              <Avatar
                className="header-icon right-item"
                size="default"
                icon="user"
              ></Avatar>
              <span className="right-item">{email}</span>
              <Button
                className="right-item"
                type="link"
                onClick={() => {
                  this.logoutClicked();
                }}
              >
                {isLogedIn ? "退出" : "登录"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: { user: IUser }) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setTokenAction: (token?: string) => dispatch(setTokenAction(token)),
  setUserInfo: (user: IUser) => dispatch(setUserInfo(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderComp);
