import React, {Component} from 'react';

import {AppAside} from '@coreui/react';
import {Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';

import Toolbox from '../components/Toolbox'

import MainContent from '../components/MainContent'
import ToolEditor from "./ToolEditor";

import {connect} from 'react-redux'
import {close_session, join_session} from '../actions/sessionActions'

import { Link, Route, Switch } from "react-router-dom";

class Main extends Component {

    componentDidMount() {
        this.props.join_session({id: Number(this.props.match.params.id)});
    }

    componentWillUnmount() {
        this.props.close_session();
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path={this.props.match.path + '/edit/:id'} exact component={ToolEditor} />
                    <Route component={MainContent} />
                </Switch>
            </div>
        );
    }
}

export default connect(null, {close_session, join_session})(Main);