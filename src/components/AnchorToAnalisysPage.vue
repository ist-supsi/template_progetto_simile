<template>
    <a :class="classes" href="/#/admin/analisi" @click="click(data)" :title="name">
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
            click: {
                type: Function,
                default: () => {}
            },
            iclasses: {
                type: Object,
                default: () => ({
                  'fa': true,
                  'fa-line-chart': true
                }),
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
