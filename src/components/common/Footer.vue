<template>
  <div class="footer">
    <el-container>
      <el-footer>
        <el-row>
<!--          <el-col v-for="nav in nav_list" :span="3"><a :class="check(nav.link)?'current':''" :href="nav.link">{{nav.name}}</a></el-col>-->
           <el-col :span="4"><router-link to="">关于我们</router-link></el-col>
           <el-col :span="4"><router-link to="">联系我们</router-link></el-col>
           <el-col :span="4"><router-link to="">商务合作</router-link></el-col>
           <el-col :span="4"><router-link to="">帮助中心</router-link></el-col>
           <el-col :span="4"><router-link to="">意见反馈</router-link></el-col>
          <el-col :span="4"><router-link to="">新手指南</router-link></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">Copyright © dianc.com版权所有 | 京ICP备110120119号-1</el-col>
        </el-row>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  export default {
    name:"Footer",
    data(){
      return {
        nav_list:[],
      }
    },
    // created() {
    //   // 获取导航
    //   this.$axios.get(this.$settings.Host+"/footer/").then(response=>{
    //     this.nav_list = response.data;
    //     //console.log(this.nav_list)
    //   }).catch(error=>{
    //     console.log(error.response)
    //   })
    // },
    // methods:{
    //   check(link){
    //       return link===window.location.pathname;
    //   }
    // }
  }
</script>


<style scoped>
.footer{
    width: 100%;
    height: 128px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: #25292e;
    margin-top: auto;
    font-size: 14px;
    color: white;
}
  .footer a{
    text-decoration: none;
    color: white;
    font-size: 14px;
  }
</style>
