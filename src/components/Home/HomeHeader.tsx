import * as React from "react";
import { Avatar, Button, Row, Col } from "antd";
import "./HomeHeader.scss";
import { connect } from 'react-redux';
import { IUSERState as IUser, setTokenAction } from './../../reducers/user';

type IHomeHeaderProps = Readonly<{
    isLogedIn?: boolean;
    token?: string;
    setTokenAction?: Function;
}>;

interface IHomeHeaderState {}
class HomeHeaderComp extends React.Component<
  IHomeHeaderProps,
  IHomeHeaderState
> {
  logoutClicked = () => {
      this.props.setTokenAction(null);
  };
  render() {
      const { isLogedIn } = this.props;
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
              <span className="right-item">treee</span>
              <Button
                className="right-item"
                type="link"
                onClick={() => {
                  this.logoutClicked();
                }}
              >
                { isLogedIn ? "退出" : "登录" }
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: {user: IUser}) => {
    return {
        isLogedIn: state.user.isLogedIn,
        token: state.user.token,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    setTokenAction: (token?: string) => dispatch(setTokenAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderComp);
