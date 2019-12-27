<template>
  <div class="header">
    <el-container>
      <el-header height="80px">
        <el-row>
          <el-col :span="16">

            <el-row class="nav" :gutter="20">
              <el-col v-for="(nav, i) in nav_list" :span="3" :key="i"><a :class="check(nav.link)?'current':''" :href="nav.link">{{nav.name}}</a></el-col>

            </el-row>
          </el-col>
          <el-col v-if="token" class="login-bar" :span="5">
            <div class="cart-ico">
              <router-link to="/cart">
<!--              <b>{{$store.state.cart.count}}</b>-->
             <b>{{count}}</b>
              <img src="@/assets/cart.svg" alt="">
              <span>购物车</span>
              </router-link>
            </div>

            <div class="study">账户金额：{{money}}￥</div>
            <div class="member">
              <el-dropdown>
                  <span class="el-dropdown-link"><router-link to=""><img src="@/assets/people.svg" alt=""></router-link></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><router-link to="/my">我的账户</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item><router-link to="/my/order">我的订单</router-link> </el-dropdown-item>
                  <el-dropdown-item>我的优惠卷 </el-dropdown-item>
                  <el-dropdown-item><span  @click="logout()">退出登录</span> </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </el-col>
          <el-col v-else class="login-bar" :span="5">
            <div class="cart-ico">
              <img src="@/assets/cart1.svg" alt="">
              <router-link to="/login"><span>购物车</span></router-link>
            </div>
            <div>
              <span class="register">
                  <router-link to="/login">登录</router-link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <router-link to="/register">注册</router-link>
                </span>
            </div>
          </el-col>

        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Header",
    props:[],
    data() {
      return {
        // 设置一个登录标识，表示是否登录
        token: sessionStorage.token || localStorage.token,
        user_name: sessionStorage.user_name || localStorage.user_name,
        user_id: sessionStorage.user_id || localStorage.user_id,
        nav_list:[],
      }
    },
    created() {

      // 获取导航
      this.$axios.get(this.$settings.Host+"/nav/").then(response=>{
        this.nav_list = response.data;
        // console.log(this.nav_list)
      }).catch(error=>{
        console.log(error.response)
      })
    },
    mounted(){
      this.money = this.$store.state.user.money
    },
    methods:{
      check(link){
          return link===window.location.pathname;
      },
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      logout(){
        // console.log(this.is_login);

        // localStorage.clear();
        // sessionStorage.clear();

        // this.$alert('退出登录成功!', '路飞学城', {
        //   confirmButtonText: '确定'
        // });
        let _this = this;
        this.$confirm('是否退出登录?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          sessionStorage.clear();
          // location.reload();
          location.href = "/";
          // _this.$router.push("/");
          // this.$message({
          //   type: 'success',
          //   message: '已退出登录!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消退出登录'
          // });
        });
      },
    },
    computed: {
       count: {
         get: function () {
           return this.$store.state.cart.count
          },
          // setter
          set: function (newValue) {
            return this.$store.state.cart.count
          }

       },
      money:{
         get: function () {
           return this.$store.state.user.money
    },
    // setter
    set: function (newValue) {
      return   this.$store.state.user.money
    }

      }
    },
    watch:{
      money(newvalue){
        this.money = newvalue;
      },
      count(newvalue){
        this.count = newvalue;
      },
    }
  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 80px;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    margin: 0 auto;
    z-index: 7;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
  }

  .el-container {
    width: 1200px;
    margin: 0 auto;
  }

  .el-header {
    padding: 0;
  }

  .el-row, .el-col {
    height: 80px;
  }

  .logo, .nav {
    line-height: 80px;
  }

  .logo img {
    vertical-align: middle; /* 设置图片垂直居中 */
  }

  .nav, .study {
    text-align: center;
    color: #4a4a4a;
  }

  .nav .el-col:hover, .study:hover , a:hover{
    color: #000000;
  }

  .login-bar {
    display: flex;
    align-items: center;
  }

  .cart-ico {
    width: 88px;
    height: 28px;
    margin-right: 20px;
    background: #f7f7f7;
    border-radius: 17px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    position: relative;
    font-size: 14px;
  }

  .cart-ico b {
    width: 16px;
    height: 16px;
    line-height: 17px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background: #fa6240;
    border-radius: 50%;
    transform: scale(.8);
    position: absolute;
    left: 16px;
    top: -1px;
  }

  .cart-ico img {
    width: 15px;
    height: auto;
    margin-left: 6px;
  }

  .cart-ico span {
    margin-right: 6px;
  }

  .study {
    padding-left: 0;
    letter-spacing: 0;
    margin-right: 20px;
    font-size: 15px;
    cursor: pointer;
  }

  .member img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }

  .member img:hover {
    border: 1px solid rgb(255, 194, 16);
  }

  .el-dropdown-menu {
    width: 180px;
  }

  .el-dropdown-menu i {
    float: right;
    line-height: 36px;
  }
</style>
