//Estados compuestos en componentes con clases
import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = "paradigma";
class ClassState extends React.Component {
    //Esta es la forma de extender a la super clase (clase padre de react) y editarla
    constructor(props) {
        super(props)

        this.state = {
              error: false,
            loading: false,
            value: "",
        }
    }
    
    // UNSAFE_componentWillMount(){
    //     console.log('componentWillMount')  
    // }
  
    // componentDidMount(){
    //     console.log('componentDidMount')
    // }
    componentDidUpdate() {
        console.log('actualizacion');

        if( !!this.state.loading) {

            setTimeout( () => {
                console.log('haciendo la validacion');
                if (SECURITY_CODE  === this.state.value){

                    this.setState({ error:false,loading:false });
                }else {
                    this.setState({ error:true, loading:false });
                    
                }
                console.log('terminando validacion');
            }, 3000)
        }
    }

    render() {
        const {name, error, loading, value} = this.state
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad . </p>

                {(error && !loading)  && (
                    <p>Error: El código es incorrecto</p>
                )}

                {loading && (
                    <Loading />
                )}

                <input 
                    placeholder='código de seguridad'
                    value = { value }
                    onChange={ (e) => {
                        this.setState({value: e.target.value});
                    }}
                />
                <button 
                    onClick={() => this.setState({ 
                        // error: !this.state.error
                       loading:true
                    })}
                >Comprobar</button>
            </div>
        );
    }
}
export { ClassState };