<template>
    <button
        type="button"
        data-toggle="modal"
        @click="click(data)"
        class="btn btn-primary btn-sm"
        data-target="#exampleModal">
        View
    </button>
</template>
<script>

    export default {
        props: {
            data: {},
            name: {},
            click: {
                type: Function,
                default: () => {}
            },
            meta: {},
            classes: {},
        },
        
    }
    
</script>
