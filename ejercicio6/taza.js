import * as THREE from '../libs/three.module.js'
import {MTLLoader} from '../libs/MTLLoader.js'
import {OBJLoader} from '../libs/OBJLoader.js'

class taza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var materialLoader= new MTLLoader ( ) ;
    var objectLoader = new OBJLoader ( ) ;
    materialLoader.load ('cottage_obj.mtl' ,
      ( materials) => {
        objectLoader.setMaterials (materials) ;
        objectLoader.load ('cottage_obj.obj',
          (object) => {
            this.add ( object ) ;
          } , null , null ) ;
      } );
  }

  createMangoShape(){
    var shape = new THREE.Shape();

    shape.moveTo(-2.5,0);

    shape.quadraticCurveTo(-2,2,-1.5,0);

    shape.quadraticCurveTo(-2,-2,-2.5,0);

    return shape;
  }

  createMangoGeom(){
    var puntos=this.mangoShape.extractPoints(3).shape;
    var geom=new THREE.LatheGeometry(puntos,24,0,Math.PI);

    geom.scale(0.5,0.7,0.5);

    return geom;
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
      //  this.rotar();
  }
}

export { taza }