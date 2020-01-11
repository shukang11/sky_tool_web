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

interface IBlogState {}

interface IBlogProps {}

class BlogComp extends React.Component<IBlogProps, IBlogState> {
    state = {};

    render() {
        return (
            <div>Blog</div>
        );
    }
}

export {BlogComp};