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

在样式中也可以使用@【src别名】，使用时要在前面加~，注意中英文

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

节流：在触发事件后的规定时间内，不管有没有再次触发，都会按时执行（理解为技能cd，在规定的时间范围内不会重复触发），把频繁的操作变成少量的操作，例如频繁点击购物车的减按钮，滚动事件 

#### import倒入包时路径的查找规则

#### 三级联动路由跳转采用编程式路由跳转

使用声明式路由跳转的话，由于router-link是组件，创建的时候需要使用new创建组件实例（还要把虚拟dom转化为真实dom），数量较多且消耗内存，会出现卡顿的现象

使用编程式路由跳转并且采用事件委托+自定义属性，如果不采用事件委托的话，每一个a标签都会绑定一个事件，性能较差

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

#### 子传父，自定义事件

#### 分页器

当前页码

每页展示数据数量

数据总条数

分页连续页码个数

#### 开发页面步骤 

静态页面

接口

vuex

动态效果

#### js获取容器的大小

`dom.style.width/height`只能获取内联样式的宽高，如果节点的样式是在style标签中或者外联的css文件中设置的话，则无法获取

`dom.offsetWidth/offsetHeight`常用，获取的宽高包含border，且不带单位

pageX: 页面X坐标位置
pageY: 页面Y坐标位置

screenX: 屏幕X坐标位置
screenY: 屏幕Y坐标位置

clientX: 鼠标的坐标到页面左侧的距离
clientY: 鼠标的坐标到页面顶部的距离

clientWidth：可视区域的宽度
clientHeight：可视区域的高度

offsetX：鼠标坐标到元素的左侧的距离
offsetY：鼠标坐标到元素的顶部的距离（鼠标到 offsetParent 节点的距离，offsetParent是指当前元素最近的使用 position 不为 static 的祖先节点，如果没有使用 position 的祖先节点，它的值将是 body 节点）

offsetLeft：该元素外边框距离包含元素内边框左侧的距离
offsetTop：该元素外边框距离包含元素内边框顶部的距离

offsetWidth: width + padding-left + padding-right + border-left + border-right
offsetHeight: height + padding-top + padding-bottom + border-top + border-bottom

#### 放大镜

1.准备一个容器，设置宽高，相对定位；

2.容器里面放一张图片（设置宽高100%），一个容器（用于触发事件，完全覆盖在图片上面，宽高100%，绝对定位，左上偏移量为0），一个遮罩层（用于显示放大的区域，绝对定位，默认不显示，），一个容器（用于预览放大后的图片，设置宽高为图片大小，绝对定位，默认不显示，超出的部分隐藏，并设置左上偏移量，容器内部放一张图片，大小为放大的倍数，绝对定位，并设置左上偏移量为0）

3.在触发事件的容器上绑定mousemove事件，回调函数中设置遮罩层的左上偏移量，同时设置预览容器中的图片的左上偏移量（注意：左上偏移量要乘上负的倍数）

#### a标签中href="javascript:"的几种用法

`a href="javascript:void(0);" onclick="js_method()"`，onclick方法负责执行js函数，而void是一个操作符，void(0)返回undefined，地址不发生跳转，这种方法不会直接将js方法暴露在浏览器的状态栏。

`a href="javascript:;" onclick="js_method()"`,这种方法跟上一种类似，区别只是执行了一条空的js代码。

`a href="#" onclick="js_method()"`，#是标签内置的一个方法，代表top的作用。所以用这种方法点击后网页后返回到页面的最顶端。

`a href="#" onclick="js_method();return false;"`，这种方法点击执行了js函数后return false，页面不发生跳转，执行后还是在页面的当前位置。

#### href="#"的作用

a中href="#"表示回到最顶部。如果当前页面中需要滚动的话，那么用这种方式就可以直接回到顶部。

#### href="URL"的作用

URL为绝对URL： 此时指向另一个站点，比如href="http://www.baidu.com",那么点击时就会直接跳转到这个链接的页面。

URL为相对URL：此时指向站点内的某个文件，比如href="/test.doc"，那么点击时就会直接下载文件。

锚URL：此时指向页面中的锚，比如href="#top"，那么点击时就会到当前页面中id="top"的这个锚点，实现当前页面的所谓跳转。用的最多就是在可滚动页面中，添加菜单，可以直接回到页面中的某个部分的内容。

#### 路由组件之间传惨

简单参数：query，params，props

复杂参数：query（可以先将参数序列化后传递JSON.stringify()，接收到后通过JSON.parse()解析，刷新后也正常）【无需序列化也可以，只是地址栏显示不同，同时刷新数据将消失】，浏览器存储

#### 浏览器存储

只能存储字符串

本地存储localStorage：持久化，存储上限5m

会话存储sessionStorage：非持久化，会话结束（在关闭窗口或标签页之后将会删除这些数据）数据消失 

#### Token

令牌，作为用户的唯一标示，由后端返回

注册：通过数据库存储用户的信息

登陆：为了区分用户，服务器返回token【令牌：唯一标志符】，一般登陆成功后，只会返回token（不会返回其他用户信息），前端进行持久化存储（如果使用vuex的话，注意vuex存储数据不是持久化的），用户信息需要通过token找服务器获取

#### input各种事件

1.onfocus  当input 获取到焦点时触发；

2.onblur  当input失去焦点时触发，注意：这个事件触发的前提是已经获取了焦点再失去焦点的时候才会触发该事件，可以用于判断标签为空；

3.onchange 当input失去焦点并且它的value值发生变化时触发；

4.onkeydown 按下按键时的事件触发；

5.onkeyup 当按键抬起的时候触发的事件；

6.onclick  主要是用于 input type=button，input作为一个按钮使用时的鼠标点击事件；

7.onselect  当input里的内容文本被选中后执行，只要选择了就会触发，不是全部选中；

8.oninput  当input的value值发生变化时就会触发，（与onchange的区别是不用等到失去焦点就可以触发了）。

#### Promise相关

#### 共用的静态资源可以放在assets中，自用的静态资源可以放在对应的组件目录下

public中的资源会原封不动的打包，引用publc中的资源要使用绝对路径

#### 行内样式

```vue
<template>
	<div style="width:20px;height:40px"></div>	
</template>
```

#### form表单具有默认事件

表单的数据会提交并跳转到action的地址，当需要取消默认行为时，可以使用事件修饰符.prevent

#### 刷新之后退出登陆的原因

登陆时会发送请求获取token并存储进vuex，之后会跳转至首页，首页会根据token再次获取用户信息并进行显示。刷新后，由于并没有再次发送登陆请求获取token，所以token为空串，随之根据token获取用户信息也不会成功。

解决方法：获取token之后进行持久化存储，设置token的初始值为  `localStorage.getItem('token') || ''`

#### 如果派发action后还需要根据成功与否进行后续操作，对应的action的方法需要有返回值

#### 问题：登陆成功后还可以访问登陆页面

利用导航守卫，导航：路由正在放生变化，进行路由的跳转，导航守卫可以进行某些操作
