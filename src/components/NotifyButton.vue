<template>
    <a :class="classes" @click="click(data)" :title="name">
        <span>
            <i :class="iclasses" aria-hidden="true"></i>
        </span>
        &nbsp;
        {{ name }}
    </a>
</template>
<script>
    export default {
        props: {
            data: {},
            name: {},
            iclasses: {
                type: Object,
                default: () => ({
                  'fa': true,
                  'fa-info-circle': true
                }),
            },
            click: {
                type: Function,
                default: () => {}
            },
            classes: {
                type: Object,
                default: () => ({
                    'btn': true,
                    'btn-primary': true,
                    'btn-sm': true
                }),
            },
        }
    }
</script>
