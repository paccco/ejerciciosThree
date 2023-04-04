import * as THREE from '../libs/three.module.js'

class coraA extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.animacion=true;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.forma=this.createShape();
    this.objetoMesh=this.createObjetoMesh();

    this.add(this.objetoMesh);
  }

  createShape(){
    this.coraAShape = new THREE.Shape();

    this.coraAShape.moveTo(0,0.2);

    this.coraAShape.bezierCurveTo(-0.25,0.7,-0.75,0.7,-1,0);

    this.coraAShape.lineTo(0,-1.2);

    this.coraAShape.lineTo(1,0);

    this.coraAShape.bezierCurveTo(0.75,0.7,0.25,0.7,0,0.2);

    var coraAGeometry=new THREE.ShapeGeometry(this.coraAShape);

    var out=new THREE.Mesh(coraAGeometry,this.material);

    return out;
  }

  createObjetoMesh(){

    var inicio=new THREE.Vector3(0,-2,0);

    var p1=new THREE.Vector3(0,-1,-0.5);

    var p2=new THREE.Vector3(0,1,0.5);

    var fin=new THREE.Vector3(0,2,0);

    var pts=[inicio,p1,p2,fin];

    var path=new THREE.CatmullRomCurve3(pts);

    var options={steps:50 ,curveSegments:4, extrudePath:path};

    var extrudeGeom=new THREE.ExtrudeGeometry(this.coraAShape,options);

    var out=new THREE.Mesh(extrudeGeom,this.material);
    
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

export { coraA }