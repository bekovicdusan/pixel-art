<template>
    <div class="board-wrapper">
        <PalleteComponent :colors="colors"/>
        <TilesComponent :boardSizes="boardSizes"/>
        <DownloadButton :imageTypes="imageTypes"/>
    </div>
</template>

<script>
import PalleteComponent from '@/components/PalleteComponent.vue'
import TilesComponent from '@/components/TilesComponent.vue'
import DownloadButton from '@/components/DownloadButton.vue'
import { ref } from 'vue'

export default {
    setup() {
        const colors = ref([
            '#d2691d',
            '#fcc0cb',
            '#fee4c4',
            '#000000',
            '#fff',
            '#fba506',
            '#fefe00',
            '#021afe',
            '#7efe00',
            '#8c0b8b',
            '#f70700',
        ])
         const imageTypes = ref([
            {
                id: 0,
                type: 'png'
            },
            {
                id: 1,
                type: 'jpeg'
            },
            {
                id: 0,
                type: 'gif'
            }
        ])
        const boardSizes = ref([
            {
                id: 0,
                size: '8'
            },
            {
                id: 1,
                size: '12'
            },
            {
                id: 2,
                size: '16'
            },
            {
                id: 3,
                size: '32'
            }
        ])

        return {
            colors,
            imageTypes,
            boardSizes
        }
    },
    components: {
        TilesComponent,
        PalleteComponent,
        DownloadButton
    }
}
</script>