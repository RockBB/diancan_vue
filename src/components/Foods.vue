<template>
  <div class="courses">
    <Header/>
    <div class="main">
      <!-- 筛选功能 -->
      <ul class="condition condition1">
        <li class="cate-condition">Food Category:</li>
        <li class="item" :class="query_params.course_category===0?'current':''" @click="query_params.course_category=0">All</li>
        <li :class="query_params.course_category===catetory.id?'current':''"
         @click="query_params.course_category=catetory.id" v-for="(catetory, i) in catetory_list" :data-key="catetory.id" :key="i+'c'" class="item">{{catetory.name}}</li>

      </ul>
      <ul class="condition condition2">
        <li class="cate-condition">Filter:</li>
          <li class="item" :class="(query_params.ordering==='-id' || query_params.ordering==='id')?'current':''" @click="select_ordering('id')">Default</li>
<!--          <li class="item" :class="(query_params.ordering==='-students' || query_params.ordering==='students')?'current':''" @click="select_ordering('students')">人气</li>-->
          <li class="item" :class="query_params.ordering==='price'?'current price':(query_params.ordering==='-price'?'current price2':'')" @click="select_ordering('price')">Price</li>
        <li class="course-length"></li>
      </ul>

      <!-- 课程列表 -->

      <div class="list" >
        <el-row :gutter="50" >
        <el-col :span="6" v-for="(course,i) in course_list" :key="i+'f'">
          <div class="grid-content bg-purple course-item">
            <div>
                <div class="course-title">
                  <h3>{{course.name}}</h3>
              </div>
              <img :src="course.food_img" style="height: 200px; width: 255px;margin: 20px 0;">
              <div class=".buy-inf">
                <span class="present-price">{{course.price}} ft</span>
                <span class="add-cart" @click="cartAddHander(course.id)"><img src="@/assets/cart1.svg" alt="">Add to cart</span>
              </div>
            </div>
         </div>
        </el-col>
      </el-row>

<!--        <ul>-->
<!--          <div class="course-link" v-for="course in course_list" >-->
<!--            <li class="course-item">-->

<!--              <div class="course-info">-->
<!--                <div class="course-title" >-->
<!--                  <h3>{{course.name}}</h3>-->
<!--                </div>-->
<!--              <div class="course-cover" >-->
<!--                <img :src="course.food_img" style="height: 220px; width: 350px">-->
<!--              </div>-->
<!--                <div class="buy-info">-->
<!--                  <span class="present-price">￥{{course.price}}元</span>-->
<!--                  <div class="add-cart" @click="cartAddHander(course.id)"><img src="@/assets/cart1.svg" alt="">加入购物车</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </li>-->
<!--          </div>-->
<!--        </ul>-->
      </div>
      <!--      分页-->
      <div class="pagination">

        <el-pagination @current-change="handleCurrentChange" :current-page="query_params.current_page"
          background layout="prev, pager, next" :page-size="12" :total="course_count">
<!--          background layout="prev, pager, next" :page-size="course_page_size" :total="course_count">-->
        </el-pagination>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Footer from "./common/Footer"

  export default {
    name: "Courses",
    data() {
      return {
        token:sessionStorage.token || localStorage.token,
        user_id:sessionStorage.user_id || localStorage.user_id,
        user_name:sessionStorage.user_name || localStorage.user_name,
        catetory_list:[],
        course_list:[],
        course_count: 0,
        course_page_size:1,
        query_params:{
          course_category: 0,
          ordering:"-id",
          current_page: 1,
        }
      }
    },

     watch:{
    // 每次点击不同课程时,要重新获取课程列表
    "query_params.course_category":function(){
       this.get_course_list();
       // 当切换分类的时候,重置页码
       this.query_params.current_page = 1;
    },
    "query_params.ordering":function(){
       // 当切换排序条件的时候,重置页码
       // this.query_params.current_page = 1;
       this.get_course_list();
    },
    "query_params.current_page":function(){
       this.get_course_list();
    }
  },
    components: {Header, Footer},

  created(){
    // 获取课程分类
    this.$axios.get(this.$settings.Host+"/foods/cate/").then(response=>{
      this.catetory_list = response.data
      // console.log('course555555', this.catetory_list)
    }).catch(error=>{
      console.log(error.response)
    });

    // 获取课程信息
    this.get_course_list()

  },
  methods:{
    select_ordering(selector){
      // 默认排序
      if(this.query_params.ordering===('-'+selector) ){
        this.query_params.ordering = selector;
      }else{
        this.query_params.ordering = '-'+selector;
      }
    },
    get_course_list(){
      let query_params = {
        ordering:this.query_params.ordering,
        page:this.query_params.current_page,
      };

      if( this.query_params.course_category !== 0 ){
        query_params.course_category = this.query_params.course_category;
      }

      this.$axios.get(this.$settings.Host+"/foods/list/",{
        params: query_params
      }).then(response=>{
        // 课程列表
        this.course_list = response.data.results;
        // 课程总数量
        this.course_count = response.data.count;
        console.log(this.course_list)

      }).catch(error=>{
        console.log(error.response)
      });
    },
    handleCurrentChange(page){
      // 页码发生改变
      this.query_params.current_page = page;
    },
       // 添加商品课程到购物车
      cartAddHander(id){
        // 1. 判断用户是否已经登录了.
        if(!this.token){
          this.$confirm("Sorry, you haven't signed in yet! Please sign in",'Tips').then(() => {
            this.$router.push("/login");
          });
        }

        // 2. 发起请求
        this.$axios.post(this.$settings.Host+`/carts/foods/`,{
          food_id: id,
        },{
          headers:{
            // 注意:jwt后面必须有且只有一个空格!!!!
            "Authorization":"jwt " + this.token
          }
        }).then(response=>{

          // 获取购物城中商品总数
          this.$store.commit("addcart",response.data.count);
          // 添加购物车成功!
          this.$message(response.data.message,"Tips",{
            duration: 2000, // 单位: 毫秒
          });

        }).catch(error=>{

          console.log(error.response);
        })
      },
  }

  }
</script>


<style scoped>
  .courses {
    padding-top: 80px;
  }

  .main {
    width: 1100px;
    height: auto;
    margin: 0 auto;
    padding-top: 35px;
  }

  .main .top {
    margin-bottom: 35px;
    padding: 25px 30px 25px 20px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 #f0f0f0;
  }

  .condition {
    border-bottom: 1px solid #333;
    border-bottom-color: rgba(51, 51, 51, .05);
    padding-bottom: 18px;
    margin-bottom: 17px;
    overflow: hidden;
  }

  .condition li {
    float: left;
  }

  .condition .cate-condition {
    color: #888;
    font-size: 16px;
  }

  .condition .item {
    padding: 6px 16px;
    line-height: 16px;
    margin-left: 14px;
    position: relative;
    transition: all .3s ease;
    cursor: pointer;
    color: #4a4a4a;
  }

  .condition1 .current {
    color: #ffc210;
    border: 1px solid #ffc210 !important;
    border-radius: 30px;
  }

  .condition2 .current {
    color: #ffc210;
  }

  .condition .price:before {
    content: "";
    width: 0;
    border: 5px solid transparent;
    border-top-color: #d8d8d8;
    position: absolute;
    right: 0;
    bottom: 2.5px;
  }

  .condition .price:after {
    content: "";
    width: 0;
    border: 5px solid transparent;
    border-bottom-color: #ffc210;
    position: absolute;
    right: 0;
    top: 2.5px;
  }

  .condition2 .course-length {
    float: right;
    font-size: 14px;
    color: #9b9b9b;
  }

  .course-item {
    background: #fff;
    padding: 20px 5px 20px 5px;
    width: 260px;
    margin-bottom: 35px;
    border-radius: 2px;
    box-shadow: 2px 3px 16px rgba(0, 0, 0, .1);
  }

  .course-cover {
    width: 423px;
    height: 210px;
    margin-right: 30px;
    float: left;
  }

  .course-info {
    width: 597px;
    float: left;
  }

  .course-title {
    margin-bottom: 8px;
    overflow: hidden;

  }

  .course-title h3 {
    font-size: 26px;
    color: #333;
    float: left;
  }

  .course-title span {
    float: right;
    font-size: 14px;
    color: #9b9b9b;
    margin-top: 12px;
    text-indent: 1em; /* 缩进 2字符宽度 */
    background: url("../assets/people.svg") no-repeat 0 3px;
  }

  .teacher {
    justify-content: space-between;
    font-size: 14px;
    color: #9b9b9b;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #333;
    border-bottom-color: rgba(51, 51, 51, .05);
  }

  .teacher .lesson {
    float: right;
  }

  .lesson-list {
    overflow: hidden;
  }

  .lesson-list li {
    width: 49%;
    margin-bottom: 15px;
    cursor: pointer;
    float: left;
    margin-right: 1%;
  }

  .lesson-list li .player {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }

  .lesson-list li .lesson-title {
    display: inline-block;
    max-width: 227px;
    text-overflow: ellipsis; /* 如果字体太多超出元素的宽度，则添加省略符号 */
    color: #666;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    vertical-align: text-bottom; /* 文本的垂直对齐方式： text-botton 文本底部对齐 */
    text-indent: 1.5em;
    /*background: url(../../static/player.svg) no-repeat 0 3px;*/
  }

  .lesson-list .free {
    width: 34px;
    height: 20px;
    color: #fd7b4d;
    margin-left: 10px;
    border: 1px solid #fd7b4d;
    border-radius: 2px;
    text-align: center;
    font-size: 13px;
    white-space: nowrap;
  }

  .lesson-list li:hover .lesson-title {
    color: #ffc210;
    /*background-image: url(../../static/player2.svg);*/
  }

  .lesson-list li:hover .free {
    border-color: #ffc210;
    color: #ffc210;
  }

  .buy-info .discount {
    padding: 0px 10px;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    height: 36px;
    text-align: center;
    margin-right: 8px;
    background: #fa6240;
    border: 1px solid #fa6240;
    border-radius: 10px 0 10px 0;
    line-height: 36px;
  }
  .buy-inf .discount {
    padding: 0px 10px;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    height: 36px;
    text-align: center;
    margin-right: 8px;
    background: #fa6240;
    border: 1px solid #fa6240;
    border-radius: 10px 0 10px 0;
    line-height: 36px;
  }
  .present-price {
    font-size: 18px;
    color: #fa6240;
  }

  .original-price {
    text-decoration: line-through;
    font-size: 14px;
    color: #9b9b9b;
    margin-left: 10px;
  }

  .buy-now {
    width: 120px;
    height: 38px;
    background: transparent;
    color: #fa6240;
    font-size: 16px;
    border: 1px solid #fd7b4d;
    border-radius: 3px;
    transition: all .2s ease-in-out; /* 过渡动画 */
    float: right;
    margin-top: 5px;
  }

  .buy-now:hover {
    color: #fff;
    background: #ffc210;
    border: 1px solid #ffc210;
    cursor: pointer;
  }
.pagination{
  text-align: center;
  margin: 20px 0 50px 0;
}
.add-cart{
  float: right;
  font-size: 14px;
  color: #ffc210;
  text-align: center;
  cursor: pointer;
  /*margin-top: 10px;*/
}
.add-cart img{
  width: 20px;
  height: 18px;
  margin-right: 7px;
  vertical-align: middle;
}
  .el-row {
    margin-bottom: 20px;
    :last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  /*.bg-purple-dark {*/
  /*  background: #99a9bf;*/
  /*}*/
  /*.bg-purple {*/
  /*  background: #d3dce6;*/
  /*}*/
  /*.bg-purple-light {*/
  /*  background: #e5e9f2;*/
  /*}*/
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }
</style>
