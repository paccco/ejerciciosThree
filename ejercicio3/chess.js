import * as THREE from '../libs/three.module.js'

class chess extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    //this.createGUI(gui,titleGui);

    this.RotacionZ=0;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.chess=this.createShape();

    this.add(this.chess);
  }

  createShape(){
    var chess_ = new THREE.Shape();
    


    chess_.moveTo(0,0);

    chess_.lineTo(-2,0);

    chess_.lineTo(-2,0.5);

    chess_.quadraticCurveTo(-0.5,2,-0.5,3.5);

    chess_.bezierCurveTo(-0.8,3.6,-0.7,4.1,0,4.1);

    var chessGeometry=new THREE.ShapeGeometry(chess_);

    var out=new THREE.Mesh(chessGeometry,this.material);

    return out;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      radTop : 1,
      radBot : 1,
      alt : 3,
      radSeg : 6,
      heightSeg : 1
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'radTop', 1, 5, 0.2)
      .name ('Radio superior : ')
      .onChange ( (value) => this.setRadTop(value) );
    
    folder.add (this.guiControls, 'radBot', 1, 5, 0.2)
      .name ('Radio inferior : ')
      .onChange ( (value) => this.setRadBot(value) );
    
    folder.add (this.guiControls, 'alt', 1, 5, 0.2)
      .name ('Altura : ')
      .onChange ( (value) => this.setHeightSeg(value) );

    folder.add (this.guiControls, 'radSeg', 3, 32, 1)
      .name ('Segmentos raidales : ')
      .onChange ( (value) => this.setRadSeg(value) );
    
    folder.add (this.guiControls, 'heightSeg', 1, 40, 1)
      .name ('Segmentos altura : ')
      .onChange ( (value) => this.setHeightSeg(value) );
  }

  update () {
    //this.setAngulo();
  }
}

export { chess }