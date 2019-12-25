<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>


<style>
  *{
    padding: 0;
    margin:0;
  }
  body,h3,ul,p{

    font-weight: normal;
  }
  a{
    text-decoration: none;
    color: #4a4a4a;
  }
  ul{
    list-style: none;
  }
  img{
    width: 100%;
  }
  .el-checkbox__inner{
    width:16px;
    height: 16px;
    border: 1px solid #999;
  }
  .el-checkbox__inner:after{
    width: 6px;
    height: 8px;
  }
  .el-form-item__content{
    margin-left:0!important;
    width: 120px;
  }
  .geetest_holder{
	padding-top: 10px;
	width: 100%!important;
}
</style>
