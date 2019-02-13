/** Created by treee at 2019/1/29 12:27 PM */
import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom'

class NotFoundComp  extends Component {
    render() {
        return (
            <div><Link to="/app">Not found</Link></div>
        );
    }
}

export default NotFoundComp;