import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
    //Código Imperativo vs declarativo
    //Manejo del estados compuestos => COMPOUND STATES
    //Creamos un unico estado y le pasamos un objeto con estados como propiedaqdes
    const [state, setState] = React.useState({
        value :'',
        error :false,
        loading :false,
        deleted: false,
        confirmed:false
    })

    // console.log(state)
    const handleError = () => {
        setState( PrevState => ({ ...PrevState , error:true  }))
        console.log("el codigo es incorrecto")
    }
    const handleConfirm = () => {
        setState( PrevState => ({ ...PrevState , confirmed:true  }))
        console.log("el codigo es correcto")
    }
    const handleGetInputValue = (newValue) => {
        // setState({ ...state, value: event.target.value }) 
        setState( PrevState => ({ ...PrevState , value: newValue })) 
    }
    const handleCheck = () => {
       setState( PrevState => ({ ...PrevState , loading:true }))
    }
    const handleDelete = () => {
       setState(prevState => ({ ...prevState, deleted: true }))
    }
    const handleReset = () => {
        setState( PrevState => ({ ...PrevState , confirmed:false, deleted:false, value:''  }))
    }

    React.useEffect(() => {

        if (state.loading) {
            // Para manejar estados compuestos (objetos con múltiples propiedades), usamos el operador 
            // spread (...), lo que permite actualizar solo las propiedades necesarias sin perder 
            // el resto del estado actual. Esto asegura que solo cambie "error" sin sobrescribir 
            // los demás valores de "state".
            setState( PrevState => ({ ...PrevState , error:false  }))
            setTimeout(()=> {
                if (state.value === SECURITY_CODE) {
                    handleConfirm();
                }else{
                    handleError();
                }
                setState( PrevState => ({ ...PrevState , loading:false  }))
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
                        handleGetInputValue(event.target.value);
                    }}
                />
                <button
                //entraremos en el efecto
                onClick={ () => handleCheck() }
                >Comprobar</button>
            </div>
        );
    }else if (state.confirmed && !state.deleted ){
        return(
            <>
                <p>Estas seguro de que deseas eliminar?</p>
                <button 
                    onClick={ () => handleDelete() }
                >Eliminar</button>

                <button
                    onClick={ () => handleReset() }
                >Cancelar</button>
            </>
        )

    }else {
       
        setTimeout(()=> {
            handleReset();
        }, 3000)

        return(
            
            
            <>
                <p>La tarea fue eliminada con exito</p>
                
            </>
        )
    }
}
export { UseState };