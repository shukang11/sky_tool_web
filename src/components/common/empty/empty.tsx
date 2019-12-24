import * as React from 'react';
import {Button, Empty} from 'antd';

interface IEmptyState {}

interface IEmptyProps {
    image?: string;
    title?: string;
}

class EmptyComp extends React.Component<IEmptyProps, IEmptyState> {
    render() {
        return (
            <div>
                <Empty image={this.props.image} description={this.props.title}>
                    {this.props.children}
                </Empty>
            </div>
        );
    }
}

export { EmptyComp };