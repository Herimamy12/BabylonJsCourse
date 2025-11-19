var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

var scene = new BABYLON.Scene(engine);

// Ajouter une caméra
var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Ajouter une lumière
var light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

// Ajouter un objet 3D (ex : sphère)
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);

// Rendu de la scène
engine.runRenderLoop(function () {
    scene.render();
});

// Ajuster la taille de la scène en fonction de la taille de la fenêtre
window.addEventListener('resize', function () {
    engine.resize();
});