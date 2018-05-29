import React, {Component} from 'react';

import {AppAside} from '@coreui/react';
import {Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';

import Toolbox from '../components/Toolbox';
import Loader from '../components/Loader';

import MainContent from '../components/MainContent';
import ToolEditor from './ToolEditor';

import {connect} from 'react-redux';
import {close_session, join_session} from '../actions/sessionActions';

import { Link, Route, Switch } from 'react-router-dom';

class Main extends Component {
    componentDidMount() {
        this.props.join_session({id: Number(this.props.match.params.id)});
    }

    componentWillUnmount() {
        this.props.close_session();
    }
    render() {
        let content = this.props.session ? (
            <Switch>
                <Route path={this.props.match.path + '/(edit|new)/:id'} exact render={
                    props => {
                        return (<ToolEditor {...props} prev={this.props.match.url}/>);
                    }
                } />
                <Route component={MainContent} />
            </Switch>) : <Loader />;
            console.log(content);

        return (
            <div>
                {content}
            </div>

        );
    }
}

const MapStateToProps = state => ({
    session: state.session.current_session
});

export default connect(MapStateToProps, {close_session, join_session})(Main);