<template>
  <div>
    <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="路由name">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="父权限">
        <el-cascader
          v-model="value"
          :props="{ checkStrictly: true }"
          :options="options"
          :show-all-levels="false"
        ></el-cascader>
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
      title: "",
      name: "",
      value: [],
      options: [
        {
          value: "0",
          label: "一级分类"
        }
      ]
    };
  },
  mounted() {
    this.axios.get("/listquanxian").then(res => {
      if (res.data.err_code == 200) {
        let info = res.data.info;
        let wxjinfo = this.tree(info, 0);
        this.tree(info, 0);
        this.options = [...this.options, ...wxjinfo];
      }
    });
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
    add() {
      let obj = {
        title: this.title,
        name: this.name,
        pid: this.value.pop()
      };
      // console.log(obj)
      this.axios.post("/addquanxian", obj).then(res => {
        if (res.data.err_code == 200) {
          // console.log("权限添加成功");
          this.$router.push({ name: "qxgllist" });
        } else {
          this.name = "";
          this.title = "";
        }
      });
    }
  }
};
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
