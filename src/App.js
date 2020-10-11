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
                    let rand_user_index = Math.round(Math.random() * (data.length -1));
                    this.props.dispatch({
                        type: 'UPDATE',
                        index: student_index,
                        field: 'name',
                        value: data[rand_user_index].name
                    });
                }
            });
    }

    render() {
        return (
            <Container className="app">
                <Row>
                    <div className="col-md-10 mx-auto">
                        <h1 className="text-center">Laughter Competition</h1>
                        <p>
                            Each student starts with a negative number of Happiness Points. A student gains happiness points with their number of Delights
                            per second. The first student to reach a positive number of happiness points wins.
                        </p>
                    </div>
                </Row>
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
