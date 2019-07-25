'use strict'

const express = require('express');
const router = express.Router();
const ArbolBin = require('../arbol/treeObj')
const _ = require('underscore');

    let dataNew = 0;

function addNodosBusqueda(data){
    arbolB.node1 = data.hijo1;
    arbolB.node2 = data.hijo2;
    // console.log(arbolB)
    return console.log(`${arbolB.node1} y ${arbolB.node2}`)
}

const arbolB = new ArbolBin()

router.post('/cantidad', (req, res) => {
    // console.log(JSON.stringify(req.body))
    addNumbers(req.body);
    console.log(arbolB.preOrder())
    res.json({datos: arbolB.root, recorrido: arbolB.preOrder()})
}); 

router.post('/ancestro', (req, res) => {
    // console.log(JSON.stringify(req.body))
    addNodosBusqueda(req.body)

    buscar();

    function buscar() {
          let arbolBinario = arbolB.root;
          let nodo1 = arbolB.node1;
          let nodo2 = arbolB.node2;
          Promise.all([buscarAncestrosNodo(arbolBinario, nodo1), buscarAncestrosNodo(arbolBinario, nodo2)]).then(valores => {
            let nodos1 = valores[0];
            let nodos2 = valores[1];
            let nodos = _.intersection(nodos1, nodos2);
            res.json(compr(nodos))
          });   
      }
      
      function compr(nodos) {
        if (typeof (nodos[0]) === 'number') {
          return (nodos[nodos.length - 1])
        } else if (typeof (nodos[0]) === 'string' || typeof (nodos[0]) === 'undefined') {
          return ('Posiblemente Ingreso un valor No Valido, No Existente o La Raíz del Arbol... Vuelva a Intentarlo')
        }
      }
      
      function buscarAncestrosNodo(arbolBinario, nodo) {
        let check = []
        const TreeArray = arbolB.preOrder();
        for (let i = 0; TreeArray.length - 1; i++) {
          if (TreeArray[i] == nodo) {
            if (arbolBinario.data == nodo) {
              return 'A'
            } else {
              check.push(nodo);
              return new Promise((resolve, reject) => {
                let nodos = buscarNodos(arbolBinario, nodo, []);
                console.log(nodos)
                resolve(nodos);
              });
            }
          } else {
            if (i == TreeArray.length && check.length < 2){
              return ('Nope')
            }
          }
        }
      }
      
      function buscarNodos(arbolBinario, nodo, nodos) {
        if (arbolBinario === 'No existe') {
          return nodos;
        } else if (nodo < arbolBinario.data) {
          nodos.push(arbolBinario.data);
          return buscarNodos(arbolBinario.izq, nodo, nodos);
        } else if (nodo > arbolBinario.data) {
          nodos.push(arbolBinario.data);
          return buscarNodos(arbolBinario.der, nodo, nodos);
        } else {
          return nodos;
        }
      }      
})

router.get('/borrar', (req, res) => {
    dataNew = 0;
    arbolB.root = 'No existe'
    res.redirect('/')
})

function addNumbers(data){
    let dataUser = data.filas;
    dataNew += parseInt(dataUser);
    if (dataNew < 10){
        for (let i = 1; i <= dataNew; i++) {
            let pow = Math.pow(2, i)
            for (let j = 0; j <= pow; j++) {
                arbolB.add(aleatorioNumber());
            }
        }
    }
    console.log(arbolB.root)
    function aleatorioNumber() {
      return (Math.round(Math.random() * 100))
    }
}

module.exports = router;