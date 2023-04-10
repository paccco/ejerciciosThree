import * as THREE from '../libs/three.module.js'

class penPeq extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    var geom=new THREE.BoxGeometry(0.5,2,0.25);

    geom.translate(0,-0.7,0);

    var mesh=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({color:0x00aa00}));

    var ejeGeom=new THREE.CylinderGeometry(0.2,0.2,0.6,12);

    ejeGeom.translate(0,-0.1,0);

    var meshEje=new THREE.Mesh(ejeGeom,new THREE.MeshBasicMaterial({color:0x990000}));

    meshEje.rotateX(Math.PI/2);

    this.add(mesh);
    this.add(meshEje);
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      rotacion:0
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'rotacion',0,360,1)
      .name ('Rotacion : ')
      .onChange ( (value) => this.rotar(value));
  }

  rotar(valor){
    this.rotation.z=valor*Math.PI/180;
  }

  mover(x,y,z){
    this.position.set(x,y,z);
  }

  update () {

  }
}

export { penPeq }