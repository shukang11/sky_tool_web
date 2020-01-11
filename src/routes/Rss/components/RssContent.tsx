import * as React from "react";
import { getRssContentList, readRssContent, toggleRssContentCollect } from "src/services/rss";
import { List, Button, Spin, Card, Dropdown, Menu, Row, Col, message } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as InfiniteScroll from "react-infinite-scroller";
import "../styles/RssContent.scss";

interface IRssContentModel {
  id: number;
  title: string;
  link: string;
  image?: string;
  description?: string;
  addTime?: string;
  fromSite: string;
  isCollected?: boolean;
  rateValue?: number;
  noRate: boolean;
}

interface IRssContentProps extends RouteComponentProps<any> {}

interface IRssContentState {
  page: number;
  limit: number;
  list: Array<IRssContentModel>;
  hasMore: boolean;
}

class RssContentComp extends React.Component<
  IRssContentProps,
  IRssContentState
> {
  state = {
    page: 0,
    limit: 11,
    list: [],
    hasMore: false
  };

  componentDidMount() {
    this.fetchRssContentList(0);
  }

  fetchRssContentList(page: number) {
    getRssContentList(page, this.state.limit).then(r => {
      if (!r || !r.data) {
        return;
      }
      if (!Array.isArray(r.data)) {
        return;
      }
      console.log(r.data);
      
      var newArray: Array<IRssContentModel> = r.data.map(item => ({
        id: item.content_id,
        title: item.title,
        link: item.link,
        image: item.hover_image,
        description: item.description,
        addTime: item.add_time,
        fromSite: item.from_site,
        isCollected: item.isCollected,
        rateValue: item.rate_value,
        noRate: item.is_no_rate
      }));
      var originArray: Array<IRssContentModel> = this.state.list;
      if (page === 0) {
        originArray = [];
      }
      this.setState({
        list: originArray.concat(newArray),
        hasMore: newArray.length >= 11,
        page: page
      });
    });
  }

  renderContentCard(item: IRssContentModel): React.ReactNode {
    return (
      <Card
        hoverable
        cover={item.image ? <a href={item.image} /> : null}
        actions={this.listItemActions(item)}
      >
        <Card.Meta title={item.title} description={item.addTime}></Card.Meta>
      </Card>
    );
  }

  toggleContentCollect(item: IRssContentModel) {
    toggleRssContentCollect(item.id).then(r=> {
      if (!r || !r.data) {
        return;
      }
      message.success(r.msg);
      this.fetchRssContentList(0);
    });
  }

  setItemRateValue(item: IRssContentModel, rateValue: number) {
    
  }

  listItemActions(item: IRssContentModel): Array<React.ReactNode> {
    return [
      <Button
        onClick={() => {
          readRssContent(item.id);
        }}
      >
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          查看
        </a>
      </Button>,
      <Button onClick={() => {
        this.toggleContentCollect(item);
      }}>
        {item.isCollected ? "取消收藏" : "收藏"}
      </Button>
    ];
  }
  render() {
    const dataSource = this.state.list;
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          hasMore={this.state.hasMore}
          loadMore={() => {
            this.fetchRssContentList(this.state.page + 1);
          }}
        >
          <List
            grid={{ gutter: 16, column: 2 }}
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={item => (
              <List.Item /*actions={this.listItemActions(item)}*/>
                {this.renderContentCard(item)}
              </List.Item>
            )}
            loadMore={this.state.hasMore ? <Spin></Spin> : <div></div>}
          ></List>
        </InfiniteScroll>
      </div>
    );
  }
}

const RssContent = withRouter(RssContentComp);
export {
  RssContent
};
