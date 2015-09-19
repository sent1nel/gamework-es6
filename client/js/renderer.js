import THREE from 'three';

export default class Renderer {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;

    this.isFrameStepping = false;
    this.timeToStep = 0;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 1, 10000);
    this.camera.position.z = 3;
    this.camera.position.y = 1;

    this.clock = new THREE.Clock;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize( this.canvas.width, this.canvas.height );
  }

  addMeshToScene(mesh) {
    this.mesh = mesh;
    this.mesh.rotation.y = Math.PI * -135 / 180;

    this.scene.add(this.mesh);

    this.helper = new THREE.SkeletonHelper( this.mesh );
    this.helper.material.linewidth = 3;
    this.scene.add( this.helper );

    this.helper.visible = true;

    this.animation = new THREE.Animation(
      this.mesh,
      this.mesh.geometry.animations[ 2 ]
    );

    this.animation.play();
  }

  renderFrame() {
    var delta = this.clock.getDelta();
    var scale = 1;
    var stepSize = (!this.isFrameStepping) ? delta * scale: this.timeToStep;

    this.helper.update();
    THREE.AnimationHandler.update(stepSize);

    this.renderer.render(this.scene, this.camera);

    this.timeToStep = 0;
  }
}
