<template>
    <div id="app">
        <textarea class="textarea" rows="10" v-model="value" @focus="show"></textarea>
        <input type="text" v-model="newvalue" @focus="show">
        <Keyboard layout='normal' :input="input" v-if="visible" :cancel='cancel'></Keyboard>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            value: '',
            newvalue: '',
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
        },
        offsetTop(el) {
            let offsetTop = 0
            while (el && el.tagName !== 'BODY') {
                offsetTop += el.offsetTop
                el = el.offsetParent
            }
            return offsetTop
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
