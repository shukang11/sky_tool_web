import React, { Component } from "react";
import { connect } from "react-redux";
import { toggle_action, add_action, setVisibility } from "../reducers/todo";
import { List, Avatar, Input } from "antd";

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
      this.props.add(value);
    }
  }

  handleInputChange(event) {
    this.setState({
      input_todo: event.target.value
    });
  }

  render() {
    const { todos, visibilityFilter } = this.props;
    const { input_todo } = this.state;

    var listStyle = {
      margin: '2rem'
    }

    const buttonStyle = {
      width: '3rem',
      float: 'right',
      marginTop: '0.5rem'
    }
    
    return (
      <div style={listStyle}>
        <p>Todo List {visibilityFilter}</p>
        <List
          itemLayout="horizontal"
          dataSource={todos}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={<a>{item.text}</a>} avatar={<Avatar children={<div>{item.text[0]}</div>}/>}/>
            </List.Item>
          )}
        />
        <Input placeholder="input new todo" value={input_todo} onChange={this.handleInputChange} />
        <button style={buttonStyle} onClick={this.addHandle}>添加</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.todo;
};

const mapDispatchToProps = dispatch => {
  return {
    add: text => dispatch(add_action(text)),
    toggle: id => dispatch(toggle_action(id)),
    setVisibility: filter => dispatch(setVisibility(filter))
  };
};

const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComp);

export default TodoList;
