<template>
    <div class="w-full h-full flex flex-col">
        <mwc-top-app-bar>
            <div slot="title">Acidentes</div>
            <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>

            <Dialog slot="actionItems" min-width="300px" v-if="webview">
                <template v-slot:activator="{ on }">
                    <mwc-icon-button icon="near_me" v-on="on"></mwc-icon-button>
                </template>

                <div class="text-xl font-semibold">Acidentes próximos</div>

                <div class="w-full flex flex-col">
                    <div class="text-base">Raio (KM):</div>

                    <Slider v-model="range" :step="10" :min="10" :max="80" pin markers></Slider>
                </div>

                <template v-slot:action:0="{ close }">
                    <mwc-button @click="searchNearBy().then(close)">Buscar</mwc-button>
                </template>
            </Dialog>

            <Dialog slot="actionItems" min-width="300px">
                <template v-slot:activator="{ on }">
                    <mwc-icon-button icon="filter_alt" v-on="on"></mwc-icon-button>
                </template>

                <div class="text-xl font-semibold">Filtros</div>

                <Select class="w-full" label="Município" :items="cities" v-model="city"></Select>

                <template v-slot:action:0="{ close }">
                    <mwc-button @click="search().then(close)">Aplicar</mwc-button>
                </template>
            </Dialog>
        </mwc-top-app-bar>

        <GoogleMap map-id="77e24214140f9918" :lat="-25" :lng="-50" ref="map"></GoogleMap>
    </div>
    <LoadingOverlay></LoadingOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Dialog from '~/components/wrapper/Dialog.vue';
import Select from '~/components/wrapper/Select.vue';
import Slider from '~/components/wrapper/Slider.vue';

import GoogleMap from '~/components/GoogleMap.vue';
import LoadingOverlay from '~/components/LoadingOverlay.vue';

import CITIES from '~/assets/cities.json';

export default defineComponent({
    name: 'App',
    components: {
        Dialog,
        Select,
        Slider,
        GoogleMap,
        LoadingOverlay
    },
    data: () => ({
        city: '',
        range: 10
    }),
    computed: {
        cities: () => CITIES,
        webview: () => !!window.flutter_inappwebview
    },
    methods: {
        search() {
            const map = this.$refs['map'] as InstanceType<typeof GoogleMap>;

            this.$overlay(true);

            return this.$service.getByCity(this.city)
                .then(markers => {
                    map.clear();
                    markers.forEach(({ location }) => map.addMarker(location));
                })
                .finally(() => {
                    this.$overlay(false);
                });
        },
        async searchNearBy() {
            const map = this.$refs['map'] as InstanceType<typeof GoogleMap>;

            this.$overlay(true);

            try {
                const location: [number, number] = await window.flutter_inappwebview
                    .callHandler('getNativeLocation');

                const markers = await this.$service.getNearBy(location[0], location[1], this.range * 1000);

                if (!markers.length) {
                    return alert('Não foram encontrados acidentes próximos');
                }

                map.clear();
                markers.forEach(({ location }) => map.addMarker(location));
            } finally {
                this.$overlay(false);
            }
        }
    }
});
</script>

<style lang="scss">
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

* {
    box-sizing: border-box;
}

html {
    overflow: hidden;
}

body {
    width: 100vw;
    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;
}

div#app {
    width: 100%;
    height: 100%;
}
</style>
