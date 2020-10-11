import React from 'react';
import { connect } from 'react-redux';
import {
  Card
} from 'react-bootstrap';

import "animate.css";

class Results extends React.Component {

    render() {
        return (
            <div className="winner animate__animated animate__zoomInDown">
                {this.props.winner_index == null ? (
                    <h1>Tie</h1>
                ): (
                    <div>
                        <h1>Winner!</h1>
                        <Card>
                            <div className="student-img mx-auto">
                                <img alt="Robo Hash" src={this.props.students[this.props.winner_index].img_src} />
                            </div>
                            <Card.Title>{this.props.students[this.props.winner_index].name}</Card.Title>
                        </Card>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        winner_index: state.students.winner,
        students: state.students.students
    };
}

export default connect(mapStateToProps)(Results);