import * as THREE from '../libs/three.module.js'
import { penPeq } from './penPeq.js';

class penGran extends THREE.Object3D {
  constructor(gui,titleGui,titleGui2) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.geom1=new THREE.BoxGeometry(0.5,0.5,0.25);
    this.geom2=new THREE.BoxGeometry(0.5,0.75,0.25);
    this.geom3=new THREE.BoxGeometry(0.5,0.5,0.25);

    var eje=new THREE.CylinderGeometry(0.2,0.2,0.6,12);

    eje.rotateX(Math.PI/2);

    this.geom2.translate(0,-0.625,0);
    this.geom3.translate(0,-1.25,0);

    var mesh1=new THREE.Mesh(this.geom1,new THREE.MeshBasicMaterial({color : 0xaa0000}));
    var mesh2=new THREE.Mesh(this.geom2,new THREE.MeshBasicMaterial({color : 0x00aa00}));
    var mesh3=new THREE.Mesh(this.geom3,new THREE.MeshBasicMaterial({color : 0xaa0000}));

    this.ejeMesh=new THREE.Mesh(eje,new THREE.MeshBasicMaterial({color:0x0000aa}));

    this.penPeq=new penPeq(gui,titleGui2);

    this.add(mesh1);
    this.add(mesh2);
    this.add(mesh3);

    this.add(this.ejeMesh);

    this.penPeq.translateZ(0.25);
    this.penPeq.translateY(-1.25);

    this.add(this.penPeq);
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      rotacion:0,
      tamanio:0.75
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'rotacion',0,360,1)
      .name ('Rotacion : ')
      .onChange ( (value) => this.rotar(value));

    folder.add (this.guiControls, 'tamanio',0.5,1.5,0.01)
      .name ('Tamanio : ')
      .onChange ( (value) => this.setTamanio(value));
  }

  rotar(valor){
    this.rotation.z=valor*Math.PI/180;
  }
  setTamanio(valor){
    this.clear();

    this.add(new THREE.Mesh(this.geom1,new THREE.MeshBasicMaterial({color:0xaa0000})));

    this.geom2=new THREE.BoxGeometry(0.5,valor,0.25);
    this.geom2.translate(0,-0.25-valor/2,0);

    this.add(new THREE.Mesh(this.geom2,new THREE.MeshBasicMaterial({color:0x00aa00})));

    this.geom3=new THREE.BoxGeometry(0.5,0.5,0.25);
    this.geom3.translate(0,-0.25-valor-0.25,0);

    this.add(new THREE.Mesh(this.geom3,new THREE.MeshBasicMaterial({color:0xaa0000})));

    this.add(this.ejeMesh);
    
    this.penPeq.mover(0,-0.5-valor,0.25);

    this.add(this.penPeq);
  }

  update () {

  }
}

export { penGran }