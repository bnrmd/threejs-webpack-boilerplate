
# Boiler Plate Setup for Three.js and Tween.js.

## webpack 4, babel, webpack-dev-server, ES6 Promises and much more.


##### Created on *June 2018*

1. Install nvm (Node Version Manager) - *very worth it!*

	Linux:
	```bash
	$> curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
	$> nvm --version
	$> # 0.33.11
	```
	Windows: *download latest stable release (1.1.5)* - June 2018
	```html
	https://github.com/coreybutler/nvm-windows/releases
	# select nvm-setup.zip
	```
	```bash
	$> nvm --version
	# 0.33.11
	```

2. Install node.js *lastest stable relase as of June 2018 is 8.11.2*

	Linux and Windows:
	```bash
	$> nvm install 8.11.2
	# view list of installed node.js
	$> nvm list
	```

3. Create your workspace

	Linux:
	```bash
	$> mkdir -p my-project-name/src/{css,assets,js/{app,data,utils}} && cd my-project-name
	$> # webpack 4 expects the entry point to be src/index.js
	$> # a better name/location for the entry point would be src/js/app.js (hence same as src/index.js)
	$> # src/js/app/main.js is where Three.js stuff starts
	$> touch src/index.js src/js/app.js src/js/app/main.js
	$> #display the tree structure
	$> tree
	.
	|- src
	   |-- assets
		 |-- css
		 |-- index.js
		 |-- js
		     |-- app
				 |   |-- main.js
				 |-- app.js
				 |-- data
				 |-- utils
	```
	Windows:
	```css
	Dear Windows, you are not worth my time; but should be very similar to linux :-p
	```

4. Initialize your package.json

	```bash
	$> npm init -y
	```

5. Install all dev dependencies

	```bash
	$> npm i webpack webpack-cli webpack-dev-server --save-dev
	$> npm i babel-core babel-loader babel-preset-env --save-dev
	$> npm i copyfiles eslint node-sass npm-run-all rimraf --save-dev
	```

6. Install all non-dev dependencies

	```bash
	$> npm i three.js tween.js es6-promise --save
	```

7. Add a `.babelrc` file with the following content:

	```json
	{
	  "presets": [
			"env"
	  ]
	}
	```

8. Tweak your `scripts` section of your  `package.json` file.

	```json
	"main": "src/js/app.js",
  "scripts": {
		"dev": "webpack-dev-server --mode development --progress --hot --open",
		"build": "webpack --mode production --progress"
  },		
	```


11. Create a file webpack.config.js and add the following to it

	```bash
	$> vi webpack.config.js
	```

	```javascript
	const  path = require('path');

	module.exports = {
		entry: './src/js/app.js',
		output: {
			path: path.join(__dirname, 'dist'),
			publicPath: "./dist/",
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				}
			]
		},
		devtool: 'eval',
		devServer: {
			publicPath: "/",
			contentBase: "./dist",
			hot: true,
			watchContentBase: true
		}
	}
	```

12. Now you can write ES6 into src/js/app.js and any other js files from src/**

13. HTML Entry point:  `./dist/index.html`

	```html
	<html>
	<head>
	  <style>
	    canvas { width: 100%; height: 100% }
	  </style>
	</head>
	<body>
		<div id="appContainer"></div>
		<script src="bundle.js"></script>
	</body>
	</html>
	```

14. Javascript Entry point: `./src/js/app.js` (as defined within `webpack.config.js`)

	```javascript
	import Config from './data/config';
	import Main from './app/main';

	let app;

	function init() {
	    const container = document.getElementById('appContainer');
	    app = new Main(container);
	}

	function animate() {
		requestAnimationFrame(animate);
		app.renderer.render(app.scene, app.camera);
		app.cube.rotation.x += 0.01;
		app.cube.rotation.y += 0.03;
	}

	init();

	animate();
	```

15. The base of where THREE.js starts: (`./src/js/app/main.js`)

	```javascript

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
	```

16. The end
