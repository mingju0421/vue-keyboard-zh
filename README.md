# vue-keyboard-zh

```JavaScript
<template>
    <div id="app">
        <textarea class="textarea" rows="10" v-model="value" @focus="show"></textarea>
        <Keyboard layout='numeric' :input="input" v-if="visible" :cancel='cancel'></Keyboard>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            value: '',
            input: null,
            visible: false
        }
    },
    methods: {
        show(e) {
            this.input = e.target
            if (!this.visible) this.visible = true
        },
        cancel() {
            this.visible = false
        }
    }
}
</script>

<style scoped>
.textarea {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
}
</style>
```

| 参数   | 说明                                             | 类型                                 | 可选值         | 默认值 |
| :----- | :----------------------------------------------- | :----------------------------------- | :------------- | :----- |
| input  | 触发元素                                         | HTMLInputElement/HTMLTextAreaElement | -              | -      |
| layout | 键盘类型,normal: 普通字母键盘, numeric: 数字键盘 | string                               | normal/numeric | normal |
| cancel | 关闭键盘                                         | Function                             | -              | -      |

> 本人菜鸟, 多多指教
