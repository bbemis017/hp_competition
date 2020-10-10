const INITIAL_STATE = {
    users: []
};


export default function (state = INITIAL_STATE, action) {
   switch(action.type){
       case 'RECEIVE_USERS':
           return {
               ...state,
               users: action.users
           }
       default:
           return state
   }
}