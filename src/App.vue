<template>
    <div id="app">
        <input type="text" v-model="value">
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

<style>
</style>
