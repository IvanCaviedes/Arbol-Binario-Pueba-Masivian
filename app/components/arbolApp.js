import React, { Component } from 'react';
class Arbol extends Component {
    constructor() {
        super();

        this.state = {
            filas: '',
            hijo1: '',
            hijo2: '',
            count: 0
        }

        this.handleSubmin = this.handleSubmin.bind(this);
        this.catchData = this.catchData.bind(this);
        this.handleAncestro = this.handleAncestro.bind(this);
        this.delete = this.delete.bind(this);
    }

    handleSubmin(e) {
        e.preventDefault()

        if (!this.state.filas == "") {
            const req = new Request(`/cantidad`, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            fetch(req)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw 'Error on call'
                    }
                })
                .then(data => {
                    this.state.count += parseInt(this.state.filas);
                    document.getElementById('datos').innerHTML = JSON.stringify(data.datos);
                    document.getElementById("valueFilas").value = '';
                    if (this.state.count < 10) {
                        document.getElementById("countFilas").innerHTML = `Lleva ${this.state.count} filas`;
                    } else {
                        document.getElementById("countFilas").innerHTML = `No puede agregar mas filas`;
                    }
                })
        } else {
            alert("No puede generar Filas sin antes Escribir un número")
        }


    }

    handleAncestro(e) {
        e.preventDefault()
        const req = new Request(`/ancestro`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        fetch(req)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw 'Error on call'
                }
            })
            .then(data => {
                document.getElementById("ancestro").innerHTML = `El Ancestro Mas Cercano a los Digitos Ingresados es: ${data}`;
            })
    }

    catchData(e) {
        const { name, value } = e.target;
        if (!/[a-zA-Z]/g.test(value) || value == "") {
            this.setState({
                [name]: value
            });
            document.getElementById('confirmacion').innerHTML = '';
        } else {
            document.getElementById('confirmacion').innerHTML = '** Este campo no puede obtener ese valor';
        }
    }

    delete() {
        window.location.href = '/borrar'
    }

    render() {
        return (
            <div className="contGeneral">
                <div className="container">
                        <form autoComplete="off" onSubmit={this.handleSubmin}>
                            <div class="form-group">
                                <p id="confirmacion"></p>
                                <label>los datos el arbol se crea de forma aleatoria</label><br />
                                <input type="number" min="1" max="9" id="valueFilas" name="filas" placeholder="Ingrese cantidad de Filas que desea" onChange={this.catchData}></input>
                                <button type="submit" class="btn btn-primary" >CREE LAS FILAS</button><label id="countFilas">Contador de Filas</label>
                            </div>
                        </form>
                </div>

                <p id="recorrido"></p>
                <div>
                    <p id="datos"></p>
                </div>
                <hr />
                <form autoComplete="off" onSubmit={this.handleAncestro}>
                    <p id="confirmacion"></p>
                    <input type="text" name="hijo1" placeholder="Ingrese El dato N°1" onChange={this.catchData} class="form-control"></input>
                    <input type="text" name="hijo2" placeholder="Ingrese El dato N°2" onChange={this.catchData} class="form-control"></input>
                    <button type="submit" class="btn btn-primary">BUSQUE EL ANCESTRO</button>
                </form>
                <p id="ancestro"></p>
                <hr />

                <button onClick={this.delete} class="btn btn-primary">BORRA TODO</button>
            </div>
        )
    }
}



export default Arbol;

