<template>
  <div class="user-order">
    <Header/>
    <div class="main">
        <div class="banner"></div>
          <div class="profile">
              <div class="profile-info">
                  <div class="avatar"><img class="newImg" width="100%" alt="" src="/static/img/logo2.png"></div>
                  <span class="user-name">{{user_info.username}}</span>
                  <span class="user-job">深圳市 | 程序员</span>
              </div>
              <ul class="my-item">
                  <li>我的账户</li>
                  <li class="active">我的订单</li>
                  <li>个人资料</li>
                  <li>账号安全</li>
              </ul>
            </div>
          <div class="user-data">
            <ul class="nav">
              <li class="order-info">订单</li>
<!--              <li class="course-expire">有效期</li>-->
              <li class="course-price">菜品价格</li>
              <li class="real-price">实付金额</li>
              <li class="order-status">交易状态</li>
              <li class="order-do">交易操作</li>
            </ul>
            <div class="my-order-item" v-for="order in user_info.user_orders">
                <div class="user-data-header">
                  <div class="order-time">
                    下单时间: {{new Date(order.create_time).toLocaleString()}}
                    <span style="padding-left: 20px;" v-if="order.pay_time">付款时间: {{new Date(order.pay_time).toLocaleString()}}</span>
                  </div>
                  <span class="order-num">订单号：
                      <span class="my-older-number">{{order.order_number}}</span>
                  </span>
                </div>
              <ul class="nav user-data-list" v-for="course in order.order_foods">
                <li class="order-info">
                    <img :src="$settings.Host+course.food_img" alt="">
                    <div class="order-info-title">
                      <p class="course-title">{{course.food_name}}</p>
<!--                      <p v-if="course.discount_name" class="price-service">{{course.discount_name}}</p>-->
                    </div>
                </li>
<!--                <li class="course-expire">{{// course.expire_text}}</li>-->
                <li class="course-price">{{course.price}}</li>
                <li class="real-price">{{course.real_price}}</li>
                <li class="order-status">{{order.order_status_text}}</li>
                <li class="order-do">
<!--                  <router-link v-if="order.order_status==1" :to="'/detail?id='+course.food" class="btn btn2">去学习</router-link>-->
                  <router-link v-if="order.order_status==0" :to="'/orders/'+order.order_number" class="btn btn2">去付款</router-link>
                </li>
              </ul>

            </div>

        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Footer from "./common/Footer"
  export default{
    name:"UserOrder",
    data(){
      return {
        user_info:{}
      };
    },
    created(){
        let token = localStorage.token || sessionStorage.token;
        let user_id = localStorage.user_id || sessionStorage.user_id;
        if(!token){
          this.$alert("对不起,您尚未登录!请登录!","警告",{
            callback(){
              _this.$router.push("/login");
            }
          })
        }

        this.$axios.get(this.$settings.Host+`/users/${user_id}/orders/`,{
          headers:{
            // 注意下方的空格!!!
            "Authorization":"jwt " + token,
          },
        }).then(response=>{
          this.user_info = response.data;
          // console.log(this.user_info);
        }).catch(error=>{
          console.log( error.response )
        })
    },
    components:{
      Header,
      Footer,
    }
  }
</script>

<style scoped>
.user-order{
  padding-top: 80px;
}
.main .banner{
    width: 100%;
    height: 324px;
    background: url(/static/img/my_bkging.0648ebe.png) no-repeat;
    background-size: cover;
    z-index: 1;
}
.profile{
    width: 1200px;
    margin: 0 auto;
}
.profile-info{
    text-align: center;
    margin-top: -80px;
}
.avatar{
    width: 120px;
    height: 120px;
    border-radius: 60px;
    overflow: hidden;
    margin: 0 auto;
}
.user-name{
    display: block;
    font-size: 24px;
    color: #4a4a4a;
    margin-top: 14px;
}
.user-job{
    display: block;
    font-size: 11px;
    color: #9b9b9b;
 }
.my-item{
    list-style: none;
    line-height: 1.42857143;
    color: #333;
    width: 474px;
    height: 31px;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    margin: 41px auto 0;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.my-item .active{
    border-bottom: 1px solid #000;
}
.user-data{
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding-top: 30px;
    border-top: 1px solid #e8e8e8;
    margin-bottom: 63px;
}
.nav{
    width: 100%;
    height: 60px;
    background: #e9e9e9;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}
.nav li{
    margin-left: 20px;
    margin-right: 28px;
    height: 60px;
    line-height: 60px;
    list-style: none;
    font-family: PingFangSC-Medium;
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid #e9e9e9;
  width: 160px;
}
.nav .order-info{ width: 325px; }
.nav .course-expire{ width: 60px; }
.nav .course-price{ width: 130px; }
.user-data-header{
    display: flex;
    height: 44px;
    color: #4a4a4a;
    font-size: 14px;
    background: #f3f3f3;
    -ms-flex-align: center;
    align-items: center;
    font-family: PingFangSC-Regular;
}
.order-time{
    font-size: 12px;
    display: inline-block;
    margin-left: 20px;
}
.order-num{
    font-size: 12px;
    display: inline-block;
    margin-left: 29px;
}
.user-data-list{
    height: 100%;
    display: flex;
}
.user-data-list{
  background: none;
}
.user-data-list li{
    height: 60px;
    line-height: 60px;
}
.user-data-list .order-info{
    display: flex;
    align-items: center;
    margin-right: 28px;
}
.user-data-list .order-info img{
    max-width: 100px;
    max-height: 75px;
    margin-right: 22px;
}
.course-title{
    width: 203px;
    font-size: 13px;
    color: #333;
    line-height: 20px;
    font-family: PingFangSC-Medium;
    margin-top: -10px;
}
.order-info-title .price-service{
    line-height: 18px;
}
.price-service{
    font-size: 12px;
    color: #fa6240;
    padding: 0 5px;
    border: 1px solid #fa6240;
    border-radius: 4px;
    margin-top: 4px;
    position: absolute;
}
.order-info-title{
    margin-top: -10px;
}
.user-data-list .course-expire{
    font-size: 12px;
    color: #ff5502;
    font-family: PingFangSC-Medium;
    width: 60px;

    text-align: center;
}
.btn {
  width: 100px;
  height: 32px;
  font-size: 14px;
  color: #fff;
  background: #ffc210;
  border-radius: 4px;
  border: none;
  outline: none;
  font-family: PingFangSC-Medium;
  transition: all .25s ease;
  display: inline-block;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
</style>
