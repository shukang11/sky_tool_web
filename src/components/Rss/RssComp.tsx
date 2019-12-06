import * as React from "react";
import PageLoading from "../PageLoading/index";
import { connect } from "react-redux";
import { Button, List, message, Empty, Modal, Form, Input } from "antd";
import { rssSourceList, addRssLink } from "./../../services/rss";
import { IRss, IRssModel, add_rss_action } from "src/reducers/rss";
const FormItem = Form.Item;

type IRssProps = Readonly<{
  form: any;
  addRsses: Function;
}>;

interface IRssState {
  isShowAddRssLink: boolean;
}
class RssComp extends React.Component<IRssProps, IRssState> {
  state = {
    isShowAddRssLink: false
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
      console.log(r.data);
    });
    this.setState({ isShowAddRssLink: false });
  };
  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = (state: {rss: IRss}) => {
  return {rsses: state.rss.rsses};
}

const mapDispatchToProps = (dispatch: any) => ({
  addRsses: (rsses: Array<IRssModel>) => {
    dispatch(add_rss_action(rsses))
  }
})

export default connect()(Form.create<IRssProps>()(RssComp));
