import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  FormControl,
  Button
} from 'react-bootstrap';

class Student extends React.Component {

    componentDidMount() {
        this.randomize();
    }

    randomize() {
        let hp = Math.round(Math.random() * 299) + 1; // Random number between 1 and 300
        hp *= -1; // make hp negative

        let dps = Math.round(Math.random() * 49) + 1; // Random number between 1 and 49

        let name = '';
        if(this.props.potential_names.length > 0){
            let rand_user_index = Math.round(Math.random() * (this.props.potential_names.length - 1));
            name = this.props.potential_names[rand_user_index].name;
        }

        this.props.dispatch({
            type: 'REGISTER_STUDENT',
            index: this.props.id,
            name: name,
            hp: hp,
            dps: dps,
            img_src: 'temp'
        });

        this.props.dispatch({
            type: 'SET_WINNER',
            index: ''
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

                    <Button
                        variant="primary"
                        onClick={()=> {this.randomize()}}
                    >Randomize</Button>
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
        img_src: student.img_src,
        potential_names: state.users.users
    };
}

export default connect(mapStateToProps)(Student);