import * as React from "react";
import { getRssContentList } from "src/services/rss";
import { List } from 'antd';

interface IRssContentModel {
    id: number;
    title: string;
    link: string;
    image?: string;
    description?: string;
    addTime?: number;
    fromSite: string;
}

interface IRssContentProps {
    
}

interface IRssContentState {
    page:number;
    limit: number;
    list: Array<IRssContentModel>;
}

class RssContentComp extends React.Component<IRssContentProps, IRssContentState> {
    state = {
        page: 0,
        limit: 11,
        list: []
    }

    componentDidMount() {
        this.fetchRssContentList();
    }

    fetchRssContentList() {
        getRssContentList(this.state.page, this.state.limit).then(r=> {
            if (!r || !r.data) { return; }
            if (!Array.isArray(r.data)) {
                return;
            }
            var newArray: Array<IRssContentModel> = r.data.map(item=>({
                id: item.content_id,
                title: item.title,
                link: item.link,
                image: item.hover_image,
                description: item.description,
                addTime: item.add_time,
                fromSite: item.from_site,
            }))
            this.setState({list: this.state.list.concat(newArray)})
        })
    }

    render() {

        const dataSource = this.state.list.map(item=> {

        })
        return (
            <div>
                <List></List>
            </div>
        )
    }
}

export default RssContentComp;