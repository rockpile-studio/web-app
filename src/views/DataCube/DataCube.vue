<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as Three from 'three'

  export default {
    name: 'DataCube',
    data () {
      return {
        mesh: null,
        scene: null,
        camera: null,
        renderer: null,
      }
    },
    methods: {
      init() {
        // 创建场景对象scene
        this.scene = new Three.Scene();

        let geometry = new Three.BoxGeometry(100, 100, 100);
        // 创建材质对象
        let material = new Three.MeshLambertMaterial({          color: 0x00ffff
        });
        // 创建网络模型
        let mesh = new Three.Mesh(geometry, material);
        scene.add(mesh); // 将网格模型添加到场景中

        let container = document.getElementById('container')
        const width = container.clientWidth; // 画布宽度
        const height = container.clientHeight; // 画布高度
        const ratio = width / height; // 窗口的宽高比
        const scope = 100; // 三维场景显示范围控制系数，系数越大，显示的范围越大
        // 创建相机对象
        this.camera = new THREE.OrthographicCamera(-scope * ratio, scope * ratio, scope, -scope, 1, 1000);
        this.camera.position.set(800, 300, 200); // 设置相机的位置
        this.camera.lookAt(this.scene.position); // 设置相机方向（指向的场景对象）

        this.mesh = new Three.Mesh(geometry, material)
        this.scene.add(this.mesh)

        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(this.renderer.domElement)
      },
      animate() {
        requestAnimationFrame(this.animate)
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.02
        this.renderer.render(this.scene, this.camera)
      }
    },
    mounted () {
      this.init()
      this.animate()
    }
  }
</script>
<style scoped>
  #container {
    height: 400px;
  }
</style>
