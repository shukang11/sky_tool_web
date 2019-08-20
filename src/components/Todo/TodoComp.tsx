import * as React from "react";
import PageLoading from "../PageLoading/index";
import { ITodoModel, ITodo } from "../../reducers/todo";
import { filterTodo, addTodo } from "../../services/todo";
import { connect } from "react-redux";
import { Input, Button, List, Avatar, message, Empty } from "antd";
import TodoItemComp from './TodoItemComp';

import './todo.css';

interface ITodoProps {
  todos: Array<ITodoModel>;
  visibilityFilter: string;
}

interface ITodoState {
  isFetching: boolean;
  pageSize: number;
  page: number;
  isAdding: boolean;
}
class TodoComp extends React.Component<ITodoProps, ITodoState> {
  constructor(props: ITodoProps) {
    super(props);
    this.state = {
      isFetching: true,
      pageSize: 10,
      page: 1,
      isAdding: false,
    };
    this.addHandle = this.addHandle.bind(this);
    this.undoHandle = this.undoHandle.bind(this);
    this.doneHandle = this.doneHandle.bind(this);
  }

  componentDidMount() {
    filterTodo("all").then(r => {
      if (Array.isArray(r)) {
        this.setState({
          
        })
      }
      this.setState({
        isFetching: false
      });
    });
  }

  addHandle(content: string) {
    if (content.length === 0) {
        message.warning('请输入待办事项');
        return;
    }
    addTodo(content).then(r => {
    });
  }
  undoHandle(id: number) {}

  doneHandle(id: number) {}

  render() {
    const { todos, visibilityFilter } = this.props;
    const { isFetching, pageSize } = this.state;
    
    if (isFetching === true) {
      return <PageLoading />;
    }
    var f_todos: Array<object>;
    if (todos === null || todos === undefined) {
      if (this.state.isAdding === true) {
        f_todos = [<TodoItemComp style='add' onCommit={(e: string) => {
          this.addHandle(e);
        }}></TodoItemComp>]
      } else {
        f_todos = [];
      }
    } else {
      f_todos = todos
        .map(t => {
          <TodoItemComp state={t.state} title={t.text} style='normal'></TodoItemComp>
          return t;
        })
        .reverse();
    }

    if (f_todos.length === 0 && this.state.isAdding === false) { // 没有内容
        return (
            <Empty className='empty'
            image='https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original'
            imageStyle={{
                height: 160
            }}
            description={
                <span>暂无待办事项</span>
            }
            >
                <Button type='primary' onClick={() => {this.setState({isAdding: true})}}> 创建一个 </Button>
            </Empty>
        );
    }
    return (
      <div>
        <div className="content">
          <List className="content-list"
          itemLayout='vertical'
          size='large'
          pagination={{
            position:'bottom',
            pageSize: pageSize,
            onChange: p => {
              this.setState({
                page: p
              })
            }
          }}
          dataSource={f_todos}
          renderItem={
            item => {
              return item;
            }
          }
          >

          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { user: any; todo: ITodo }) => {
  return {
    user: state.user,
    todo: state.todo
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTodos: (todos: Array<ITodoModel>) => dispatch()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComp);
