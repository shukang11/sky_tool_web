import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, List } from "antd";
import { bindActionCreators } from "redux";

import "./styles/rss.css";
import { request_addRss, request_Rss } from "../reducers/rss";
class RssComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rss_url: ""
    };
    this.handleSubmmitRss = this.handleSubmmitRss.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  handleSubmmitRss() {
    const rss_url = this.state.rss_url;
    const { request_addRss } = this.props;
    request_addRss(rss_url);
  }

  componentDidMount() {
    const { request_Rss } = this.props;
    request_Rss();
  }

  handleInputChanged(event) {
    this.setState({
      rss_url: event.target.value
    });
  }

  render() {
    const { rss_url } = this.state;
    const { rss } = this.props;
    
    return (
      <div className="input-container">
        <Input
          size="large"
          value={rss_url}
          placeholder="请输入订阅源"
          onChange={this.handleInputChanged}
        />
        <Button size="large" shape="round" onClick={this.handleSubmmitRss}>
          提交
        </Button>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={rss}
          renderItem={r => (
            <List.Item key={r.link} actions={[]}>
              <List.Item.Meta title={r.link} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.rss;
};

const mapDispatchToProps = dispatch => {
  return {
    request_addRss: bindActionCreators(request_addRss, dispatch),
    request_Rss: bindActionCreators(request_Rss, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RssComp);
