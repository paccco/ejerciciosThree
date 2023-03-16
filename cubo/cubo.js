import * as THREE from '../libs/three.module.js'

class cubo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});
    
    var caja = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),this.material);

    this.add(caja);
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      dimensionesX : 1,
      dimensionesY : 1,
      dimensionesZ : 1
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'dimensionesX', 1, 5, 0.1)
      .name ('Dimensiones X : ')
      .onChange ( (value) => this.caja.geometry.scale());
    
      folder.add (this.guiControls, 'dimensionesY', 1, 5, 0.1)
      .name ('Dimensiones Y : ')
      .onChange ( (value) => this.setTamanio (value) );
    
      folder.add (this.guiControls, 'dimensionesZ', 1, 5, 0.1)
      .name ('Dimensiones Z : ')
      .onChange ( (value) => this.setTamanio (value) );
  }

  setAngulo () {
    this.caja.rotation.z += 0.01;
  }
  
  update () {
    //this.setAngulo();
  }
}

export { cubo }
