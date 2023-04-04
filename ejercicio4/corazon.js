import * as THREE from '../libs/three.module.js'

class heart extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.animacion=true;
    this.rotacionY=0;
    this.rotacionStaticaZ=0;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.forma=this.createShape();
    this.objetoMesh=this.createObjetoMesh();

    this.add(this.objetoMesh);
  }

  createShape(){
    this.heartShape = new THREE.Shape();

    this.heartShape.moveTo(0,0.2);

    this.heartShape.bezierCurveTo(-0.25,0.7,-0.75,0.7,-1,0);

    this.heartShape.lineTo(0,-1.2);

    this.heartShape.lineTo(1,0);

    this.heartShape.bezierCurveTo(0.75,0.7,0.25,0.7,0,0.2);

    var heartGeometry=new THREE.ShapeGeometry(this.heartShape);

    var out=new THREE.Mesh(heartGeometry,this.material);

    return out;
  }

  createObjetoMesh(){
    const extrudeSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 1
    };

    this.extrudeGeom=new THREE.ExtrudeGeometry(this.heartShape,extrudeSettings);
    
    var out=this.transformaciones();

    return out;
  }

  transformaciones(){
    this.extrudeGeom.rotateY(this.rotacionY);

    const distanciaX=4;

    this.extrudeGeom.translate(distanciaX*Math.cos(this.rotacionStaticaZ),distanciaX*Math.sin(this.rotacionStaticaZ),0);

    var out=new THREE.Mesh(this.extrudeGeom,this.material);
    
    return out;
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
    this.clear();

    this.rotacionY+=0.01;
    this.rotacionStaticaZ+=0.01;

    this.objetoMesh=this.createObjetoMesh();
    this.add(this.objetoMesh);
  }

  onoffani(valor){
    this.animacion=valor;
  }

  update () {
    if(this.animacion)
      this.rotar();
  }
}

export { heart }