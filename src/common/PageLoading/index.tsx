import * as React from "react";
import {Spin} from 'antd';
class PageLoading extends React.Component {
  render() {
    return <div style={{ paddingTop: 100, textAlign: "center" }}>
      <Spin size='large'></Spin>
    </div>;
  }
}
export default PageLoading;
