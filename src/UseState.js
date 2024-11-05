import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
    //Manejo del estados compuestos
    const [state, setState] = React.useState({
        value :'',
        error :false,
        loading :false,
    })


    React.useEffect(() => {

        if (state.loading) {
            // al momento de usar estados compuestos debemos usar spread operator para asegurqrnos de que mantenga los estados anteriores
            setState( PrevState => ({ ...PrevState , error:false  }))
            setTimeout(()=> {
                if (state.value !== SECURITY_CODE) {
                    setState( PrevState => ({ ...PrevState , error:true  }))
                }
                setState( PrevState => ({ ...PrevState , loading:false  }))
            }, 3000)

        }

    }, [state.loading])
    
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
                        // setState({ ...state, value: event.target.value }) 
                        setState( PrevState => ({ ...PrevState , value: event.target.value  })) 
                        
                    }
                }
            />
            <button
            //entraremos en el efecto
            onClick={() => setState( PrevState => ({ ...PrevState , loading:true  })) }
            >Comprobar</button>
        </div>
    );
}
export { UseState };