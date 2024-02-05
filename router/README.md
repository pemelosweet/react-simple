# BrowserRouter方法：
function BrowserRouter(children){
   1 获取browser的history实例，通过useRef存起来
   2 申明一个useState来存实例上的路径和动作
   3 通过useEffectLayout监听记录实例上的路径和动作
   4  返回 Router包裹的children结构
}
# Router的方法
    使用useContext包裹传入的children，将监听的路径和history传给所有的子组件
