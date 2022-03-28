<template>
    <div class="pallete-wrapper">
        <div
            class="pallete-color"
            v-for="color in colors"
            :key="color"
            :style="'background-color: ' + color + ';'"
            :color="color"
            @click="store.methods.selectColor"
        ></div>
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    props: {
        colors: {
            required: true, // the component assumes it will receive colors data from the parent component
            type: Array
        }
    },
    setup() {
        const store = inject('store')

        return {
            store
        }
    }
}
</script>

<style lang="scss">
    .pallete-wrapper {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        .pallete-color {
            width: 30px;
            height: 30px;
            margin-right: 5px;
            border: 2px solid transparent;
            &:hover {
                cursor: pointer;
                border: 2px solid #41b883;
                transition: .23s;
            }
        }
        .pallete-color.active {
            border: 2px solid #41b883;
        }
    }
</style>