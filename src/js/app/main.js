import * as THREE from 'three.js';
  import TWEEN from 'tween.js';

  export default class Main {

      constructor(container) {
          this.container = container;
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.container.appendChild(this.renderer.domElement);

          this.geometry = new THREE.BoxGeometry(1,1,1);
          this.material = new THREE.MeshBasicMaterial( {color: 0xa0ff00 });
          this.cube = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.cube);
          this.camera.position.z = 5;
      }
  }
