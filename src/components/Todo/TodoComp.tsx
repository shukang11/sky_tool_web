import * as React from "react";
import PageLoading from "../PageLoading/index";
import { ITodoModel, ITodo, set_todos_action, set_visibility_filter_action, FilterStyle } from "../../reducers/todo";
import { filterTodo, addTodo } from "../../services/todo";
import { connect } from "react-redux";
import { Button, List, message, Empty } from "antd";
import TodoItemComp from './TodoItemComp';

import './todo.css';

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
    this.filter = this.filter.bind(this);

  }

  componentDidMount() {
    this.filter('all');
  }

  filter(filter: FilterStyle) {
    filterTodo(filter).then(r => {
      if (Array.isArray(r.data)) {
        this.setState({
          isFetching: false
        })
        var todos: Array<ITodoModel> =[]
        r.data.forEach((i: {[key: string]: any}) => {
          todos.push({
            id: i.todo_id,
            state: i.todo_state,
            text: i.todo_title
          })
        })
        this.props.set_todos_action(todos);
      }
    });
  }

  addHandle(content: string) {
    if (content.length === 0) {
        message.warning('请输入待办事项');
        return;
    }
    addTodo(content).then(r => {
      this.filter('all');
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
    var f_todos: Array<object> = [];
    if (todos === null || todos === undefined) {
      if (this.state.isAdding === true) {
        f_todos = [<TodoItemComp style='add' onCommit={(e: string) => {
          this.addHandle(e);
        }}></TodoItemComp>]
      } else {
        f_todos = [];
      }
    } else {
      todos.forEach(t => {
        f_todos.push(<TodoItemComp state={t.state} title={t.text} style='normal'></TodoItemComp>)
      })
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

const mapStateToProps = (state: { user: any; todo: ITodo }): ITodoProps => {
  return {
    todos: state.todo.todos,
    visibilityFilter: state.todo.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  set_todos_action: (todos: Array<ITodoModel>) => dispatch(set_todos_action(todos))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComp);
