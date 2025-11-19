// Création de la scène
var createScene = function() {
    var scene = new BABYLON.Scene(engine);

    // Création de la caméra et attachement au canvas
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(57.3), 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.inputs.attached.keyboard.detachControl();

    // Création de l'éclairage
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    // Création des utilisateurs (player1 et player2)
    var player1 = BABYLON.MeshBuilder.CreateBox("player1", { width: 1, height: 0.35, depth: 0.05 }, scene);
    player1.position.y = 0.22;
    player1.position.z = -3.5;

    var player2 = BABYLON.MeshBuilder.CreateBox("player2", { width: 1, height: 0.35, depth: 0.05 }, scene);
    player2.position.y = 0.22;
    player2.position.z = 3.5;

    // Création des bordures gauche et droite
    var leftBorder = BABYLON.MeshBuilder.CreateBox("leftBorder", { width: 0.05, height: 0.175, depth: 7.5 }, scene);
    leftBorder.position.set(2.25, 0.0875, 0);

    var rightBorder = BABYLON.MeshBuilder.CreateBox("rightBorder", { width: 0.05, height: 0.175, depth: 7.5 }, scene);
    rightBorder.position.set(-2.25, 0.0875, 0);

    // Création d'une sphère
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.2 }, scene);
    sphere.position.y = 0.1;

    // Création du sol
    var ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 4.5, height: 0.0001, depth: 7.5 }, scene);

    // Materiel du bordure
    var borederMaterial = new BABYLON.StandardMaterial("borederMaterial", scene);
    borederMaterial.diffuseColor = BABYLON.Color3.Blue();
    var borderTexture = new BABYLON.Texture(Assets.textures.checkerboard_basecolor_png.path, scene);
    borederMaterial.diffuseTexture = borderTexture;
    ground.material = borederMaterial;
    leftBorder.material = borederMaterial;
    rightBorder.material = borederMaterial;

    // Définition des états des touches
    let keysPressed = {
        leftPlayer1: false,  // Flèche gauche ou haut pour player1
        rightPlayer1: false, // Flèche droite ou bas pour player1
        leftPlayer2: false,  // A ou W pour player2
        rightPlayer2: false  // D ou S pour player2
    };

    // Gestion des événements de touche enfoncée
    window.addEventListener("keydown", function(event) {
        const key = event.keyCode || event.which;

        if (key === 37 || key === 38) keysPressed.leftPlayer1 = true;  // Flèches gauche ou haut
        if (key === 39 || key === 40) keysPressed.rightPlayer1 = true; // Flèches droite ou bas
        if (key === 65 || key === 87) keysPressed.leftPlayer2 = true;  // A ou W
        if (key === 68 || key === 83) keysPressed.rightPlayer2 = true; // D ou S
    });

    // Gestion des événements de touche relâchée
    window.addEventListener("keyup", function(event) {
        const key = event.keyCode || event.which;

        if (key === 37 || key === 38) keysPressed.leftPlayer1 = false;
        if (key === 39 || key === 40) keysPressed.rightPlayer1 = false;
        if (key === 65 || key === 87) keysPressed.leftPlayer2 = false;
        if (key === 68 || key === 83) keysPressed.rightPlayer2 = false;
    });

    // Mise à jour des positions des joueurs à chaque frame
    scene.onBeforeRenderObservable.add(function() {
        // Déplacement de player1 (gauche/droite)
        if (keysPressed.leftPlayer1 && player1.position.x > -1.5) player1.position.x -= 0.1;
        if (keysPressed.rightPlayer1 && player1.position.x < 1.5) player1.position.x += 0.1;

        // Déplacement de player2 (gauche/droite)
        if (keysPressed.leftPlayer2 && player2.position.x > -1.5) player2.position.x -= 0.1;
        if (keysPressed.rightPlayer2 && player2.position.x < 1.5) player2.position.x += 0.1;
    });

    // Retour de la scène
    return scene;
};

export default createScene;

