import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  FormControl
} from 'react-bootstrap';

class Student extends React.Component {

    componentDidMount() {
        this.generate_stats();
    }

    generate_stats() {
        let hp = Math.round(Math.random() * 299) + 1; // Random number between 1 and 300
        hp *= -1; // make hp negative

        let dps = Math.round(Math.random() * 49) + 1; // Random number between 1 and 49

        this.props.dispatch({
            type: 'REGISTER_STUDENT',
            index: this.props.id,
            name: '',
            hp: hp,
            dps: dps,
            img_src: 'temp'
        });
    }

    update_stat(field, event) {
        this.props.dispatch({
            type: 'UPDATE',
            index: this.props.id,
            field: field,
            value: event.target.value
        });
    }

    render() {
        return (
            <div className="student text-center">
                <Card>
                    <div className="student-img mx-auto">
                        { this.props.id === 0 ? (
                            <img alt="student" src={require('../assets/cat0.png')}/>
                        ): (
                            <img alt="stuent" src={require('../assets/cat1.png')}/>
                        ) }
                    </div>
                    <Card.Title>{this.props.name}</Card.Title>

                    <label>Happiness Points</label>
                    <FormControl
                        value={this.props.hp}
                        onChange={(e)=>{this.update_stat('hp', e)}}
                    />

                    <label>Delight Per Second</label>
                    <FormControl
                        value={this.props.dps}
                        onChange={(e)=>{this.update_stat('dps', e)}}/>
                </Card>
            </div>
        )
    }
}

Student.propTypes = {
    id: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
    let student = state.students.students[ownProps.id];
    return {
        name: student.name,
        hp: student.hp,
        dps: student.dps,
        img_src: student.img_src
    };
}

export default connect(mapStateToProps)(Student);