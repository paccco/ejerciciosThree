import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class junta extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.animacion=true;

    var material = new THREE.MeshNormalMaterial();

    var junta1geom=new THREE.BoxGeometry(2,0.25,1);

    junta1geom.translate(1.001,0,0.501);

    var junta2geom=new THREE.BoxGeometry(2,0.25,1);

    junta2geom.rotateZ(Math.PI/2);
    junta2geom.translate(0.126,-1,.501);

    var boqueteGeometria1=new THREE.CylinderGeometry(0.000000001,0.25,0.5,16);

    boqueteGeometria1.translate(1,0,0.5);

    var boqueteGeometria2=new THREE.CylinderGeometry(0.000000001,0.25,0.5,16);

    boqueteGeometria2.rotateZ(Math.PI/2);
    boqueteGeometria2.translate(0.1,-1,0.5);

    var junta1=new THREE.Mesh(junta1geom,material);
    var junta2=new THREE.Mesh(junta2geom,material);

    var boquete1=new THREE.Mesh(boqueteGeometria1,material);
    var boquete2=new THREE.Mesh(boqueteGeometria2,material);

    var csg=new CSG();
    
    /*var material = new THREE. MeshNormalMaterial ( ) ;

    var cilExt = new THREE. CylinderGeometry ( 5 , 5 , 10 , 24 , 1 ) ;
    var cilInt = new THREE. CylinderGeometry ( 4.7 , 4.7 , 10 , 24 , 1 ) ;
    var toro = new THREE. TorusGeometry ( 3 , 0.5 , 24 , 24 ) ;

    cilInt.translate( 0 , 0.3 , 0 ) ;
    toro.translate(-5, 0 , 0 ) ;

    var cilExtMesh = new THREE.Mesh ( cilExt , material ) ;
    var cilIntMesh = new THREE.Mesh ( cilInt , material ) ;
    var toroMesh = new THREE.Mesh ( toro , material ) ;
    var csg = new CSG( ) ;
    csg . union ( [ cilExtMesh , toroMesh ] ) ;
    csg . subtract ( [ cilIntMesh] ) ;*/

    var resul=csg.toMesh();

    this.add(resul);
    //this.add(boquete1);
    //this.add(boquete2);
  }

  createGUI (gui,titleGui) {
    this.guiControls = {
      animacionOnOff:true
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'animacionOnOff')
      .name ('Animacion : ')
      .onChange ( (value) => this.onoffani(value));
  }

  rotar(){
    this.rotation.y+=0.01;
    this.rotation.x+=0.01;
  }

  onoffani(valor){
    this.animacion=valor;
  }

  update () {
    //if(this.animacion)
        //this.rotar();
  }
}

export { junta }