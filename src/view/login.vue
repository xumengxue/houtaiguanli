<template>
 
   <div class="login" v-if="f">
       <div class="wrap">
       <div class="tou">
           <div class="img"></div>
           <h3 class="h3">渠道商管理平台</h3>
       </div>
       <form action="">
           <select name="" id="">
               <option value="">管理员</option>
               <option value="">企业</option>
               <option value="">平台</option>
           </select>
           <input type="text" placeholder="账户名" v-model="name">
           <input type="text" placeholder="账户密码"  v-model="password">
           <input type="button" value="登录" class="mima" @click="loginto()">         
       </form>
       </div>
   </div>
   <div v-else class="tubiao">
       <i class="el-icon-success animated shake"></i>
       <p class="animated fadeInLeft">登陆成功</p>
   </div>
    
</template>
<script>
export default {
    data () {
        return {           
            f:true,
            name:'',
            password:''
        }
    },
    methods: {
        loginto(){
            let {name,password}=this
            this.axios.post('/login',{
                name:name,
                password:password
            }).then(res=>{
                // console.log(res.data)
                localStorage.setItem("houtaitoken",JSON.stringify({id:res.data.id,token:res.data.token}))
                if(res.data.err_code==200){
                    this.f=false
                    setTimeout(()=>{
                this.$router.push({name:'base'})
                    },2000)
                }else{
                    this.name="",
                    this.password=""
                }
            })
           
            
        }
    }
}
</script>
<style >
body,html,#app,.login{
    height: 100%;
    background: #F0F0F2;
}
*{
    margin: 0;
    padding: 0;
}
   .wrap{
       width: 25%;
      
   }
   .h3{
       margin-top: 10px;
       margin-bottom: 20px;
   }
   form{
       display: flex;
       flex-direction: column;
   }
   input{
       height: 20px;
       margin-bottom: 15px;
   }
   select{
       font-size: 18px;
       margin-bottom: 15px;
   }
   .mima{
       height: 25px;
       background: #F55D54;
       color: white;
       border: none;
   }
   .login{
       background: #F0F0F2;
       /* height: 100vm; */
       display: flex;
       justify-content: center;
       align-items: center;
   }
   .img{
       margin: 0 auto;
       height: 100px;
      width: 100px;
       background: #E5E5E5;
   }
   .tou{
       text-align: center;
   }
   .el-icon-success{
       font-size: 100px;
   }
   .tubiao{
       width: 100%;
       height: 100%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
   }
</style>