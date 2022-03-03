node_modules文件夹：项目依赖文件夹

public文件夹：一般放置静态资源文件（图片），webpack打包时，原封不动打包到dist文件夹中

src文件夹：程序源代码文件夹
    assets文件夹：一般放置静态文件（多组件共用），该资源中的文件在webpack打包时，webpack会将静态资源当作模块，打包进js文件中
    components文件夹：放置非路由组件（全局组件）
    App.vue：根组件
    main.js：入口文件，最先执行的文件

babel.config.js：babel配置文件

package.json：描述项目及项目所依赖的模块信息

package-lock.json：从 npm 5 版本之后只要使用 npm install 命令下载，就会自动生成 package-lock.json 文件，记录了node_modules目录下所有模块的具体来源和版本号以及其他的信息

项目运行时，配置浏览器自动打开
package.json

```json
"scripts": {
  "serve": "vue-cli-service serve --open",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
}
```

eslint校验功能关闭

vue.config.js

```js
module.exports={
  lintOnSave:false
}
```

配置路径别名
jsconfig.json

```json
{
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
                "@/*": ["src/*"]
            }
        },
        "exclude": ["node_modules", "dist"]
    }
```

安装less和less-loader，注意less-loader版本，这里使用的是版本5

使用less样式 => <style lang="less"></style>

清除默认样式，在index.html中引入对应css文件（在vue文件中通过import引入css与在html中通过link标签引入是否有区别）

组件中使用到的静态资源放在对应组件目录下？

路由需要用到vue-router，npm i vue-router

路由组件放pages目录，非路由组件放components目录

一般路由配置文件放在src/router目录

路由基本使用：
html文件：

```vue
<!-- 使用 router-link 组件来导航. -->
<!-- 通过传入 `to` 属性指定链接. -->
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<router-link to="/foo">Go to Foo</router-link>
<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
```

js文件：
    1.导入 Vue 和 VueRouter ，要调用 Vue.use(VueRouter)
    2.定义（路由）组件

```js
const Foo = { template: '<div>foo</div>' }
```

​	3.定义路由 routes ，每个路由应该映射一个组件

```js
const routes = [
  { path: '/foo', component: Foo },
]
```

​    4.创建 router 实例，然后传 routes 配置

```js
const router = new VueRouter({
  routes
})
```


​    5.创建和挂载根实例

```js
const app = new Vue({
  router
}).$mount('#app')
```


注：通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由

$route:一般用于获取路由信息【路径、query、params等】
$router:一般进行编程式导航，进行路由跳转【push、replace等】

路由跳转：
    声明式导航 router-link，必须要有to属性
    编程式导航通过组件实例的$router的push、replace方法

路由传参：
    使用params参数有两种形式——字符串形式和对象形式，对象形式必须使用name且path和params不能一起使用

​	要求传递params参数，但是没传，跳转路径会出现问题（少了对应的路由路径）

​    指定params参数可传可不传，配置路由时在占位符后加【?】

​	params参数可传可不传，如果传递空字符串，路径会出问题（少了对应的路由路径），使用undefined解决传递空字符串的情况

```js
this.$router.push({
  name:'search',
  params:{
    keyword:this.keyword.trim()||undefined//this.keyword.trim()可能为空字符串
  },
  query:{
    k:this.keyword.trim()?this.keyword:'没有传递参数'
  }
})
```



#### 路由组件可以传递props参数吗（不常用，作用就是组件在使用起来方便）

答：可以。props的值为布尔值true时，表示把接收到的所有params参数传递给对应组件（只会传递params参数）；当props的值为对象时，该对象中的键值对会通过props传递给组件，表示额外传递给组件一些props；当那个props的值为函数时，可以将params参数和query参数通过props传递给路由组件，该函数默认接受一个参数$route，需要返回一个对象。路由组件需要声明接收！！！

#### 编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误

通过`router.push(location, onComplete?, onAbort?)`可以解决该问题，`onComplete`表示成功回调，`onComplete`表示失败回调。不好的地方是，每次使用`router.push`都需要加上成功和失败回调，治标不治本。

重写`push`方法

```js
let originPush=VueRouter.prototype.push
VueRouter.prototype.push=function(location,onComplete,onAbort){
  if(onComplete&&onAbort){
    originPush.call(this,location,onComplete,onAbort)
  }
  else{
    originPush.call(this,location).then(()=>{}).catch(()=>{})
  }
}
```

如果单个组件在多个组件中重复使用，可以将其注册为全局组件，全局组件的好处是：只需注册一次，可以在任意其他组件中使用（且无需再引入）

#### 二次封装axios

请求拦截器：在发请求之前处理一些业务

响应拦截器：在服务器数据返回之后处理一些业务

#### 项目中的api文件夹（放axios请求）

index.js用于统一接口：项目很小的时候，可以直接在生命周期中发送请求；项目很大的时候，需要进行接口统一管理

request.js用于二次封装axios

#### *跨域

#### 进度条使用nprogress

配合拦截器一起使用

#### Vuex的使用

#### 动态样式

#### 函数的防抖和节流

使用lodash，按需引入，使用时注意不能用箭头函数

防抖：在触发事件后的规定时间内，如果没有再次触发，则执行回调函数；反之，重新计时（频繁触发，只执行一次）

节流：在触发事件后的规定时间内，不管有没有再次触发，都会按时执行（理解为技能cd，在规定的时间范围内不会重复触发），把频繁的操作变成少量的操作

#### import倒入包时路径的查找规则

#### 三级联动路由跳转采用编程式路由跳转

使用声明式路由跳转的话，由于router-link是组件，创建的时候需要使用new创建组件实例（还要把虚拟dom转化为真实dom），数量较多且消耗内存，会出现卡顿的现象

使用编程式路由跳转并且采用事件委托，如果不采用事件委托的话，每一个a标签都会绑定一个事件，性能较差

#### Mock数据

使用mockjs，生成随机数据，拦截ajax请求

使用步骤：

1.src目录新建mock文件夹

2.准备JSON数据

3.将mock需要的图片数据放到public文件夹

4.创建mockServer.js通过mockjs实现模拟数据

5.在入口文件中引入mockServer.js

#### Swiper插件的使用

1.引入相应的依赖包js和css

2.书写页面结构

3.初始化swiper实例，添加功能

#### $nextTick的使用

当数据改变后，基于更新后的新dom进行某些操作

在修改数据之后立即使用它，然后等待 DOM 更新。将回调延迟到下次 DOM 更新循环之后执行。

可以保证页面中的结构一定是有的，经常和很多插件一起使用【都需要保证dom存在的情况】

使用场景：异步请求数据，根据数据渲染后的结构进行某些操作时，可以使用 watch+nextTick

#### 组件通信方式（面试频率高）

props：用于父子组件之间通信

自定义事件：@on @emit可以实现子给父通信

全局事件总线：$bus 全能

pubsub-js：vue中几乎不用 全能

插槽

vuex

#### 按下回车键搜索需要在input上绑定keyup.enter事件

####  axios中如果请求传递参数时，如果参数值为undefined，则不会发送该字段

#### 全局事件总线
