import * as React from "react";
import PageLoading from "../../../common/PageLoading";
import {
  ITodoModel,
  ITodo,
  set_todos_action,
  FilterStyle
} from "../../../reducers/todo";
import {
  filterTodo,
  addTodo,
  finishTodo,
  undoTodo
} from "../../../services/todo";
import { connect } from "react-redux";
import { Button, message, Empty, Table, Input, Row, Col } from "antd";

import "../style/todo.css";

interface ITodoProps {
  todos: Array<ITodoModel>;
  visibilityFilter: string;
  set_todos_action?: Function;
}

interface ITodoState {
  isFetching: boolean;
  pageSize: number;
  page: number;
  isAdding: boolean;
  contentToAdd?: string;
}
class TodoComp extends React.Component<ITodoProps, ITodoState> {
  constructor(props: ITodoProps) {
    super(props);
    this.state = {
      isFetching: true,
      pageSize: 10,
      page: 1,
      isAdding: false,
      contentToAdd: null
    };
    this.addHandle = this.addHandle.bind(this);
    this.undoHandle = this.undoHandle.bind(this);
    this.doneHandle = this.doneHandle.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.filter("all");
  }

  filter(filter: FilterStyle) {
    filterTodo(filter).then(r => {
      this.setState({
        isFetching: false
      });
      if (!r || !r.data) {
        return;
      }
      if (Array.isArray(r.data)) {
        var todos: Array<ITodoModel> = [];
        r.data.forEach((i: { [key: string]: any }) => {
          todos.push({
            id: i.todo_id,
            state: i.todo_state,
            text: i.todo_title
          });
        });
        this.props.set_todos_action(todos);
      }
    });
  }

  addHandle(content: string) {
    if (!content || content.length === 0) {
      message.error("请输入待办事项");
      return;
    }
    addTodo(content).then(r => {
      this.setState({
        contentToAdd: null
      });
      this.filter("all");
    });
  }
  undoHandle(id: number) {
    undoTodo(id).then(r => {
      this.filter("all");
    });
  }

  doneHandle(id: number) {
    finishTodo(id).then(r => {
      this.filter("all");
    });
  }

  render() {
    const { todos } = this.props;
    const { isFetching } = this.state;

    if (isFetching === true) {
      return <PageLoading />;
    }
    if (todos.length === 0 && this.state.isAdding === false) {
      // 没有内容
      return (
        <Empty
          className="empty"
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 160
          }}
          description={<span>暂无待办事项</span>}
        >
          <Button
            type="primary"
            onClick={() => {
              this.setState({ isAdding: true });
            }}
          >
            {" "}
            创建一个{" "}
          </Button>
        </Empty>
      );
    }

    var dataSource: Array<{ [key: string]: any }> = [];
    todos.forEach(function(element) {
      dataSource.push({
        content: element.text,
        status: element.state,
        obj: element,
        key: element.id
      });
    });

    const columns = [
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (e: number) => {
          var content: string = "";
          if (e === 1) {
            content = "待完成";
          } else if (e === 2) {
            content = "已完成";
          }
          return <div>{content}</div>;
        }
      },
      {
        title: "内容",
        dataIndex: "content",
        key: "content"
      },
      {
        title: "操作",
        dataIndex: "obj",
        key: "action",
        render: (e: ITodoModel) => {
          // 状态
          if (e.state === 1) {
            // 已完成
            return (
              <div>
                <Button
                  onClick={() => {
                    this.doneHandle(e.id);
                  }}
                  type="primary"
                >
                  完成它
                </Button>
              </div>
            );
          } else if (e.state === 2) {
            // 未完成
            return (
              <div>
                <Button
                  onClick={() => {
                    this.undoHandle(e.id);
                  }}
                  type="primary"
                >
                  取消完成
                </Button>
              </div>
            );
          }
          return status;
        }
      }
    ];

    return (
      <div>
        <div className="todoCompont-header">
          <Row>
            <Col span={20}>
              <Input
                value={this.state.contentToAdd}
                onChange={e => {
                  this.setState({
                    contentToAdd: e.target.value
                  });
                }}
                className="todoCompont-header-input"
                placeholder={"请输入事项"}
              />
            </Col>
            <Col span={4}>
              <Button
                className="todoCompont-header-button"
                onClick={() => {
                  this.addHandle(this.state.contentToAdd);
                }}
                type="primary"
                icon="plus"
                size="default"
              >
                添加
              </Button>
            </Col>
          </Row>
        </div>
        <div className="todoCompont-content">
          <Table dataSource={dataSource} columns={columns} bordered></Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { user: any; todo: ITodo }): ITodoProps => {
  return {
    todos: state.todo.todos,
    visibilityFilter: state.todo.visibilityFilter
  };
};

const mapDispatchToProps = dispatch => ({
  set_todos_action: (todos: Array<ITodoModel>) =>
    dispatch(set_todos_action(todos))
});

const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoComp);
export { Todo };
