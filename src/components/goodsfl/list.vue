<template>
<div>
    <el-button @click="add($router.push({name:'goodsfladd'}))">添加商品分类</el-button>
  <div>商品分类列表</div>
  <el-tree :data="info" :props="defaultProps" @node-click="handleNodeClick" :indent='50'>
     <span class="custom-tree-node" slot-scope="{ node, data }">
        
        <img :src="`http://127.0.0.1:3000/${data.imgurl}`" alt="" class="img">
        <span>{{ node.label }}</span>
        <span>        
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(node, data)">
            修改
          </el-button>
        </span>
      </span>
  </el-tree>
  </div>
</template>
<script>
import fltree from "@/myjs/fltree.js"
export default {
    data(){
      return{
         info: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          value:'value',
          imgurl:'imgurl'
        }
      }
    },          
   mounted () {
     this.axios.get('/spflall').then(res=>{
          if(res.data.err_code==200){
            this.info=fltree(res.data.info,0)
          }
     })
   },
    methods: {
      handleNodeClick(data) {
        // console.log(data);
      },
      remove(node, data){
         let id=data.value
         this.axios.get('/delspfl',{
           params:{id:id}
         }).then(res=>{
          //  console.log(res)
          if(res.data.err_code==200){
              this.axios.get('/spflall').then(res=>{
          if(res.data.err_code==200){
            this.info=fltree(res.data.info,0)
          }
     })
          }
         })
      },
      edit(node, data){
         let id=data.value
        this.$router.push({name:'goodsfledit',params:{id:id}})          
      }
    }
}
</script>
<style>
  .custom-tree-node {
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20px;
  }
  
.el-tree-node__content {
    width: 60%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 88px;
    cursor: pointer;
}
.img{
  width: 70px;
  height: 80px;
}
</style>