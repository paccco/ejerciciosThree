import * as THREE from '../libs/three.module.js'

class cono extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.RotacionZ=0;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.cono=this.createCono(1,1.5,3);

    this.add(this.cono);
  }

  createCono(rad,alt,def){
    var cono_ = new THREE.Object3D();
    var conoBase = new THREE.Mesh(new THREE.ConeGeometry(rad,alt,def),this.material);

    cono_.position.set(4,4,0);
    cono_.add(conoBase);

    return cono_;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      radio : 1,
      altura : 1.5,
      definicion : 3
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radio', 0.5, 3, 0.1)
      .name ('Radio : ')
      .onChange ( (value) => this.setRad(value) );
    
    folder.add (this.guiControls, 'altura', 1, 5, 0.1)
      .name ('Altura : ')
      .onChange ( (value) => this.setAlt(value) );
    
    folder.add (this.guiControls, 'definicion', 3, 32, 1)
      .name ('Definicion : ')
      .onChange ( (value) => this.setDef(value) );
  }

  setAngulo () {
    this.RotacionZ+=0.01;
    this.cono.rotation.z=this.RotacionZ;
  }

  setRad(valor){
    this.clear();
    this.cono=this.createCono(valor,this.guiControls.altura,this.guiControls.definicion);
    this.cono.rotation.z=this.RotacionZ;
    this.add(this.cono);
  }
  setAlt(valor){
    this.clear();
    this.cono=this.createCono(this.guiControls.radio,valor,this.guiControls.definicion);
    this.cono.rotation.z=this.RotacionZ;
    this.add(this.cono);
  }
  setDef(valor){
    this.clear();
    this.cono=this.createCono(this.guiControls.radio,this.guiControls.altura,valor);
    this.cono.rotation.z=this.RotacionZ;
    this.add(this.cono);
  }

  update () {
    this.setAngulo();
  }
}

export { cono }
