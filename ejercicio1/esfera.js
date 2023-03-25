import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.RotacionZ=0;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.Esfera=this.createEsfera(1,4,2);

    this.add(this.Esfera);
  }

  createEsfera(rad,resolEc,resolMe){
    var Esfera_ = new THREE.Object3D();
    var EsferaBase = new THREE.Mesh(new THREE.SphereGeometry(rad,resolEc,resolMe),this.material);

    Esfera_.add(EsferaBase);

    return Esfera_;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
        rad:1,
        resolEc:4,
        resolMe:2
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'rad', 1, 3, 0.1)
      .name ('Radio: ')
      .onChange ( (value) => this.setRad(value) );
    
    folder.add (this.guiControls, 'resolEc', 4, 16, 1)
      .name ('Resolucion ecuador: ')
      .onChange ( (value) => this.setResolEc(value) );
    
    folder.add (this.guiControls, 'resolMe', 2, 16, 1)
      .name ('Resolucion meridiano: ')
      .onChange ( (value) => this.setResolMe(value) );
  }

  setAngulo () {
    this.RotacionZ+=0.01;
    this.Esfera.rotation.z=this.RotacionZ;
  }

  setRad(valor){
    this.clear();
    this.Esfera=this.createEsfera(valor,this.guiControls.resolEc,this.guiControls.resolMe);
    this.Esfera.rotation.z=this.RotacionZ;
    this.add(this.Esfera);
  }

  setResolEc(valor){
    this.clear();
    this.Esfera=this.createEsfera(this.guiControls.rad,valor,this.guiControls.resolMe);
    this.Esfera.rotation.z=this.RotacionZ;
    this.add(this.Esfera);
  }

  setResolMe(valor){
    this.clear();
    this.Esfera=this.createEsfera(this.guiControls.rad,this.guiControls.resolEc,valor);
    this.Esfera.rotation.z=this.RotacionZ;
    this.add(this.Esfera);
  }

  update () {
    this.setAngulo();
  }
}

export { Esfera }