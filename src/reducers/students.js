const INITIAL_STATE = {
    winner: '',
    students: {
        '0': {
            name: 'tmp',
            hp: '-150',
            dps: '50',
            img_src: ''
        },
        '1': {
            name: 'tmp',
            hp: '-150',
            dps: '50',
            img_src: ''
        }
    }
};


export default function (state = INITIAL_STATE, action) {
   switch(action.type){
       case 'REGISTER_STUDENT':
            return {
                ...state,
                students: {
                    ...state.students,
                    [action.index]: {
                        name: action.name,
                        hp: action.hp,
                        dps: action.dps,
                        img_src: action.img_src
                    }
                }
            }
        case 'UPDATE':
            /**
             * Updates a Single field for a student
             * @param index - student index
             * @param field - Student field
             * @param value - value for student field
             */
            return {
                ...state,
                students: {
                    ...state.students,
                    [action.index]: {
                        ...state.students[action.index],
                        [action.field]: action.value
                    }
                }
            }
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.index
            }
       default:
           return state
   }
}