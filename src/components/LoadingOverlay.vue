<template>
    <transition name="overlay">
        <div
            v-if="overlay"
            class="z-100 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90"
        >
            <mwc-circular-progress indeterminate density="8"></mwc-circular-progress>
        </div>
    </transition>
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

<style lang="scss">
.overlay-enter-active,
.overlay-leave-active {
    @apply transition-opacity duration-500;
}

.overlay-enter,
.overlay-leave-to {
    @apply opacity-0;
}
</style>