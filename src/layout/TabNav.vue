<template>

    <div class="container-fluid">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li v-for="tab in tabs" :key="tab" class="nav-item" role="presentation">
                <button class="nav-link" data-bs-toggle="tab" type="button" role="tab"  aria-selected="true" :class="{ active: tab === selected }" @click="setTab(tab)">
                    {{tab}}
                </button>
            </li>

        </ul>
        <slot class="tab-content" id="myTabContent"></slot>
    </div>
</template>

<script>


export default {
    props: {
        tabs: {
            type: Array,
            required: true,
        },
        selected: {
            type: String,
            required:true,
        }
    },
    methods: {
        setTab(tab) {
            this.$emit('selected',tab);
        }
    }
}

</script>

<style>


</style>