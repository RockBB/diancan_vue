## diancan_vue

#### 安装指定版本的vue

```
npm install -g @vue/cli@版本号
```



#### 创建vue项目

```bash
在输入命令vue init webpack diancan_vue看到以下提示信息，直接回车或选择和下面相同的配置。然后等待安装。

$ vue init webpack diancan_vue

  A newer version of vue-cli is available.

  latest:    2.9.6
  installed: 2.8.2

? Project name (diancan_vue)
? Project name diancan_vue
? Project description (A Vue.js project)
? Project description A Vue.js project
? Author (rock <chenziwu@ufactory.cc>) rock
? Author rock
? Vue build standalone
? Install vue-router? (Y/n) n
? Install vue-router? No
? Use ESLint to lint your code? (Y/n) n
? Use ESLint to lint your code? No
? Set up unit tests (Y/n) n
? Set up unit tests No
? Setup e2e tests with Nightwatch? (Y/n) n
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (reco
mmended) (Use arrow keys)
> Yes, use NPM
  Yes, use Yarn
  No, I will handle that myself


```

然后看到下面信息后表示项目初始化完成，可以Ctrl+c结束

```
# Project initialization finished!
# ========================

```

#### 启动项目

```
cd diancan_vue/
npm run dev

看到一下信息表示启动成功
 I  Your application is running here: http://localhost:8080
然后在浏览器中输入http://localhost:8080就可以访问到创建的vue项目
```

#### 安装路由组件

```
npm i vue-router -S
```

在src目录下创建router路由目录，在router目录下创建index.js路由文件

index.js路由文件中，编写初始化路由对象的代码 .

```javascript
import Vue from "vue"
import Router from "vue-router"

// 这里导入可以让让用户访问的组件

Vue.use(Router);

export default new Router({
  // 设置路由模式为‘history’，去掉默认的#
  mode: "history",
  routes:[
    // 路由列表

  ]
})

```

#### 注册路由信息

打开main.js文件，把router路由规则对象注册到vue中.

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

```



#### 在视图中显示路由对应的内容

在App.vue组件中，添加显示路由对应的内容。

```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```

## 引入ElementUI

对于前端页面布局，我们可以使用一些开源的UI框架来配合开发，Vue开发前端项目中，比较常用的就是ElementUI了。

ElementUI是饿了么团队开发的一个UI组件框架，这个框架提前帮我们提供了很多已经写好的通用模块，我们可以在Vue项目中引入来使用，这个框架的使用类似于我们前面学习的bootstrap框架，也就是说，我们完全可以把官方文档中的组件代码拿来就用，有定制性的内容，可以直接通过样式进行覆盖修改就可以了。

![1552501300174](diancan_vue_images/1552501300174.png)

中文官网：http://element-cn.eleme.io/#/zh-CN

文档快速入门：http://element-cn.eleme.io/#/zh-CN/component/quickstart



### 快速安装ElementUI

项目根目录执行以下命令:

```
npm i element-ui -S
上面的命令等同于 
npm install element-ui --save
```

###  配置ElementUI到项目中

在main.js中导入ElementUI，并调用。代码：

```javascript
// elementUI 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 调用插件
Vue.use(ElementUI);
```



# 首页

首页采用了上下页面布局，首页是导航栏、轮播图。。。脚部等几个小模块。所以我们可以把首页作为一个组件进行开发，然后把首页的这些小模块作为单独的组件来进行开发。

## 4.1 创建首页组件

在src/components目录下创建文件 Home.vue

代码：

```vue
<template>
  <div id="home">
    首页
  </div>
</template>

<script>
export default {
  name:"Home",
  data(){
    return {

    }
  }
}
</script>

<style scoped>

</style>

```

效果：

![1556415917941](diancan_vue_images/1556415917941.png)



### 4.1.1 创建首页对应的路由

在router/index.js中引入Home组件，并设置Home组件作为首页路由。

代码：

```javascript
import Vue from "vue"
import Router from "vue-router"

// 后面这里引入可以被用户访问的页面组件
import Home from "../components/Home"

Vue.use(Router);

export default new Router({
  // 路由跳转模式，注意使用 history
  mode: "history",

  // 路由规则
  routes:[
    {
      // name:"路由别名",
      name:"Home",
      // path: "路由地址",
      path: "/",
      // component: 组件类名,
      component: Home,
    },{
      // name:"路由别名",
      name:"Home",
      // path: "路由地址",
      path: "/home",
      // component: 组件类名,
      component: Home,
    },
  ]
})

```



效果：

![1556416079117](diancan_vue_images/1556416079117.png)



## 4.2 开发导航子组件

经过前面的观察，可以发现导航不仅在首页出现，其他页面也有，所以对于这些不同页面中公共的内容，可以创建一个单独的组件目录存放。

![1552501540495](diancan_vue_images/1552501540495.png)



创建src/components/common/Header.vue目录路径，编写代码：

```vue
<template>

</template>

<script>
  export default {
    name: "Header",
    data(){
      return {
        
      };
    }
  }
</script>

<style scoped>

</style>
```

效果：

![1552501465055](diancan_vue_images/1552501465055.png)



### 4.2.1 在首页引入导航组件

代码：

```vue
<template>
  <div class="home">
    <Header/>
  </div>
</template>

<script>
  import Header from "./common/Header"
  export default {
    name: "Home",
    data(){
      return {

      };
    },
    components:{
      Header,
    }
  }
</script>

<style scoped>

</style>

```

