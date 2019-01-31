/** Created by treee at 2018/8/7 下午2:31 */
import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import {
    Link
} from 'react-router-dom'
class HomeComp extends Component {
    render() {
        return (
            <div>
                <li><Link exact to='/mine'>Mine</Link></li>
                <li><Link to='/login'>Login</Link></li>

            </div>
        )
    }
}

export default HomeComp;