import * as React from "react";
import { connect } from "react-redux";
import { Button, List, message, Empty, Modal, Form, Input } from "antd";
import { rssSourceList, addRssLink } from "./../../services/rss";
import "./RssComp.scss";

const FormItem = Form.Item;

export declare interface IRssModel {
  id: number;
  link: string;
  title: string;
  description: string;
}

type IRssProps = Readonly<{
  form: any;
}>;

interface IRssState {
  rsses: Array<IRssModel>;
  isShowAddRssLink: boolean;
  pages: number;
  limit: number;
  hasMore: boolean;
}
class RssComp extends React.Component<IRssProps, IRssState> {
  state = {
    rsses: [],
    isShowAddRssLink: false,
    pages: 0,
    limit: 11,
    hasMore: true
  };
  /* 点击显示对话框 */
  onWantCreateRssLinkClicked = () => {
    this.setState({ isShowAddRssLink: true });
  };

  onCreateRssLinkAction = () => {
    const values = this.props.form.getFieldsValue();
    const { link } = values;
    if (!link) {
      message.error("链接不可为空");
      return;
    }

    addRssLink(link).then(r => {
      if (!r || !r.data) {
        return;
      }
      this.setState({
        pages: 0,
        rsses: []
      })
      this.fetchRssLimit(0);
    });
    this.setState({ isShowAddRssLink: false });
  };

  fetchRssLimit(page: number) {
    const { pages, limit } = this.state;
    rssSourceList(pages, limit).then(r => {
      if (!r || !r.data) {
        return;
      }
      
      var append: Array<IRssModel> = r.data.map(
        (i: { rss_id: any; rss_link: any; rss_title: any }) => ({
          id: i.rss_id,
          link: i.rss_link,
          title: i.rss_title,
          description: ""
        })
      );
      var source: Array<IRssModel> = this.state.rsses;
      if (page == 0) {
        source = [];
      }
      this.setState({
        rsses: source.concat(append),
        hasMore: append.length >= 11,
        pages: page
      });
    });
  }

  componentDidMount() {
    if (this.state.rsses.length === 0) {
      this.fetchRssLimit(0);
    }
  }

  modalComp(getFieldDecorator: any): React.ReactNode {
    return (
      <Modal
        visible={this.state.isShowAddRssLink}
        onOk={() => {
          this.onCreateRssLinkAction();
        }}
        onCancel={() => {
          this.setState({ isShowAddRssLink: false });
        }}
        okText={"确认"}
        cancelText={"取消"}
      >
        <Form>
          <FormItem label="链接地址">
            {getFieldDecorator("link", {
              rules: [
                {
                  require: true,
                  message: "rss link is required!"
                }
              ]
            })(<Input placeholder="请输入订阅源" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {rsses} = this.state;
    
    const ModalItem = this.modalComp(getFieldDecorator);
    if (!rsses || rsses.length == 0) {
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
                this.onWantCreateRssLinkClicked();
              }}
            >
              创建一个
            </Button>
          </Empty>
          {ModalItem}
        </div>
      );
    }

    const data = rsses;
    return (
      <div>
        <List
          header={
            <div className="center-has-more">
              <Button
                type="primary"
                onClick={() => {
                  this.onWantCreateRssLinkClicked();
                }}
              >
                创建一个
              </Button>
            </div>
          }
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.link}
              ></List.Item.Meta>
            </List.Item>
          )}
          loadMore={
            this.state.hasMore ? (
              <div className="center-has-more">
                <Button
                  onClick={() => {
                    this.fetchRssLimit(this.state.pages + 1);
                  }}
                >
                  加载更多
                </Button>
              </div>
            ) : (
              <div></div>
            )
          }
        ></List>
        {ModalItem}
      </div>
    );
  }
}

export default connect()(Form.create<IRssProps>()(RssComp));
