<template>
  <div>
    <router-link :to="{name:'goodsfllist'}" tag="h3">返回分类管理列表页</router-link>
      <!-- <el-button>返回分类管理列表页</el-button> -->
      <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="分类名称">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="分类图标">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/fileup"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            name="picture"
            :on-success="success"
            >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
      </el-form-item>
      <el-form-item label="所属分类">
            <el-cascader :options="options"
             :props="{ checkStrictly: true }"
             v-model="pid" :show-all-levels="false"></el-cascader>
           </el-form-item>
           <el-form-item >
               <el-button @click="add">添加</el-button>
               </el-form-item>
      </el-form>
  </div>
</template>
<script>
import treelist from "@/myjs/treelist.js"
export default {
    data(){
        return{
            pid:['0'],
           title:'',
          options:[
              {
                  label:'一级分类',
                  value:0
                  }
          ],
             fileList:[],
             imgurl:''
        }
    },
        methods: {
      handleRemove() {
        console.log();
      },
      handlePreview() {
        console.log();
      },
      success(res){
        // console.log(res)
        this.imgurl=res.imgurl
      },
      add(){
          // console.log(this.pid,this.name,this.imgurl)
          this.axios.post('/spfladd',{
            title:this.title,
            imgurl:this.imgurl,
            pid:this.pid.pop()
          }).then(res=>{
            if(res.data.err_code==200){
              alert('成功')
            }else{
              alert('失败')
            }
          })
      }
    },
    mounted () {
      this.axios.get('/spflall').then(res=>{
        // console.log(res)
         let data=treelist(res.data.info,0)
    
         this.options=[...this.options,...data]
      })
    }
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