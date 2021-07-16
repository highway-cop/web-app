<template>
    <div class="relative">
        <slot name="activator" v-bind:on="{ click }"></slot>
        <mwc-dialog
            :open="open"
            @closing.self="close"
            :style="{ '--mdc-dialog-min-width': minWidth }"
        >
            <slot></slot>
            <div slot="primaryAction">
                <slot name="action:0" v-bind:close="close"></slot>
            </div>
            <div slot="secondaryAction">
                <slot name="action:1" v-bind:close="close"></slot>
            </div>
        </mwc-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Dialog',
    props: {
        minWidth: {
            type: String,
            default: 'unset'
        }
    },
    setup() {
        const open = ref<boolean>(false);

        return { open };
    },
    methods: {
        click() {
            this.open = true;
        },
        close() {
            this.open = false;
        }
    }
});
</script>
