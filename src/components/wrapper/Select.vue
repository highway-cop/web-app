<template>
    <mwc-select :value="modelValue" :label="label" @selected="selected" fixedMenuPosition>
        <template v-for="(item, i) in items" :key="i">
            <mwc-list-item :value="item">{{ item }}</mwc-list-item>
        </template>
    </mwc-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Select',
    props: {
        modelValue: {},
        label: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        selected(e: CustomEvent) {
            const { index } = e.detail;
            this.$emit('update:modelValue', this.items[index]);
        }
    }
});
</script>
