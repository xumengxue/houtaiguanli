<template>
    <div>
      <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="角色名">
        <el-input v-model="title"></el-input>
      </el-form-item> 
       <el-form-item label="权限">
        <div class="block">
          <el-cascader :options="options" v-model="value" :props="props" collapse-tags clearable></el-cascader>
        </div>
      </el-form-item> 
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>
<script>
import treelist from "@/myjs/treelist.js";
export default {
      data() {
    return {
      title: "",
      props: { multiple: true, checkStrictly: true },
      value: [],
      options: []
    }
  },

  methods: {
        tree(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            value: info[i]._id,
            label: info[i].title,
            children: this.tree(info, info[i]._id)
          };
          // 如果 没有子权限 -- 删除 children 属性
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
          // console.log(data);
        }
      }
      return data;
    },
      add(){
          let obj={title:this.title,qxid:this.value}
        //   console.log(obj)
           // 将 obj 通过 ajax  传递给 node
      this.axios.post("/jsadd", obj).then(res => {
        if (res.data.err_code == 200) {
          // alert("添加成功");
          // 跳转到 角色列表
          this.$router.push({ name: "jslist" });
        } else {
          alert("添加失败");
          // 清空表单数据
          this.title = "";
          this.value = "";
        }
      });
      }
  },
    mounted() {
   this.axios.get("/listquanxian").then(res => {
     
      this.options = treelist(res.data.info, 0);
    });
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