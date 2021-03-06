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

        // If we have fetched the user names, generate a random name
        if(this.props.potential_names.length > 0){
            let rand_user_index = Math.round(Math.random() * (this.props.potential_names.length - 1));
            name = this.props.potential_names[rand_user_index].name;
        }

        // get a random image to use for the user
        let rand_num = Math.round(Math.random() * 1000);
        let img_url = `https://robohash.org/${rand_num}.png?set=set4&size=150x150`;

        this.props.dispatch({
            type: 'REGISTER_STUDENT',
            index: this.props.id,
            name: name,
            hp: hp,
            dps: dps,
            img_src: img_url
        });

        // reset the winner
        this.props.dispatch({
            type: 'SET_WINNER',
            index: ''
        });
    }

    update_stat(field, event, sign) {
        /**
         * Updates a student's field
         * @param field to update
         * @param event containing new value
         * @param Sign - forces the value to take the provided sign
         *              -1 will force input values to be negative
         *               1 will force input values to be positive
         */
        this.props.dispatch({
            type: 'UPDATE',
            index: this.props.id,
            field: field,
            value: Math.abs(event.target.value) * sign
        });
    }

    render() {
        return (
            <div className="student text-center">
                <Card>
                    <div className="student-img mx-auto">
                        <img
                            alt={`Robo hash ${this.props.id}`}
                            src={this.props.img_src}
                        />
                    </div>
                    <Card.Title>{this.props.name}</Card.Title>

                    <label>Happiness Points</label>
                    <FormControl
                        type="number"
                        value={this.props.hp}
                        onChange={(e)=>{this.update_stat('hp', e, -1)}}
                    />

                    <label>Delight Per Second</label>
                    <FormControl
                        type="number"
                        value={this.props.dps}
                        onChange={(e)=>{this.update_stat('dps', e, 1)}}/>

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
    id: PropTypes.number.isRequired, // The Students index in the students map
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