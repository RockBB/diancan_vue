<template>
	<div class="login-box">
		<div class="login">
			<div class="login_box">
				<div class="title">
					<span @click="login_type=0">Password Login</span>
					<span @click="login_type=1">SMS Login</span>
				</div>
				<div class="inp" v-if="login_type==0">
					<input v-model = "username" type="text" placeholder="User Name/ Phone Number" class="user">
					<input v-model = "password" type="password" name="" class="pwd" placeholder="password">
					<div class="rember">
						<p>
							<input type="checkbox" class="no" v-model="remember"/>
							<span>Remember Password</span>
						</p>
						<p>Forget Password</p>
					</div>
					<button class="login_btn" @click="loginhander">Login</button>
					<p class="go_login" >No Account<router-link to="/register"> Register</router-link></p>
				</div>
				<div class="inp" v-show="login_type==1">
					<input v-model = "username" type="text" placeholder="Phone Number" class="user">
					<input v-model = "password"  type="text" class="pwd" placeholder="Verification code">
          <button id="get_code" class="login_btn">Get verification code</button>
					<button class="login_btn" @click="loginhander">Login</button>
					<p class="go_login" >No Account <router-link to="/register">Register Now</router-link></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
        login_type: 0,
        username:"",
        password:"",
        remember:"",
    }
  },

  methods:{
    loginhander(){
      this.$axios.post(this.$settings.Host+"/users/login/",{
        username:this.username,
        password:this.password,
      }).then(response=>{
        let data = response.data;
        if(this.remember){
          localStorage.token = data.token;
          localStorage.user_id = data.id;
          localStorage.user_name = data.username;

        }else{
          sessionStorage.token = data.token;
          sessionStorage.user_id = data.id;
          sessionStorage.user_name = data.username;
        }
        this.$store.state.user.money = data.money;
        let _this = this;
        _this.$alert("Login Successed!","Welcome",{
          callback(){
            _this.$router.go(-1);
          }
        });

      }).catch(error=>{
        console.log(error.response)
      })
    }
  },

};
</script>
<style scoped>
.login-box{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  margin-top: 80px;

}

.login .login-title{
     width: 100%;
    text-align: center;
}
.login-title img{
    width: 190px;
    height: auto;
}
.login-title p{
    font-size: 18px;
    color: #fff;
    letter-spacing: .29px;
    padding-top: 10px;
    padding-bottom: 50px;
}
.login_box{
    width: 400px;
    height: auto;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
    border-radius: 4px;
    margin: 0 auto;
    padding-bottom: 40px;
}
.login_box .title{
    font-size: 20px;
    color: #9b9b9b;
    letter-spacing: .32px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-around;
    padding: 50px 60px 0 60px;
    margin-bottom: 20px;
    cursor: pointer;
}
.login_box .title span:nth-of-type(1){
    color: #4a4a4a;
    border-bottom: 2px solid #84cc39;
}

.inp{
    width: 350px;
    margin: 0 auto;
}
.inp input{
    outline: 0;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}
.inp input.user{
    margin-bottom: 16px;
}
.inp .rember{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
}
.inp .rember p:first-of-type{
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: .19px;
    margin-left: 22px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    /*position: relative;*/
}
.inp .rember p:nth-of-type(2){
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: .19px;
    cursor: pointer;
}

.inp .rember input{
    outline: 0;
    width: 30px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}

.inp .rember p span{
    display: inline-block;
    font-size: 12px;
    width: 100px;

}
#geetest{
	margin-top: 20px;
}
.login_btn{
     width: 100%;
    height: 45px;
    background: #84cc39;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    letter-spacing: .26px;
    margin-top: 30px;
}

.inp .go_login{
    text-align: center;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: .26px;
    padding-top: 20px;
}
.inp .go_login span{
    color: #84cc39;
    cursor: pointer;
}
</style>
