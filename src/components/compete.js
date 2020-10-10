import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card
} from 'react-bootstrap';

class Compete extends React.Component {

    handle_compete() {
        let winner_index = this.findWinner();

        this.props.dispatch({
            type: 'SET_WINNER',
            index: winner_index
        });
    }

    findWinner() {
        /**
         * We can find the winner pretty easily if we adapt an equation of a line
         * 
         * HP = (DPS) * seconds + (Starting HP)
         * If we need to get to HP = 0
         * seconds = -(Starting Hp) / (DPS)
         * 
         * The student who takes the least number of seconds to be cheered up wins
         * 
         * @returns Index of winning student
         */
        const student1 = this.props.students[0];
        const student2 = this.props.students[1];

        if(this.secondsToBeCheeredUp(student1) < this.secondsToBeCheeredUp(student2)){
            return 0; //return student id
        } else if(this.secondsToBeCheeredUp(student1) > this.secondsToBeCheeredUp(student2)){
            return 1; // return student id
        } else {
            return null; // both students cheered up at the same time
        }
    }

    secondsToBeCheeredUp(student) {
        return (student.hp/student.dps)*-1;
    }

    render() {
        return (
            <div className="compete">

                {this.props.winner_index !== ''? (
                    <div className="winner">
                        <h1>Winner!</h1>
                        <Card>
                            <div className="student-img mx-auto">
                                { this.props.winner_index === 0 ? (
                                    <img alt="student" src={require('../assets/cat0.png')}/>
                                ): (
                                    <img alt="stuent" src={require('../assets/cat1.png')}/>
                                ) }
                            </div>
                            <Card.Title>{this.props.students[this.props.winner_index].name}</Card.Title>
                        </Card>
                    </div>
                ): ('')}
                <Button
                    onClick={()=>{this.handle_compete();}}
                >
                    Compete
                </Button>
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

export default connect(mapStateToProps)(Compete);