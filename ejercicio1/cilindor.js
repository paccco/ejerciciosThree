import * as THREE from '../libs/three.module.js'

class cilindro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la grapadora
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.RotacionZ=0;

    this.material = new THREE.MeshPhongMaterial({color: 0xCF0000});

    this.cilindro=this.createCilindro(1,1,3,6,1);

    this.add(this.cilindro);
  }

  createCilindro(radTop, radBot, alt, radSeg, heightSeg){
    var cilindro_ = new THREE.Object3D();
    var cilindroBase = new THREE.Mesh(new THREE.CylinderGeometry(radTop,radBot,alt,radSeg,heightSeg),this.material);

    cilindro_.position.set(0,4,0);
    cilindro_.add(cilindroBase);

    return cilindro_;
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

  setAngulo () {
    this.RotacionZ+=0.01;
    this.cilindro.rotation.z=this.RotacionZ;
  }

  setRadTop(valor){
    this.clear();
    this.cilindro=this.createCilindro(valor,this.guiControls.radBot,this.guiControls.alt,this.guiControls.radSeg,this.guiControls.heightSeg);
    this.cilindro.rotation.z=this.RotacionZ;
    this.add(this.cilindro);
  }

  setRadBot(valor){
    this.clear();
    this.cilindro=this.createCilindro(this.guiControls.radTop,valor,this.guiControls.alt,this.guiControls.radSeg,this.guiControls.heightSeg);
    this.cilindro.rotation.z=this.RotacionZ;
    this.add(this.cilindro);
  }

  setAlt(valor){
    this.clear();
    this.cilindro=this.createCilindro(this.guiControls.radTop,this.guiControls.radBot,valor,this.guiControls.radSeg,this.guiControls.heightSeg);
    this.cilindro.rotation.z=this.RotacionZ;
    this.add(this.cilindro);
  }

  setRadSeg(valor){
    this.clear();
    this.cilindro=this.createCilindro(this.guiControls.radTop,this.guiControls.radBot,this.guiControls.alt,valor,this.guiControls.heightSeg);
    this.cilindro.rotation.z=this.RotacionZ;
    this.add(this.cilindro);
  }

  setHeightSeg(valor){
    this.clear();
    this.cilindro=this.createCilindro(this.guiControls.radTop,this.guiControls.radBot,this.guiControls.alt,this.guiControls.radSeg,valor);
    this.cilindro.rotation.z=this.RotacionZ;
    this.add(this.cilindro);
  }

  update () {
    this.setAngulo();
  }
}

export { cilindro }