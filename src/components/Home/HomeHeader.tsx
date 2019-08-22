import * as React from 'react';
import { Layout, Avatar, Icon } from 'antd';
import './HomeHeader.css';
const { Header } = Layout;

interface IHomeHeaderProps {

}
interface IHomeHeaderState {

}
class HomeHeaderComp extends React.Component<IHomeHeaderProps, IHomeHeaderState> {

    render() {
        return (
            <div className="header">
                <Avatar className='header-icon' size='default' icon='user'></Avatar>
            </div>
        );
    }
}

export default HomeHeaderComp;