<template>
  <div class="cart">
    <Header/>
    <div class="main">
      <div class="cart-title">
        <h3>My shopping cart <span> </span></h3> 
      </div>
      <div class="cart-info">
                <el-table ref="multipleTable" :data="courseData" style="width:100%"
                            @select="currentSelected" @selection-change="SelectionChange">
          <el-table-column type="selection" label="" width="87"></el-table-column>
          <el-table-column label="Foods" width="540"> 
            <template slot-scope="scope">
              <div class="course-box">
                <img :src="$settings.Host + scope.row.food_img" alt="">
                <span>{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Price" width="162">  
            <template slot-scope="scope"> ft {{ scope.row.price.toFixed(2) }}</template>
          </el-table-column>
          <el-table-column label=" operation" width="162">  
            <template slot-scope="scope">
              <el-button ref="CartDel" type="danger" size="mini" class="el-icon-delete" @click="CartDel(scope.row,scope.row.name)">Delete</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="cart-bottom">

        <div class="cart-bottom-right">
          <span class="total">total：ft <span>{{total_price}}</span></span>
          <span  v-if="courseData.length">
            <span class="go-pay" @click="gotopay">go pay</span>
          </span>
          <span v-else>
            <button type="button" disabled class="go-pay">go pay</button>
          </span>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./common/Header"
  import Footer from "./common/Footer"

  export default {
    name: "Cart",
    data() {
      return {

        expire: 3,
        expire_list: [
          {title: "一个月有效", id: 1},
          {title: "两个月有效", id: 2},
          {title: "三个月有效", id: 3},
          {title: "永久有效", id: -1},
        ],
        courseData: [],
        selection:[],  
        total_price:0.00,
      }
    },
    components: {Header, Footer},
    watch:{
      selection(){
        
        this.getTotalPrice();
      },
      courseData(){
        
        this.getTotalPrice();
      },
    },
    created(){
      
      this.token = sessionStorage.token || localStorage.token;
      if( !this.token ){
        this.$confirm("Sorry, you haven't signed in yet! Please sign in",'Tips').then(() => {
          this.$router.push("/login");
        }).catch(()=>{
          this.$router.go(-1);
        });
      }else{
        
        this.$axios.get(this.$settings.Host+"/carts/foods/",{
          headers:{
            
            "Authorization":"jwt " + this.token
          }
        }).then(response=>{

          this.courseData = response.data;
          
          this.$store.state.cart.count = response.data.length;

          setTimeout(()=>{

            this.courseData.forEach(row => {
              if(row.is_select){
                this.$refs.multipleTable.toggleRowSelection(row);
              }

            });
          },0)

        }).catch(error=>{
          let status = error.response.status;
          if( status === 401 ){
            this.token = null;
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            let _this = this;
            this.$alert("You have not signed in or the sign in timeout! Please sign in again","Warn",{
              callback(){
                _this.$router.push("/login");
              }
            });
          }
        })

      }
    },
    methods: {
      SelectAll(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleAllSelection(row);
          });
        }
      },
      getTotalPrice(){
        let total = 0;
        this.selection.forEach(row=>{
          total += row.price;
        });
        this.total_price = total.toFixed(2);
      },
      CartDel:function(course,course_name){
        console.log(course, course_name);
        this.$confirm(`Are you sure delete this ${course_name}`,"Tips").then(()=>{
          let food_id = course.id;
          this.$axios.delete(this.$settings.Host+"/carts/foods/",{
            params:{
              food_id:food_id,
            },
            headers:{
              "Authorization":"jwt " + this.token
            },
          }).then(response=>{

            let index = this.courseData.indexOf(course);
            this.courseData.splice(index,1);
            this.$message("Delete successful!");
            this.getCartCount();

          }).catch(error=>{
            console.log(error.response);
          });

        }).catch(()=>{

        });
      },
      currentSelected(selection,row){
        let is_select = true;
        if( selection.indexOf(row) == -1 ){
          is_select = false;
        }

        let course_id = row.id;
        this.$axios.put(this.$settings.Host+"/carts/foods/",{
          food_id: course_id,
          is_select: is_select,
        },{
          headers:{
            "Authorization":"jwt " + this.token
          },
        }).then(response=>{

          this.$message(response.data.message,"Tips");
        }).catch(error=>{

          console.log(error.response)
        })
      },
      getCartCount(){
        this.$axios.get(this.$settings.Host+"/carts/foods/",{
          headers:{
            "Authorization":"jwt " + this.token
          }
        }).then(response=>{
          this.$store.commit("addcart",response.data.length);
        })
      },
      SelectionChange(data){
        this.selection = data;
      },
      gotopay(){
        if (this.courseData.length){
          console.log(this.courseData);
          this.$axios.post(this.$settings.Host+"/orders/",{},{
              headers:{
                "Authorization":"jwt " + this.token
              }
          }).then(response=>{
            let _this = this;
            this.$alert(response.data.message,"Tips",{
              callback(){
                _this.$router.push(`orders/${response.data.order}`);
              }
            })
          }).catch(error=>{
            console.log(error.response);
            this.$alert(error.response.data.message,"Tips")
          })
        }else {
          this.$alert("The order you submitted is wrong, please submit again!","Tips")
        }
      }
    },

  }
</script>

<style scoped>
  .main {
    width: 1200px;
    margin: 80px auto;
    overflow: hidden; 

  }

  .cart-title h3 {
    font-size: 18px;
    color: #666;
    margin: 25px 0;
  }

  .cart-title h3 span {
    font-size: 12px;
    color: #d0d0d0;
    display: inline-block;
  }

  .course-box img {
    max-width: 175px;
    max-height: 115px;
    margin-right: 35px;
    vertical-align: middle;
  }

  .cart-bottom {
    width: 900px;
    overflow: hidden;
    height: 80px;
    background: #F7F7F7;
    margin-bottom: 300px;
    margin-top: 50px;
  }

  .select-all {
    float: left;
    margin-right: 58px;
    line-height: 80px;
  }

  .delete-any {
    cursor: pointer;
    float: left;
    line-height: 80px;
  }

  .delete-any img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    padding-right: 15px;
  }

  .cart-bottom-right {
    float: right;
    text-align: right;
  }

  .total {
    margin-right: 62px;
    font-size: 18px;
    color: #666;
  }

  .go-pay {
    outline: none;
    background: #ffc210;
    display: inline-block;
    padding: 27px 50px;
    font-size: 18px;
    cursor: pointer;
    color: #fff;
  }
</style>
