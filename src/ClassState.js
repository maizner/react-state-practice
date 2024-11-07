import React from 'react';

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            value: "",
            confirmed: false,
            deleted: false,
        };
    }

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                this.setState({ loading: false });
                if (SECURITY_CODE === this.state.value) {
                    this.setState({ confirmed: true, error: false });
                } else {
                    this.setState({ error: true });
                }
            }, 3000);
        }
    }

    handleDelete = () => {
        this.setState({ deleted: true });
    };

    handleReset = () => {
        this.setState({ confirmed: false, deleted: false, value: "" });
    };

    render() {
        if (!this.state.confirmed && !this.state.deleted) {
            return (
                <div>
                    <h2>Eliminar {this.props.name}</h2>
                    <p>Por favor, escribe el código de seguridad.</p>

                    {this.state.error && !this.state.loading && (
                        <p>Error: El código es incorrecto</p>
                    )}
                    {this.state.loading && <p>Cargando...</p>}

                    <input
                        placeholder="código de seguridad"
                        value={this.state.value}
                        onChange={(e) => this.setState({ value: e.target.value })}
                    />
                    <button onClick={() => this.setState({ loading: true })}>
                        Comprobar
                    </button>
                </div>
            );
        } else if (this.state.confirmed && !this.state.deleted) {
            return (
                <>
                    <p>¿Estás seguro de que deseas eliminar?</p>
                    <button onClick={this.handleDelete}>Eliminar</button>
                    <button onClick={this.handleReset}>Cancelar</button>
                </>
            );
        } else {
            setTimeout(this.handleReset, 3000);
            return <p>La tarea fue eliminada con éxito</p>;
        }
    }
}

export { ClassState };
