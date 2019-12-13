<template>
     <div class="sp-item">
            <div class="left">
                <button>X</button>
                <input type="text">
            </div>
            <div class="right">             
                <spcs v-for="(v,i) in y" :key="i"></spcs>
                <button @click="add">新增规格参数</button>
            </div>
            
        </div>
</template>
<script>
import spcs from "@/components/spgl/spcs.vue"
export default {
    data(){
        return{
            y:1
        }
    },
      components: {
        spcs
        
    },
    methods: {
        add(){
            this.y+=1
        }
    }
}
</script>