<template>
  <div class="footer">
    <el-container>
      <el-footer>
        <el-row>
<!--          <el-col v-for="nav in nav_list" :span="3"><a :class="check(nav.link)?'current':''" :href="nav.link">{{nav.name}}</a></el-col>-->
           <el-col :span="4"><router-link to="">About us</router-link></el-col>
           <el-col :span="4"><router-link to="">Contact us</router-link></el-col>
           <el-col :span="4"><router-link to="">Business cooperation</router-link></el-col>
           <el-col :span="4"><router-link to="">Help center</router-link></el-col>
           <el-col :span="4"><router-link to="">Feedback</router-link></el-col>
          <el-col :span="4"><router-link to="">Novice guide</router-link></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">MIT Licensed | Copyright © 2019 </el-col>
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
