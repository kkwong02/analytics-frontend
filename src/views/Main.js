import React, {Component} from 'react';

import {AppAside} from '@coreui/react';
import {Container} from 'reactstrap';

import Tool from '../components/Tool';
import Toolbox from '../components/Toolbox'

class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <Toolbox />
                <main className="main">
                    <Container fluid>
                        <Tool/>
                    </Container>
                </main>
                <AppAside fixed offCanvas={false}>
                    <div>
                        Data here?
                    </div>
                </AppAside>
            </React.Fragment>
        );
    }
}

export default Main;