<template>
  <div class="banner">
    <el-row>
      <el-col :span="4">www</el-col>
      <el-col :span="16">
        <el-carousel trigger="click" height="600px">
          <el-carousel-item v-for="banner in banner_list">
            <a :href="banner.link"><img width="100%" height="100%" :src="banner.image" alt=""></a>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name:"Banner",
    data(){
      return {
        banner_list:[]
      };
    },
    created() {
      // 获取轮播图数据
      this.$axios.get(this.$settings.Host+"/banner/").then(response=>{
        this.banner_list = response.data;
        console.log(response.data);
      }).catch(error=>{
        console.log(error.response);
      });
    }
  }
</script>

<style scoped>
/*.el-carousel__arrow{*/
/*  width: 100px!important;*/
/*  height: 100px!important;*/
/*}*/
.el-icon-arrow-left{
  font-size: 35px;
  margin-left: 50px;
}
.el-carousel__arrow--left{
  left: -50px;
}
</style>
