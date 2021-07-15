<template>
    <div
        v-if="overlay"
        class="overlay absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90"
    >
        <mwc-circular-progress indeterminate density="8"></mwc-circular-progress>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoadingOverlay',
    data: () => ({
        overlay: false
    }),
    created() {
        this.$events.on('overlay', (overlay: boolean) => {
            this.overlay = overlay;
        });
    }
});
</script>

<style lang="scss" scoped>
div.overlay {
    z-index: 100;
}
</style>