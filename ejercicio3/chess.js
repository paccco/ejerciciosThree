import { LatheGeometry } from 'three';
import * as THREE from '../libs/three.module.js'

class chess extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.RotacionZ=0;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.elMesh=this.createShape();
    this.geometria=this.createGeometria(24,2*Math.PI);

    this.add(this.geometria);
  }

  createShape(){
    this.chessShape = new THREE.Shape();

    this.chessShape.moveTo(0,0);

    this.chessShape.lineTo(-2,0);

    this.chessShape.lineTo(-2,0.5);

    this.chessShape.quadraticCurveTo(-0.5,2,-0.5,3.5);

    this.chessShape.bezierCurveTo(-0.8,3.6,-0.7,4.1,0,4.1);

    var chessGeometry=new THREE.ShapeGeometry(this.chessShape);

    var out=new THREE.Mesh(chessGeometry,this.material);

    return out;
  }

  createGeometria(resolucion,anguloF){
    var puntos=this.chessShape.extractPoints(6).shape;
    var lathGeom=new LatheGeometry(puntos,resolucion,0,anguloF);

    var out=new THREE.Mesh(lathGeom,this.material);
    
    return out;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      resol:24,
      angFinal: 2*Math.PI
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'resol', 3, 48, 1)
      .name ('Resolucion : ')
      .onChange ( (value) => this.setResolucion(value) );

    folder.add(this.guiControls, 'angFinal', 0, 2*Math.PI, Math.PI/180)
      .name ('Angulo Final : ')
      .onChange ( (value) => this.setAng(value) );
  }

  setResolucion(res){
    this.geometria=this.createGeometria(res,this.guiControls.angFinal);
    this.clear();
    this.add(this.geometria);
  }

  setAng(ang){
    this.geometria=this.createGeometria(this.guiControls.resol,ang);
    this.clear();
    this.add(this.geometria);
  }

  update () {
    //this.setAngulo();
  }
}

export { chess }