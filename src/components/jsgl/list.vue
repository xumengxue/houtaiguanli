<template>
  <div>
    <!-- <h1>我是角色列表的表格</h1> -->
    <el-button @click="$router.push({name:'jsadd'})">添加角色</el-button>  
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="title" label="角色名"></el-table-column>
      <!-- 删除 -->
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>
            <el-button
            @click.native.prevent="editRow(scope.row._id)"
            type="text"
            size="small"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  methods: {
      editRow(id){
           this.$router.push({ name: "jsedit", params: { id: id } });
      },
    deleteRow(index, rows, id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/jsdel", {
              params: { id: id }
            })
            .then(res => {
              if(res.data.err_code==200){
                  rows.splice(index,1)
              }
              
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

    }
  },
  mounted() {
   this.axios.get("/jslist").then(res => {
      if (res.data.err_code == 200) {
        this.tableData = res.data.info;
      }
    });
  },
  data() {
    return {
      tableData: [
          {
            _id:1 ,
             title:"管理员"
          },
          {
            _id:2 ,
             title:"程序员"
          }
          ]
    };
  }
};
</script>