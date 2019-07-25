import React, { Component } from 'react';
import { render } from 'react-dom';
import Arbol from './components/arbolApp';

function App(){
    return(
        <Arbol/>
    )
}

render(<App/>, document.getElementById('root'))