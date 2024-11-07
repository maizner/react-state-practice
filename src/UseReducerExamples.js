

// LO primero que necesitamos para utilizar reducers es tener compound states
const initialState = {
    value :'',
    error :false,
    loading :false,
    deleted: false,
    confirmed:false
}
// const reducer = (state, action) => {
// }

// const reducer = (state, action) => {
//     if (action.type === 'ERROR' ){  
//         return {
//             ...state, 
//             error:true,
//             loading:false
//         }

//     }else if (action.type === 'CHECK'  ){
//         return {
//             ...state, 
//             loading:false
//         }
//     }else {
//         return ...initialState,
//     }
// }

const reducerSwitch = (state, action) => {
    switch(action.type) {
        case 'ERROR': 
            return {
                ...state,
                error:true,
                loading:false
            };
        case 'CHECK': 
            return {
                ...state,
                error:true,
                loading:false
            };
        default:
            return{
                ...state,
                loading:true
            }
    }
}
    