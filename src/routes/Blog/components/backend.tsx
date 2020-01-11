import * as React from "react";
import { connect } from "react-redux";
import {
  Button,
  List,
  message,
  Empty,
  Modal,
  Form,
  Input,
  Spin,
  Card
} from "antd";

interface IBlogBackendState {}

interface IBlogBackendProps {}

class BlogBackendComp extends React.Component<IBlogBackendProps, IBlogBackendState> {
    state = {};

    render() {
        return (
            <div>Blog end</div>
        );
    }
}

export {BlogBackendComp};