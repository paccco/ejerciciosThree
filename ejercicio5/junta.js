import * as THREE from '../libs/three.module.js'
import {CSG} from '../libs/CSG-v2.js'

class junta extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.animacion=true;

    /**var caja=new THREE.BoxGeometry(5,5,2);
    var caja2=new THREE.BoxGeometry(4.5,4.5,2);
    var cono=new THREE.CylinderGeometry(0.01,0.7,1,12);

    caja.translate(2.5,-2.5,0);
    caja2.translate(2.5,-2.5,0);

    cono.translate(2,-0.5,0);
    
    var mesh1=new THREE.Mesh(caja,new THREE.MeshNormalMaterial());
    var mesh2=new THREE.Mesh(caja2,new THREE.MeshNormalMaterial());
    var mesh3=new THREE.Mesh(cono,new THREE.MeshNormalMaterial());

    var csg = new CSG();

    csg.union([mesh1]);
    csg.subtract([mesh2]);
    csg.subtract([mesh3]);

    this.add(csg.toMesh()); */

    var material = new THREE.MeshNormalMaterial();
    var junta1geom=new THREE.BoxGeometry(2,0.25,1);
    var junta2geom=new THREE.BoxGeometry(2,0.25,1);
    var boqueteGeometria1=new THREE.CylinderGeometry(0.01,0.25,0.5,16);
    var boqueteGeometria2=new THREE.CylinderGeometry(0.01,0.25,0.5,16);

    junta1geom.translate(1.001,0,0.501);

    junta2geom.rotateZ(Math.PI/2);
    junta2geom.translate(0.126,-1,.501);

    boqueteGeometria1.translate(1,0,0.5);

    boqueteGeometria2.rotateZ(Math.PI/2);
    boqueteGeometria2.translate(0.1,-1,0.5);

    var junta1=new THREE.Mesh(junta1geom,material);
    var junta2=new THREE.Mesh(junta2geom,material);
    var boquete1=new THREE.Mesh(boqueteGeometria1,material);
    var boquete2=new THREE.Mesh(boqueteGeometria2,material);

    var csg=new CSG();
    
    csg.union([junta1]);
    csg.union([junta2]);
    csg.subtract([boquete1]);

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