<template>
    <div class="w-full h-full" ref="map"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'GoogleMap',
    props: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        zoom: {
            type: Number,
            default: 8
        }
    },
    setup() {
        const map = ref<google.maps.Map>();
        const markers: google.maps.Marker[] = [];

        return { map, markers };
    },
    mounted() {
        const element = this.$refs['map'] as HTMLElement;

        this.map = new google.maps.Map(element, {
            center: {
                lat: this.lat,
                lng: this.lng
            },
            zoom: this.zoom
        });
    },
    methods: {
        addMarker(position: google.maps.LatLng) {
            this.markers.push(
                new google.maps.Marker({ position, map: this.map })
            );
        },
        clear() {
            this.markers.forEach(marker =>
                marker.setMap(null)
            );

            this.markers = [];
        }
    }
});
</script>
