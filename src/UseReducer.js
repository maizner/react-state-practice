import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({name}) {

    const initialState = {
        value :'',
        error :false,
        loading :false,
        deleted: false,
        confirmed:false
    }
    const [state, dispatch] = React.useReducer(reducer, initialState);


    // const handleGetInputValue = (newValue) => {
    //     setState( PrevState => ({ ...PrevState , value: newValue })) 
    // }



    React.useEffect(() => {

        if (state.loading) {

            setTimeout(()=> {
                if (state.value === SECURITY_CODE) {
                    dispatch( { type: 'CONFIRM' } )
                    
                }else{
                    dispatch( { type: 'ERROR' } )
                 
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
                    value = {state.value}
                    onChange= {(event) => {
                        dispatch( { type: 'WRITE', payload: event.target.value } )
                    }}
                />
                <button
                //entraremos en el efecto
                onClick={ () => 
                    dispatch( { type: 'CHECK' } )
                }
                >Comprobar</button>
            </div>
        );
    }else if (state.confirmed && !state.deleted ){
        return(
            <>
                <p>Estas seguro de que deseas eliminar?</p>
                <button 
                    onClick={ () => 
                        dispatch( { type: 'DELETE' } )
                     }
                >Eliminar</button>

                <button
                    onClick={ () =>
                        dispatch( { type: 'RESET' } )
                         }
                >Cancelar</button>
            </>
        )

    }else {
       
        setTimeout(()=> {
            dispatch( { type: 'RESET' } )
        }, 3000)

        return(
            
            
            <>
                <p>La tarea fue eliminada con exito</p>
                
            </>
        )
    }
}

const reducerObject =  (state, payload) => ({
    'ERROR':{
        ...state,
        error:true,
        loading:false
    }, 
    'WRITE':{
        ...state,
        value:payload
    },
     'CHECK':{
        ...state,
        loading:true
    },
    'CONFIRM':{
        ...state,
        confirmed:true,
        error:false,
        loading:false
    },
    'DELETE':{
        ...state,
        deleted: true 
    },
    'RESET':{
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
    
export {  UseReducer };