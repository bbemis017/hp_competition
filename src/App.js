import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row
} from 'react-bootstrap';

import Student from './components/student';
import Compete from './components/compete';

class App extends React.Component {

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then( (data) => {
                this.props.dispatch({type: 'RECEIVE_USERS', users: data});

                for(let student_index = 0; student_index < 2; student_index++) {
                    let rand_user_index = Math.round(Math.random() * data.length);
                    this.props.dispatch({type: 'UPDATE', index: student_index, field: 'name', value: data[rand_user_index].name});
                }
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-md-4">
                        <Student id={0} />
                    </div>
                    <div className="col-md-4">
                        <Compete/>
                    </div>
                    <div className="col-md-4">
                        <Student id={1} />
                    </div>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(mapStateToProps)(App);
