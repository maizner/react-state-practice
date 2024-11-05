import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
    //Manejo del estado de forma individual y declarativa
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        console.log ('empezando efecto')

        if (loading) {
            //funcion protege el disparador de cambio de estado de loading 
            setTimeout(()=> {
                //console.log( 'haciendo validacion');
                setError(false)
                if (value !== SECURITY_CODE) {
                    setError(true)
                }
                setLoading(false);
                //console.log( 'terminando validacion')
            }, 3000)

        }

    }, [loading])
    
    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {(error && !loading) && (
                <p>Error: El código es incorrecto</p>
            )}
             {loading && (
                <p>Cargando ...</p>
            )}
            <input 
                placeholder='código de seguridad'
                value = {value}
                onChange={(e) => {
                    setValue(e.target.value) 
                }}
            />
            <button
            //entraremos en el efecto
            onClick={() => setLoading(!loading)}
            >Comprobar</button>
        </div>
    );
}
export { UseState };