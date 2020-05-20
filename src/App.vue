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
