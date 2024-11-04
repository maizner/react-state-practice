import React from 'react';

class ClassState extends React.Component {
    //Esta es la forma de extender a la super clase (clase padre de react) y editarla
    constructor(props) {
        super(props)
        this.state = {
            error: false, 
        }

    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad . </p>
                {this.state.error && (
                    <p>Error: El código es incorrecto</p>
                )}
                <input placeholder='código de seguridad'/>
                <button 
                onClick={() => this.setState({ error: !this.state.error })}
                >Comprobar</button>
            </div>
        );
    }
}
export { ClassState };