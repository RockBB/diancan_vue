<template>
  <div class="cart">
    <Header/>
    <div class="cart-info">
      <h3 class="cart-top">Shopping cart settlement</h3>
      <div class="cart-title">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">Food</el-col>
          <el-col :span="4">Price</el-col>
        </el-row>
      </div>
      <div class="cart-item" v-for="(course, i) in order_info.order_foods" :key="i">
        <el-row>
          <el-col :span="2" class="checkbox">&nbsp;&nbsp;</el-col>
          <el-col :span="10" class="course-info">
            <img style="float: left;" :src="$settings.Host+course.food_img" alt="">
            <span class="course_name">
                 <span>{{course.food_name}}</span><br>
                 <span class="discount_name">{{course.discount_name}}</span>
               </span>
          </el-col>
          <el-col :span="4">
            <div class="course-price">
              <p class="real_price">${{course.price}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="coupon">
          <div id="accordion">
            <div class="coupon-box">
              <div class="coupon-title">
                <span class="select-coupon">Clip coupons：</span>
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" style="width: 20px; height: 20px"
                   class="collapsed" aria-expanded="false">
                  <img class="sign" src="../../static/img/12.png" width="20" height="20" alt=""></a>
                <span class="coupon-num">No coupons</span>
              </div>
              <p class="sum-price-wrap" style="margin-right: 45px">Total：<span class="sum-price">{{order_info.total_price}} ft</span>
              </p>
            </div>

          </div>
          <div style="height: 30px; margin-top: 40px; display: flex; align-items: center; justify-content: flex-end">

            <p class="discount-num" style="margin-right: 45px">
              <span style="display: none;">Available 0 deducted ft0</span>
            </p>
          </div>
          <p class="sun-coupon-num" style="margin-right: 45px;margin-bottom:43px">Coupon deduction:<span>0 ft</span></p>
        </div>
      </div>
      <div class="calc">
        <el-row class="pay-row">

          <el-col :span="8" class="count">Actual payment: <span>ft {{order_info.total_price}}</span></el-col>
          <el-col :span="4" class="cart-pay"><span @click="payhander(order_info.total_price)">Account payment</span></el-col>
        </el-row>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Footer from "./common/Footer"

  export default {
    name: "Order",
    data() {
      return {
        order_info: {},
        coupon_list: [], 
        coupon_list2: [],
      }
    },
    components: {
      Header,
      Footer,
    },
    watch: {
    },
    created() {
      let token = sessionStorage.token || localStorage.token;
      let _this = this;
      if (!token) {
        this.$alert("Sorry, you haven't signed in yet! Please sign in",'Tips', {
          callback() {
            _this.$router.push("/login");
          }
        })
      }
      let order_number = this.$route.params.order;

      this.$axios.get(this.$settings.Host + `/orders/${order_number}/`, {
        headers: {
          "Authorization": "jwt " + token,
        },
      }).then(response => {
        this.order_info = response.data;
      }).catch(error => {
        console.log(error.response);
      });

    },
    methods: {

      payhander(money) {
        let token = localStorage.token || sessionStorage.token;
        let order_number = this.$route.params.order;
        this.$axios.post(this.$settings.Host+"/users/money/",{
          money:money,
          order_number: order_number,
        },{
              headers:{
                "Authorization":"jwt " + token
              }
          }).then(response=>{
               this.$store.commit("newmoney",response.data.money);
               let _this = this;
               this.$confirm("Successful payment！Jump to home page or not?",'Tips').then(() => {
                 _this.$router.push("/home/");
               })
          }).catch(error=>{
            console.log(error.response);
            this.$alert(error.response.data.message,"Tips")
          })


      },

    }
  }
</script>

<style scoped>
  .cart {
    margin-top: 80px;
  }

  .cart-info {
    overflow: hidden;
    width: 1200px;
    margin: auto;
  }

  .cart-top {
    font-size: 18px;
    color: #666;
    margin: 25px 0;
    font-weight: normal;
  }

  .cart-top span {
    font-size: 12px;
    color: #d0d0d0;
    display: inline-block;
  }

  .cart-title {
    background: #F7F7F7;
    height: 70px;
  }

  .calc {
    margin-top: 25px;
    margin-bottom: 40px;
  }

  .calc .count {
    text-align: right;
    margin-right: 10px;
    vertical-align: middle;
  }

  .calc .count span {
    font-size: 36px;
    color: #333;
  }

  .calc .cart-pay {
    margin-top: 5px;
    width: 110px;
    height: 38px;
    outline: none;
    border: none;
    color: #fff;
    line-height: 38px;
    background: #ffc210;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }

  .cart-item {
    height: 120px;
    /*line-height: 120px;*/
  }

  .cart-item .lh {
    line-height: 120px;
  }

  .course-info img {
    width: 175px;
    height: 115px;
    margin-right: 35px;
    vertical-align: middle;
  }

  .course-price {
    margin-top: 40px;
  }

  .alipay {
    display: inline-block;
    height: 48px;
  }

  .alipay img {
    height: 100%;
    width: auto;
  }

  .pay-text {
    display: block;
    text-align: right;
    height: 100%;
    line-height: 100%;
    vertical-align: middle;
    margin-top: 20px;
  }

  .real_price {
    color: #333;
    margin-bottom: 10px;
  }

  .original_price {
    color: #9b9b9b;
    letter-spacing: .36px;
    text-decoration: line-through;
  }

  .coupon {
    margin-top: 30px;
  }

  .coupon-box {
    text-align: left;
    display: flex;
    padding-bottom: 22px;
    padding-left: 30px;
    border-bottom: 1px solid #e8e8e8;
  }

  .coupon-title {
    display: flex;
  }

  .sum-price-wrap {
    display: inline-block;
    margin-left: auto;
    font-size: 16px;
    color: #4a4a4a;
  }

  .discount_name {
    color: #ffc210;
    margin-top: 24px;
    font-size: 14px;
    letter-spacing: .32px;
  }

  .course_name {
    margin-top: 40px;
    display: block;
  }

  .coupon-list {
    overflow: hidden;
  }

  .coupon-item {
    float: left;
    margin-left: 10px;
    margin-right: 10px;
    width: 200px;
    height: 60px;
    border: 1px solid #000;
    padding: 10px;
  }

  .coupon-item span {
    display: block;
    font-size: 14px;
  }

  .coupon_selected {
    border-color: red;
    color: indianred;
  }
</style>
