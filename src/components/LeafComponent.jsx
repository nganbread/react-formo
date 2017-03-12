import React, { Component } from 'react';
import PropTypes from 'utils/PropTypes';

export default class extends Component {
    constructor(leafType){
        super();
        this._leafType = leafType;
    }
    
    static contextTypes = {
        formo: PropTypes.Context
    }

    _node() {
        return this.context.formo.leaf(this._leafType, this);
    }

    _nodeParent() {
        return this.context.formo;
    }

    componentWillMount() {
        this.context.formo.leaf(this._leafType, this);
    }

    componentWillUnmount() {
        this.context.formo.deleaf(this._leafType, this);
    }
}