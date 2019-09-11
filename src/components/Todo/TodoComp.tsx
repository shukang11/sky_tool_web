import * as React from "react";
import PageLoading from "../PageLoading/index";
import {
  ITodoModel,
  ITodo,
  set_todos_action,
  FilterStyle
} from "../../reducers/todo";
import { filterTodo, addTodo } from "../../services/todo";
import { connect } from "react-redux";
import { Button, message, Empty, Table, Input } from "antd";
import { EditableCell, EditableFromRow } from "../Table/EditTableCell";

import "./todo.css";

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
      contentToAdd: null,
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
      if (!r.data) { return; }
      if (Array.isArray(r.data)) {
        this.setState({
          isFetching: false
        });
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
    if (content.length === 0) {
      message.warning("请输入待办事项");
      return;
    }
    addTodo(content).then(r => {
      this.setState({
        contentToAdd:null
      })
      this.filter("all");
    });
  }
  undoHandle(id: number) {}

  doneHandle(id: number) {}

  render() {
    const { todos } = this.props;
    const { isFetching, pageSize, isAdding } = this.state;

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

    var dataSource: Array<{[key: string]: any}> = [];
    todos.forEach(function(element) {
      dataSource.push({
        content: element.text,
        status: element.state,
        obj: element,
        key: element.id,
      })
    })
    
    const columns = [
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '操作',
        dataIndex: 'obj',
        key: 'action',
        render: (e: ITodoModel) => {
          // 状态
          if (e.state === 1) { // 已完成
            return [<Button key={e.id} onClick={() => {
              console.log(e);
            }} type="primary">未完成</Button>, <Button key={e.id} type="danger">删除</Button>]
          } else if (e.state === 2) { // 未完成
            return <Button key={e.id} type="primary">完成</Button>
          }
          return status;
        }
      },
      
    ];

    return (
      <div>
        <div className="todoCompont-header">
        <Button onClick={() => {
          this.addHandle(this.state.contentToAdd)
        }} type="primary" icon="plus" size='default'>
          添加
        </Button>
        <Input onChange={(e) => {
          this.setState({
            contentToAdd:e.target.value
          })
        }} className="todoCompont-header-item" placeholder={'请输入事项'} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComp);
