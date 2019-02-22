import React, { Component } from "react";
import { connect } from "react-redux";
import { setVisibility } from "../reducers/todo";
import { List, Avatar, Input } from "antd";

import { requestTodos, requestAddTodo, requestFinishTodo, requestUndoTodo } from "../reducers/todo";
import { bindActionCreators } from "redux";
class TodoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_todo: ""
    };
    this.addHandle = this.addHandle.bind(this);
    this.undoHandle = this.undoHandle.bind(this);
    this.doneHandle = this.doneHandle.bind(this);
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

  undoHandle(id) {
    const { requestUndoTodo } = this.props;
    requestUndoTodo(id);
  }

  doneHandle(id) {
    const { requestFinishTodo } = this.props;
    requestFinishTodo(id);
  }

  componentDidMount() {
    const { requestTodos } = this.props;
    requestTodos({ filter: "all" });
  }

  render() {
    const { todos } = this.props;
    const { input_todo } = this.state;
    
    const f_todos = todos.map(t => {
      var pref = ""
      var displayComp = null
      if (t.state === 1) {
        pref  = `[未完成]`
        displayComp = (
          <div>
            <button onClick={() => this.doneHandle(t.id)}>完成</button>
            <a>{pref}{t.text}</a>
          </div>
        )
      } else if (t.state === 2) {
        pref = "[已完成]"
        displayComp = (
          <div>
            <button onClick={() => this.undoHandle(t.id)}>撤销</button>
            <s><a>{pref}{t.text}</a></s>
          </div>
        )
      } else if (t.state === 3) {
        pref = "[已删除]"
        displayComp = (<s><a>{pref}{t.text}</a></s>)
      }
      t.displayComp = displayComp
      t.pref = pref
      return t
    }).reverse()

    return (
      <div style={styles.containerStyle}>
        <Input
          style={{ marginTop: "0.5rem" }}
          placeholder="input new todo"
          value={input_todo}
          onChange={this.handleInputChange}
        />
        <button style={styles.buttonStyle} onClick={this.addHandle}>
          添加
        </button>
        <List
          style={styles.listStyle}
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
                title={item.displayComp}
                avatar={<Avatar children={<a>{item.text[0]}</a>} />}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    margin: "0.2rem",
    padding: "0.5rem",
    background: "rgb(255, 255, 255)"
  },
  buttonStyle: {
    width: "3rem",
    float: "right",
    marginTop: "0.5rem"
  },
  listStyle: {
    marginTop: "3rem"
  }
}

const mapStateToProps = state => {
  return state.todo;
};

const mapDispatchToProps = dispatch => {
  return {
    setVisibility: filter => dispatch(setVisibility(filter)),
    requestTodos: bindActionCreators(requestTodos, dispatch),
    requestAddTodo: bindActionCreators(requestAddTodo, dispatch),
    requestFinishTodo: bindActionCreators(requestFinishTodo, dispatch),
    requestUndoTodo: bindActionCreators(requestUndoTodo, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComp);
