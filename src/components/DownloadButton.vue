<template>
    <div class="download-wrapper">
        <div class="image-type-selector-wrapper">
            <label class="radio-label" v-for="type in imageTypes" :key="type.id">{{ type.type }}
                <input 
                    type="radio" 
                    @input="store.methods.chooseImageType"
                    :checked="type.type === 'png' ? 'checked' : null"
                    :value="type.type" 
                    name="imageType"
                >
            </label>
        </div>
        <div class="download-btn-wrapper">
            <a class="download-btn" id="download" @click="store.methods.downloadImage">
                Download
            </a>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    props: {
        imageTypes: {
            required: true,
            type: Object
        }
    },
    setup() {
        const store = inject('store')

        return {
            store,
        }
    },
}
</script>

<style lang="scss">
    .download-wrapper {
        .image-type-selector-wrapper {
            margin: 20px;
            label {
                margin-right: 15px;
                font-size: 18px;
                cursor: pointer;
                input {
                    margin: 0;
                    cursor: pointer;
                }
            }
        }
        .download-btn-wrapper {
            margin-top: 15px;
            .download-btn {
                font-size: 1rem;
                letter-spacing: normal;
                line-height: 1;
                background: 0 0;
                border: 1px solid rgba(255,67,46,.6);
                color: #FF432E;
                display: inline-block;
                font-weight: 400;
                outline: 0!important;
                padding: 24px 36px;
                position: relative;
                text-transform: uppercase;
                transition: all .3s ease;
                z-index: 99;
                &:hover {
                    cursor: pointer;
                        background-color: #252E34;
                        border-color: #252E34;
                        color: #fff;
                }
            }
        }
    }
</style>