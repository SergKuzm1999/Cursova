import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let {visible} = this.props;
        return (
            <div className={'loader-container ' + visible}>
                <div className="loader">Loading...</div>
            </div>
        );
    }
}

export default Loader
