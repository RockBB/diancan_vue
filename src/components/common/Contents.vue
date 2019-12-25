<template>
  <div class="content">
    <el-container>
      <el-row  type="flex" class="row-bg" justify="space-between">
        <el-col :span="5">
<!--          <img src="/static/content/c1.png" alt="">-->
          <h3>宫保鸡丁</h3>
          <p>
            宫保鸡丁
          </p>
        </el-col>
        <el-col :span="5">
<!--          <img src="/static/content/c2.png" alt="">-->
          <h3>大盘鸡</h3>
          <p>
            大盘鸡
          </p>
        </el-col>
        <el-col :span="5">
<!--          <img src="/static/content/c3.png" alt="">-->
          <h3>回锅肉</h3>
          <p>
            回锅肉
          </p>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>

  export default {
    name:"Content",
    data(){
      return {
        con_list:[
          "/static/content/c1.png",
          "/static/content/c2.png",
          "/static/content/c3.png",
        ],
      }
    },

  }
</script>


<style scoped>
.content {
  width: 1100px;
  height: auto;
  margin: 0 auto;
  display: flex;
  margin-bottom: 50px;
  margin-top: 10px;
  justify-content: space-between;
}

.content h3{
    padding-top: 30px;
    padding-bottom: 13px;
    font-size: 22px;
    color: #5e5e5e;
}
  .content p{
    font-size: 16px;
    color: #9b9b9b;
  }
</style>
