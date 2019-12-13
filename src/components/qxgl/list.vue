<template>
  <div>
    <!-- <h1>我是所有权限的表格</h1> -->
    <el-button @click="$router.push({name:'qxgladd'})">添加权限</el-button>
    <!-- <table border="1">
            <thead>
                <tr>
                    <th>id</th>
                    <th>标题</th>
                    <th>路由name</th>
                    <th>pid</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>统计</td>
                    <td></td>
                    <td>0</td>
                    <td>删除</td>
                </tr>
            </tbody>
    </table>-->
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="title" label="标题"></el-table-column>
      <el-table-column fixed prop="name" label="路由name"></el-table-column>
      <el-table-column fixed prop="pid" label="父权限id"></el-table-column>
      <!-- 删除 -->
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  methods: {
    deleteRow(index, rows, id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/delquanxian", {
              params: { id: id }
            })
            .then(res => {
              // console.log(res.data)
              if (res.data.err_code == 200) {
                this.axios.get("/listquanxian").then(res => {
                  this.tableData = res.data.info;
                });
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

      // rows.splice(index, 1);
    }
  },
  mounted() {
    this.axios.get("/listquanxian").then(res => {
      this.tableData = res.data.info;
    });
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>