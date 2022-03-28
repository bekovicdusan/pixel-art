<template>
    <div class="tiles-component-wrapper">
        <div class="selector-wrapper">
            <div class="boardSize">
                <label class="radio-label" v-for="size in boardSizes" :key="size.id" >{{size.size}}x{{size.size}}
                    <input type="radio" @input="store.methods.chooseBoardSize" :checked="size.size === '12' ? 'checked' : null" :value="size.size" name="boardSize">
                </label>
            </div>
            <div class="paint-tool">
                <label class="radio-label draw">
                    <img src="../assets/draw.png" alt="">
                    <input type="radio" @input="store.methods.choosePaintTool" value="single-tile" checked name="paintTool">
                </label>
                <label class="radio-label bucket">
                    <img src="../assets/bucket.png" alt="">
                    <input type="radio" @input="store.methods.choosePaintTool" value="fill" name="paintTool">
                </label>
            </div>
        </div>
        <div class="tiles-wrapper single-tile" id="pixel-art">
            <div class="tile-row" v-for="(row, index) in store.state.board" :rowLocation="index" :key="index">
                <div class="tile color-fff" v-for="(tile, index) in store.state.board" :location="index" :key="index" @click="store.methods.colorTile"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    props: {
        boardSizes: {
            required: true,
            type: Object
        }
    },
    setup() {
        const store = inject('store')
        return {
            store
        }
    },
}
</script>

<style lang="scss">
    .tiles-component-wrapper {
        .selector-wrapper {
            margin-top: 20px;
            .boardSize{
                margin-bottom: 15px;
                .radio-label {
                    cursor: pointer;
                    margin-right: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    input {
                        margin: 0;
                        cursor: pointer;
                    }
                }
            }
            .paint-tool {
                margin-top: 10px;
                .radio-label.draw {
                    margin-right: 35px;
                }
                .radio-label.draw, .radio-label.bucket {
                    img {
                        width: 45px;
                        height: 45px;
                    }
                }
            }
        }
        .tiles-wrapper {
            width: fit-content;
            margin: auto;
            margin-top: 20px;
            border-right: 1px solid black;
            border-bottom: 1px solid black;
            .tile-row {
                display: flex;
                justify-content: center;
                .tile {
                    width: 32px;
                    height: 32px;
                    border-top: 1px solid black;
                    border-left: 1px solid black;
                    background-color: white;
                }
                .tile.color-f70700 {
                    background-color: #f70700;
                }
                .tile.color-8c0b8b {
                    background-color: #8c0b8b;
                }
                .tile.color-7efe00 {
                    background-color: #7efe00;
                }
                .tile.color-021afe {
                    background-color: #021afe;
                }
                .tile.color-fefe00 {
                    background-color: #fefe00;
                }
                .tile.color-fba506 {
                    background-color: #fba506;
                }
                .tile.color-fff {
                    background-color: #fff;
                }
                .tile.color-000000 {
                    background-color: #000000;
                }
                .tile.color-fee4c4 {
                    background-color: #fee4c4;
                }
                .tile.color-fcc0cb {
                    background-color: #fcc0cb;
                }
                .tile.color-d2691d {
                    background-color: #d2691d;
                }
                .tile.border-right {
                    border-right: 1px solid black;
                }
            }
        }
        .tiles-wrapper.single-tile {
            cursor: pointer;
        }
        .tiles-wrapper.fill {
            cursor: cell;
        }
        .tiles-wrapper.single-tile.no-border,
        .tiles-wrapper.fill.no-border {
            border-right: 0 solid transparent;
            border-bottom: 0 solid transparent; 
            border-left: 0 solid transparent;
            border-top: 0 solid transparent;
            .tile-row {
                .tile {
                    border-top: 1px solid transparent;
                    border-left: 1px solid transparent;
                }
            }
        }
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
    }
</style>