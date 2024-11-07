import React from "react";

const SECURITY_CODE = 'paradigma';

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET'

}
const reducerObject =  (state, payload) => ({
    [actionTypes.error]:{
        ...state,
        error:true,
        loading:false
    }, 
    [actionTypes.write]:{
        ...state,
        value:payload
    },
    [actionTypes.check]:{
        ...state,
        loading:true
    },
    [actionTypes.confirm]:{
        ...state,
        confirmed:true,
        error:false,
        loading:false
    },
    [actionTypes.delete]:{
        ...state,
        deleted: true 
    },
    [actionTypes.reset]:{
        ...state,
        confirmed:false, 
        deleted:false, 
        value:''
    }
});

// validacion de si el action type existe dentro del objeto de reducerObject
const reducer  = (state, action) => {
    if (reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    }else{
        return state;
    }
}


function UseReducer({name}) {

    const initialState = {
        value :'',
        error :false,
        loading :false,
        deleted: false,
        confirmed:false
    }
    //Action Creator 
    const handleConfirm = () => {
        dispatch({type:actionTypes.confirm})
    }
    const handleError = () => {
        dispatch({type:actionTypes.error})
    }
    const handleWrite = (event) => {
        dispatch({type:actionTypes.write, payload: event.target.value})
    }
    const handleDelete = () => {
        dispatch({type:actionTypes.delete})
    }
    const handleCheck = () => {
        dispatch({type:actionTypes.check})
    }
    const handleReset = () => {
        dispatch({type:actionTypes.reset})
    }
   
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        if (state.loading) {

            setTimeout(()=> {
                if (state.value === SECURITY_CODE) {
                    handleConfirm()
                }else{
                    handleError()
                }
        
            }, 3000)

        }

    }, [state.loading])

    if(!state.deleted && !state.confirmed ){

        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
    
                {(state.error && !state.loading) && (
                    <p>Error: El código es incorrecto</p>
                )}
                 {state.loading && (
                    <p>Cargando ...</p>
                )}
    
                <input 
                    placeholder='código de seguridad'
                    value = { state.value }
                    onChange= { handleWrite } 
                />
                <button
                //entraremos en el efecto
                onClick={ handleCheck }
                >Comprobar</button>
            </div>
        );
    }else if (state.confirmed && !state.deleted ){
        return(
            <>
                <p>Estas seguro de que deseas eliminar?</p>
                <button 
                    onClick={ handleDelete } >Eliminar</button>

                <button
                    onClick={ handleReset } >Cancelar</button>
            </>
        )

    }else {
       
        setTimeout(()=> {
            handleReset()
        }, 3000)

        return <p>La tarea fue eliminada con exito</p>  
    }
}




    
export {  UseReducer };