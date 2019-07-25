class Node {
  constructor(data, izq = 'No existe', der = 'No existe') {
    this.data = data;
    this.izq = izq;
    this.der = der;
  }
}

class ArbolBin {
  constructor() {
    this.root = 'No existe';
  }
  add(data) {
    const node = this.root;
    if (node === 'No existe') {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.izq === 'No existe') {
            node.izq = new Node(data);
            return;
          } else if (node.izq !== 'No existe') {
            return searchTree(node.izq);
          }
        } else if (data > node.data) {
          if (node.der === 'No existe') {
            node.der = new Node(data);
            return;
          } else if (node.der !== 'No existe') {
            return searchTree(node.der);
          }
        } else {
          return 'No existe';
        }
      };
      return searchTree(node);
    }
  }

  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.data);
        node.izq && traversePreOrder(node.izq);
        node.der && traversePreOrder(node.der);
      };
      traversePreOrder(this.root);
      return result;
    };
  }

}

module.exports = ArbolBin;