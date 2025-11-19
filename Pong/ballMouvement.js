var createScene = function() {
    var scene = new BABYLON.Scene(engine);

    // Caméra
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(57.3), 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.inputs.attached.keyboard.detachControl();

    // Lumière
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    // Joueurs
    var player1 = BABYLON.MeshBuilder.CreateBox("player1", { width: 1, height: 0.35, depth: 0.05 }, scene);
    player1.position.y = 0.22;
    player1.position.z = -3.5;

    var player2 = BABYLON.MeshBuilder.CreateBox("player2", { width: 1, height: 0.35, depth: 0.05 }, scene);
    player2.position.y = 0.22;
    player2.position.z = 3.5;

    // Bordures
    var leftBorder = BABYLON.MeshBuilder.CreateBox("leftBorder", { width: 0.05, height: 0.175, depth: 7.5 }, scene);
    leftBorder.position.set(2.25, 0.0875, 0);

    var rightBorder = BABYLON.MeshBuilder.CreateBox("rightBorder", { width: 0.05, height: 0.175, depth: 7.5 }, scene);
    rightBorder.position.set(-2.25, 0.0875, 0);

    // Balle
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.2 }, scene);
    sphere.position.y = 0.1;

    // Sol
    var ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 4.5, height: 0.0001, depth: 7.5 }, scene);

    // Matériaux
    var borederMaterial = new BABYLON.StandardMaterial("borederMaterial", scene);
    borederMaterial.diffuseColor = BABYLON.Color3.Blue();
    ground.material = borederMaterial;
    leftBorder.material = borederMaterial;
    rightBorder.material = borederMaterial;

    // États des touches
    let keysPressed = {
        leftPlayer1: false,
        rightPlayer1: false,
        leftPlayer2: false,
        rightPlayer2: false
    };

    window.addEventListener("keydown", function(event) {
        const key = event.keyCode || event.which;
        if (key === 37 || key === 38) keysPressed.leftPlayer1 = true;
        if (key === 39 || key === 40) keysPressed.rightPlayer1 = true;
        if (key === 65 || key === 87) keysPressed.leftPlayer2 = true;
        if (key === 68 || key === 83) keysPressed.rightPlayer2 = true;
    });

    window.addEventListener("keyup", function(event) {
        const key = event.keyCode || event.which;
        if (key === 37 || key === 38) keysPressed.leftPlayer1 = false;
        if (key === 39 || key === 40) keysPressed.rightPlayer1 = false;
        if (key === 65 || key === 87) keysPressed.leftPlayer2 = false;
        if (key === 68 || key === 83) keysPressed.rightPlayer2 = false;
    });

    // Vitesse initiale de la balle
    let ballVelocity = new BABYLON.Vector3(0.05, 0, 0.07);

    // Fonction pour reset la balle
    function resetBall(direction = 1) {
        sphere.position.set(0, 0.1, 0);
        ballVelocity = new BABYLON.Vector3(
            (Math.random() > 0.5 ? 0.05 : -0.05),
            0,
            0.07 * direction
        );
    }

    // Mise à jour à chaque frame
    scene.onBeforeRenderObservable.add(function() {
        // Déplacement joueurs
        if (keysPressed.leftPlayer1 && player1.position.x > -1.5) player1.position.x -= 0.1;
        if (keysPressed.rightPlayer1 && player1.position.x < 1.5) player1.position.x += 0.1;
        if (keysPressed.leftPlayer2 && player2.position.x > -1.5) player2.position.x -= 0.1;
        if (keysPressed.rightPlayer2 && player2.position.x < 1.5) player2.position.x += 0.1;

        // Déplacement balle
        sphere.position.addInPlace(ballVelocity);

        // Collision avec les murs gauche/droite
        if (sphere.position.x < -2.0 || sphere.position.x > 2.0) {
            ballVelocity.x *= -1;
        }

        // Collision avec player1
        if (sphere.intersectsMesh(player1, false)) {
            ballVelocity.z = Math.abs(ballVelocity.z); // renvoie vers player2
            // effet selon position de contact
            ballVelocity.x += (sphere.position.x - player1.position.x) * 0.05;
        }

        // Collision avec player2
        if (sphere.intersectsMesh(player2, false)) {
            ballVelocity.z = -Math.abs(ballVelocity.z); // renvoie vers player1
            ballVelocity.x += (sphere.position.x - player2.position.x) * 0.05;
        }

        // Vérification si un joueur marque
        if (sphere.position.z < -4) {
            resetBall(1); // player2 marque
        }
        if (sphere.position.z > 4) {
            resetBall(-1); // player1 marque
        }
    });

    return scene;
};

export default createScene;
