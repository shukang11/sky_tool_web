import React, { Component } from "react";
import { connect } from "react-redux";
import { setVisibility } from "../reducers/todo";
import { List, Avatar, Input } from "antd";

import { requestTodos, requestAddTodo } from "../reducers/todo";
import { bindActionCreators } from "../../../../../../Library/Caches/typescript/3.3/node_modules/redux";
class TodoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_todo: ""
    };
    this.addHandle = this.addHandle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addHandle() {
    const value = this.state.input_todo;
    this.setState({
      input_todo: ""
    });
    if (value) {
      this.props.requestAddTodo(value);
    }
  }

  handleInputChange(event) {
    this.setState({
      input_todo: event.target.value
    });
  }

  componentDidMount() {
    const { requestTodos } = this.props;
    requestTodos({ filter: "all" });
  }

  render() {
    const { todos, visibilityFilter } = this.props;
    const { input_todo } = this.state;

    const f_todos = todos.map(t => {
      var pref = ""
      if (t.state === 1) {
        pref  = `[未完成]`
      } else if (t.state === 2) {
        pref = "[已完成]"
      } else if (t.state === 3) {
        pref = "[已删除]"
      }
      t.pref = pref
      return t
    })
    var containerStyle = {
      margin: "0.2rem",
      padding: "0.5rem",
      background: "rgb(255, 255, 255)"
    };

    const buttonStyle = {
      width: "3rem",
      float: "right",
      marginTop: "0.5rem"
    };

    const listStyle = {
      marginTop: "3rem"
    };

    return (
      <div style={containerStyle}>
        <Input
          style={{ marginTop: "0.5rem" }}
          placeholder="input new todo"
          value={input_todo}
          onChange={this.handleInputChange}
        />
        <button style={buttonStyle} onClick={this.addHandle}>
          添加
        </button>
        <List
          style={listStyle}
          itemLayout="vertical"
          size="large"
          pagination={{
            position: "bottom",
            onChange: page => {
              console.log(page);
            },
            pageSize: 10
          }}
          footer={<div>输入以添加待办</div>}
          dataSource={f_todos}
          renderItem={item => (
            <List.Item key={item.text} actions={[]}>
              <List.Item.Meta
                title={<a>{item.pref}{item.text}</a>}
                avatar={<Avatar children={<a>{item.text[0]}</a>} />}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.todo;
};

const mapDispatchToProps = dispatch => {
  return {
    setVisibility: filter => dispatch(setVisibility(filter)),
    requestTodos: bindActionCreators(requestTodos, dispatch),
    requestAddTodo: bindActionCreators(requestAddTodo, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComp);
