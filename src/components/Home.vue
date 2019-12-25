<template>
  <div id="home">
    <Header></Header>
    <Banner></Banner>
    <Contents></Contents>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Banner from "./common/Banner"
  import Footer from "./common/Footer"
  import Contents from "./common/Contents"
  export default{
    name:"Home",
    data(){
      return {
        user_id: sessionStorage.user_id || localStorage.user_id,
        username: sessionStorage.username || localStorage.username,
        token: sessionStorage.token || localStorage.token,
        current_page:0,
        is_login:false,
      };
    },
    components:{
      Header,
      Banner,
      Footer,
      Contents
    },
    mounted(){
      if(this.user_id && this.token){
        this.is_login=true;
      }
    },
    methods:{
      logout(){
        this.is_login=false;
      }
    }
  }
</script>

<style scoped>

</style>
