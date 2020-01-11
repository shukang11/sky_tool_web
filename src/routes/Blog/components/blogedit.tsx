import * as React from "react";
import { Input, Card, Button } from "antd";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import "../styles/blog.scss";

interface IBlogState {
  source: string;
  title: string;
}

interface IBlogProps extends RouteComponentProps<any> {}

class BlogEditComp extends React.Component<IBlogProps, IBlogState> {
  state = {
    source: "",
    title: "",
  };

  onChangeTitleContentEvent = e => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  onChangeContentEvent = e => {
    const { value } = e.target;
    this.setState({ source: value });
  };

  render() {
    return (
      <div>
        <Card className="margin-top10">
          <Input
            size="large"
            onChange={this.onChangeTitleContentEvent}
            placeholder="请输入标题"
          ></Input>
          <Input.TextArea
            className="margin-top10"
            rows={30}
            title="编辑内容"
            onChange={this.onChangeContentEvent}
            placeholder="请输入内容"
          ></Input.TextArea>
        </Card>
        <Card className="margin-top10">
          <Button
            onClick={() => {
              this.props.history.push("/app/blog/preview")
            }}
          >
            预览
          </Button>
        </Card>
      </div>
    );
  }
}

const BlogEdit = withRouter(BlogEditComp)
export { BlogEdit };
