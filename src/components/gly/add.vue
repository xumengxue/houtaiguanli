<template>
    <div>
      <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="管理员名">
        <el-input v-model="admin"></el-input>
      </el-form-item>  
       <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>       
       <el-form-item label="角色">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>
<script>

export default {
      data() {
    return {
      admin: "",
      password:'',
      options:[],
      value:''
    }
  },

  methods: {
       
      add(){
     this.axios.post('/glyadd',{
         admin:this.admin,
         password:this.password,
         jsid:this.value
     }).then(res=>{
         if(res.data.err_code==200){
            //  alert('添加成功')
 this.$router.push({name:'glylist'})
         }
        
     })
      }
  },
    mounted() {
      this.axios.get('/jslist').then(res=>{
          if(res.data.err_code==200){
                // console.log(res.data.info)
              this.options=res.data.info
          }
      })
  },
}
</script>
<style scoped>
.el-form {
  padding: 20px;
  box-sizing: border-box;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 52%;
}
</style>