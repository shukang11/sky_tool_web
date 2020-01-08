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
import * as Markdown  from 'react-markdown';

interface IBlogState {
    source: string;
}

interface IBlogProps {}

class BlogEditComp extends React.Component<IBlogProps, IBlogState> {
    state = {
        source:"# this is a header \n\n and this is a paragraph",
    };
    
    render() {
        return (
            <div>
                <Markdown source={this.state.source}></Markdown>
            </div>
        );
    }
}

export {BlogEditComp};