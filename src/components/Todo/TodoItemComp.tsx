import * as React from "react";
import { Avatar, Input, Icon, Button, List } from "antd";

declare const ItemStyle: ["add", "normal"];
export declare type ItemStyle = (typeof ItemStyle)[number];

interface ITodoItemCompProps {
  title?: string;
  descript?: string;
  state?: number;
  style?: ItemStyle;
  onCommit?: Function;
  key?: string;
}

interface ITodoItemCompState {
  inputContent?: string;
}

class TodoItemComp extends React.Component<
  ITodoItemCompProps,
  ITodoItemCompState
> {
  constructor(props: ITodoItemCompProps) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.style === "add") {
      return (
        <div className="item">
          <List.Item key={this.props.key}>
            <List.Item.Meta
              title={
                <Input
                  className="add-input"
                  placeholder="请输入"
                  onChange={e => {
                    this.setState({
                      inputContent: e.target.value
                    });
                  }}
                />
              }
              avatar={
                <Button
                  type="link"
                  className="add-button"
                  onClick={() => {
                    if (this.props.onCommit) {
                      this.props.onCommit(this.state.inputContent);
                    }
                  }}
                >
                 添加
                </Button>
              }
            />
          </List.Item>
        </div>
      );
    }
    // normal
    return <div className="item">
          <List.Item key={this.props.key}>
            <List.Item.Meta
              title={
                this.props.title
              }
              description={
                "待办事项"
              }
              avatar={
                <Avatar size='default' icon='user'></Avatar>
              }
            />
          </List.Item>
        </div>;
  }
}

export default TodoItemComp;
