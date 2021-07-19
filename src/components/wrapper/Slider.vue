<template>
    <mwc-slider
        :pin="pin"
        :markers="markers"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @change="input"
    ></mwc-slider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Slider',
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        pin: {
            type: Boolean,
            default: false
        },
        markers: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 0
        }
    },
    methods: {
        input(e: CustomEvent) {
            this.$emit('update:modelValue', e.detail.value);
        }
    }
});
</script>

<style lang="scss" scoped>
mwc-slider {
    --mdc-theme-text-primary-on-dark: white;
    --mdc-theme-secondary: var(--mdc-theme-primary, #6200ee);
}
</style>
