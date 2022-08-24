<template>
    <div class="isSelected">
        <slot></slot>
    </div>

</template>

<script>
export default {
    props: {
        isSelected: {
            type: Boolean,
        }
    }
}

</script>

<style scoped>

</style>