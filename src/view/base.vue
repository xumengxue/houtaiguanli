<template>
  <div class="zuida">
    <el-container>
      <el-header>
        <h1>渠道商管理系统</h1>
        <el-button @click="loginout()">{{adminname}}退出</el-button>
      </el-header>
      
      <el-container class="da">
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
           
          >
          <!-- 统计 -->
            <el-submenu  v-for="(v,i) in leftlist" :index="(i+1).toString()" :key="i"> 
              <template slot="title">
                <i class="el-icon-orange"></i>
                <span>{{v.title}}</span>
              </template>
              <el-menu-item-group >               
                <el-menu-item :index='`${i+1}-${i2+1}`' v-for="(v2,i2) in v.children" :key="i2"  @click="$router.push({'name':v2.name})">{{v2.title}}</el-menu-item>                                      
              </el-menu-item-group>                        
            </el-submenu>
           
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
   return{
     adminname:'',
     list:[]
   }
  },
  methods: {
    loginout(){
      localStorage.removeItem('houtaitoken')
      this.$router.push({name:'login'})
    },
     treelist(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            ...info[i],
            children: this.treelist(info, info[i]._id)
          };
          // 如果 没有子权限 -- 删除 children 属性
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
          // console.log(data);
        }
      }
      // console.log(data);
      return data;
    }
  },

  mounted () {
    // this.axios.get('/listquanxian').then(res=>{
    //   // console.log(res.data.info)
    //   this.list=res.data.info
    // })
    this.axios.get('/adminqx',{
      params:{id:JSON.parse(localStorage.getItem('houtaitoken')).id}
    }).then(res=>{
     this.list=res.data.qxarr
     this.adminname=res.data.name
    })
  },
  computed: {
    leftlist(){
     return this.treelist(this.list,0)
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.zuida {
  background: #f0f0f2;
}
.da {
  padding: 15px;
  box-sizing: border-box;
}
.el-header {
  background: #f8f8f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-aside {
  height: 100vh;
  margin-right: 20px;
  overflow: auto;
  background: #f7f7f7;
}
.el-main {
  height: 100vh;
  overflow: auto;
  background: #ffffff;
}
</style>