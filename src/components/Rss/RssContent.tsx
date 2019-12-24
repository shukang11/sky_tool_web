import * as React from "react";
import { getRssContentList } from "src/services/rss";
import { List, Button } from "antd";

interface IRssContentModel {
  id: number;
  title: string;
  link: string;
  image?: string;
  description?: string;
  addTime?: number;
  fromSite: string;
}

interface IRssContentProps {}

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

      var newArray: Array<IRssContentModel> = r.data.map(item => ({
        id: item.content_id,
        title: item.title,
        link: item.link,
        image: item.hover_image,
        description: item.description,
        addTime: item.add_time,
        fromSite: item.from_site
      }));
      this.setState({
        list: this.state.list.concat(newArray),
        hasMore: newArray.length >= 11,
        page: page,
      });
    });
  }

  render() {
    const dataSource = this.state.list;
    return (
      <div>
        <List
          size="large"
          dataSource={dataSource}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.fromSite}
              ></List.Item.Meta>
            </List.Item>
          )}
          loadMore={
            this.state.hasMore ? (
              <div className="center-has-more">
                <Button
                  onClick={() => {
                    this.fetchRssContentList(this.state.page + 1);
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
      </div>
    );
  }
}

export default RssContentComp;
