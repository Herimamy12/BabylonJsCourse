import { ArcRotateCamera, Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Texture, Tools, Vector3 } from "@babylonjs/core";

export class StandardMaterials {
    scene: Scene
    engine: Engine

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true)
        this.scene = this.CreateScene()


        this.engine.runRenderLoop(()=>{
            this.scene.render()
        })
    }


    CreateScene(): Scene {
        const scene = new Scene(this.engine)
        // const camera = new FreeCamera("camera", new Vector3(0, 2, -8), this.scene)
        // camera.attachControl()
        // camera.speed = 0.25
        const camera = new ArcRotateCamera("camera", Tools.ToRadians(0), Tools.ToRadians(57.3), 10, new Vector3(0, 2, -8), this.scene)
        camera.attachControl();
        camera.speed = 0.25

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene)
        hemiLight.intensity = 0.7

        const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene);

        const ball = MeshBuilder.CreateSphere("ball", {diameter: 5}, this.scene)
        ball.position = new Vector3(0, 2.5, 0)

        ground.material = this.CreateGroundMaterials()
        ball.material = this.CreateBallMaterials()

        return scene
    }

    CreateGroundMaterials(): StandardMaterial {
        const groundMat = new StandardMaterial("groundMat", this.scene)
        const aoTex = new Texture("./textures/stone/stone_ao.jpg", this.scene)
        const normTex = new Texture("./textures/stone/stone_nor.jpg", this.scene)
        const specTex = new Texture("./textures/stone/stone_spec.jpg", this.scene)
        const diffuseTex = new Texture("./textures/stone/stone_diff.jpg", this.scene)

        groundMat.bumpTexture = normTex
        groundMat.ambientTexture = aoTex
        groundMat.specularTexture = specTex
        groundMat.diffuseTexture = diffuseTex

        const arrayTextures: Texture[] = []
        arrayTextures.push(aoTex)
        arrayTextures.push(normTex)
        arrayTextures.push(specTex)
        arrayTextures.push(diffuseTex)

        arrayTextures.forEach(element => {
            element.uScale = 4
            element.vScale = 4
        });

        return groundMat
    }

    CreateBallMaterials(): StandardMaterial {
        const ballMat = new StandardMaterial("ballMat", this.scene)
        const aoTex = new Texture("./textures/metal/metal_ao.jpg", this.scene)
        const normTex = new Texture("./textures/metal/metal_nor.jpg", this.scene)
        const specTex = new Texture("./textures/metal/metal_spec.jpg", this.scene)
        const diffuseTex = new Texture("./textures/metal/metal_diff.jpg", this.scene)

        ballMat.bumpTexture = normTex
        ballMat.ambientTexture = aoTex
        ballMat.specularTexture = specTex
        ballMat.diffuseTexture = diffuseTex

        const arrayTextures: Texture[] = []
        arrayTextures.push(aoTex)
        arrayTextures.push(normTex)
        arrayTextures.push(specTex)
        arrayTextures.push(diffuseTex)

        arrayTextures.forEach(element => {
            element.uScale = 2
            element.vScale = 2
        });

        ballMat.invertNormalMapX = true
        ballMat.invertNormalMapY = true
        ballMat.specularPower = 1

        return ballMat
    }
}
