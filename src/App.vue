<template>
    <div id="app">
        <!-- <input type="text" v-model="value"> -->
        <textarea class="textarea" rows="10" v-model="value"></textarea>
        <Keyboard v-model="value" layout='normal'></Keyboard>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            value: ''
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
