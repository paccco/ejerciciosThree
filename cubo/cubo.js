import * as THREE from '../libs/three.module.js'

class cubo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.caja=this.createCaja();

    this.add(this.caja);
  }

  createCaja(){
    var caja_ = new THREE.Object3D();
    var cajaBase = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),this.material);

    caja_.position.set(0,2,0); 
    caja_.scale.set(this.guiControls.dX,this.guiControls.dY,this.guiControls.dZ);
    caja_.add(cajaBase);

    return caja_;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      dX : 2,
      dY : 2,
      dZ : 2
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'dX', 0.1, 5, 0.1)
      .name ('Dimensiones X : ')
      .onChange ( (value) => this.setTamanioX(value) );
    
    folder.add (this.guiControls, 'dY', 0.1, 5, 0.1)
      .name ('Dimensiones Y : ')
      .onChange ( (value) => this.setTamanioY(value) );
    
    folder.add (this.guiControls, 'dZ', 0.1, 5, 0.1)
      .name ('Dimensiones Z : ')
      .onChange ( (value) => this.setTamanioZ(value) );
  }

  setAngulo () {
    this.caja.rotation.z+=0.01;
  }

  setTamanioX(valor){
    this.caja.scale.set(valor,this.guiControls.dY,this.guiControls.dZ);
  }
  setTamanioY(valor){
    this.caja.scale.set(this.guiControls.dX,valor,this.guiControls.dZ);
  }
  setTamanioZ(valor){
    this.caja.scale.set(this.guiControls.dX,this.guiControls.dY,valor);
  }

  update () {
    this.setAngulo();
  }
}

export { cubo }
