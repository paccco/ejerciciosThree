import * as THREE from '../libs/three.module.js'

class taza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.animacion=true;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.tazaHuecoShape=this.createTazaHuecoShape();
    this.tazaHuecoGeom=this.createTazaHueco();

    this.mangoShape=this.createMangoShape();
    this.mangoGeom=this.createMangoGeom();

    var aux=new THREE.ShapeGeometry(this.tazaHuecoShape);

    var taza=new THREE.Mesh(this.tazaHuecoGeom,this.material);
    var mango=new THREE.Mesh(this.mangoGeom,this.material);

    mango.translateX(-1.8);
    mango.translateY(2);
    mango.rotateX(Math.PI/2);

    this.add(taza);
    this.add(mango);
  }

  createTazaHuecoShape(){
    var shape = new THREE.Shape();

    shape.moveTo(0,0);

    shape.lineTo(-2,0);

    shape.lineTo(-2,4);

    shape.lineTo(-1.8,4);

    shape.lineTo(-1.8,0.2);

    shape.lineTo(0,0.2);

    return shape;
  }

  createTazaHueco(){
    var puntos=this.tazaHuecoShape.extractPoints(6).shape;

    var geom=new THREE.LatheGeometry(puntos,24,0,2*Math.PI);

    return geom;
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
    if(this.animacion)
        this.rotar();
  }
}

export { taza }