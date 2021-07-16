<template>
    <div class="relative">
        <div ref="slot">
            <slot name="activator" v-bind:on="{ click }"></slot>
        </div>
        <mwc-menu v-bind="{ open, anchor }" @closing="closing">
            <slot></slot>
        </mwc-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Menu',
    setup() {
        const anchor = ref<Element>();
        const open = ref<boolean>(false);

        return { anchor, open };
    },
    mounted() {
        const { children } = this.$refs['slot'] as HTMLElement;
        this.anchor = children[0];
    },
    methods: {
        click() {
            this.open = true;
        },
        closing() {
            this.open = false;
        }
    }
});
</script>
