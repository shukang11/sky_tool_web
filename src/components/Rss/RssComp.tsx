import * as React from "react";
import PageLoading from "../PageLoading/index";
import { filterTodo, addTodo } from "../../services/todo";
import { connect } from "react-redux";
import { Button, List, message, Empty } from "antd";

interface IRssProps {
  
}

interface IRssState {}
class RssComp extends React.Component<IRssProps, IRssState> {
  state = {
    
  }

  render() {
    return (
      <div>
        <Empty
          className="empty"
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 160
          }}
          description={<span>暂无订阅源</span>}
        >
          <Button
            type="primary"
            onClick={() => {
              
            }}
          >
            {" "}
            创建一个{" "}
          </Button>
        </Empty>
      </div>
    );
  }
}

export default RssComp;
