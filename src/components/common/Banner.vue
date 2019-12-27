<template>
  <div class="banner">
        <el-carousel trigger="click" height="400px" type="card">
          <el-carousel-item v-for="(banner, i) in banner_list" :key="i">
            <a :href="banner.link"><img width="" height="" :src="banner.image" alt=""></a>
          </el-carousel-item>
        </el-carousel>
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
        // console.log(response.data);
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
.banner {
/*width: 800px;*/
text-align: center;
 margin: 100px auto 0 auto
}
.el-icon-arrow-left{
  font-size: 35px;
  margin-left: 50px;
}
.el-carousel__arrow--left{
  left: -50px;
}
</style>
