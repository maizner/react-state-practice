import React from "react";

function UseState({name}) {
    //Manejo del estado de forma individual y declarativa
    const [error, setError] = React.useState(false);
    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {error && (
                <p>Error: El código es incorrecto</p>
            )}
            <input placeholder='código de seguridad'/>
            <button
            onClick={() => setError(!error)}
            >Comprobar</button>
        </div>
    );
}
export { UseState };