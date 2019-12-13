<template>
    <div>
       <spgg v-for="(v,i) in x" :key="i"></spgg>
       <el-button @click="add">新增规格</el-button>
    </div>
</template>
<script>

import spgg from "@/components/spgl/spgg.vue"
export default {
    components: {        
        spgg
    },
    data () {
        return {
            x:1
        }
    },
    methods: {
        add(){
           this.x+=1
        }
    }
}
</script>
<style >
*{
    margin: 0;
    padding: 0;
}
    .sp-item{
        display: flex;
        padding: 20px;
         box-sizing: border-box;

    }
    .left{
        padding-right: 45px;
        box-sizing: border-box;
        border-right: 1px solid;
        margin-right: 45px;
    }
</style>