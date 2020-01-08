import * as React from "react";
import * as Markdown from "react-markdown";
import { Card } from "antd";

interface IBlogState {}

interface IBlogProps {
  source: string;
}

class BlogPreviewComp extends React.Component<IBlogProps, IBlogState> {
  state = {};

  render() {
    return (
      <div>
        <Card className="margin-top10" title="预览界面">
          <Markdown source={this.props.source}></Markdown>
        </Card>
      </div>
    );
  }
}

export { BlogPreviewComp };
