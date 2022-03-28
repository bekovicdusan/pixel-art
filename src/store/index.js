import { reactive } from 'vue'
import html2canvas from 'html2canvas'

const state = reactive({
    boardSize: '12',
    board: new Array(12),
    selectedColor: '',
    targetColor: '',
    selectedTool: 'single-tile',
    chosenImgType: 'png'
})

const methods = {
    selectColor (e) {
        const allColors = document.querySelectorAll('.pallete-color')
        allColors.forEach(item => {
            item.classList.remove('active')
        })
        e.target.classList.add('active')

        state.selectedColor = e.target.attributes.color.value.substring(1)
    },
    chooseBoardSize (e) {
        let currentSelection = e.target.value
        state.boardSize = currentSelection
        state.board.length = state.boardSize
        const allTiles = document.querySelectorAll('.tile')
        allTiles.forEach(item => {
            item.classList = ['tile color-fff']
        })
    },
    choosePaintTool (e) {
        state.selectedTool = e.target.value
        document.querySelector('.tiles-wrapper').classList = ['tiles-wrapper']

        if (state.selectedTool === 'single-tile') {
            document.querySelector('.tiles-wrapper').classList.add('single-tile')
        } else {
            document.querySelector('.tiles-wrapper').classList.add('fill')
        }
    },
    chooseImageType (e) {
        state.chosenImgType = e.target.value
    },
    colorTile (e) {
        if (state.selectedTool === 'single-tile') {
            e.target.classList = ['tile']
            e.target.classList.add(`color-${state.selectedColor}`)
        } else if (state.selectedTool === 'fill') {
            methods.fillTiles(e.target)
        }
    },
    fillTiles (el) {
        state.targetColor = el.classList[1].split('-')[1]

        let originX = el.attributes.location.value
        let originY = el.parentElement.attributes.rowLocation.value

        methods.through(originX, originY);
    },
    through (originX, originY) {
        const tileToColor = document.querySelector(`.tile-row[rowLocation='${originY}'] .tile[location='${originX}']`)
        tileToColor.classList = [`tile color-${state.selectedColor}`]

        const upNeighbour = document.querySelector(`.tile-row[rowLocation='${parseInt(originY)-1}'] .tile[location='${originX}']`)
        const downNeighbour = document.querySelector(`.tile-row[rowLocation='${parseInt(originY)+1}'] .tile[location='${originX}']`)
        const leftNeighbour = document.querySelector(`.tile-row[rowLocation='${originY}'] .tile[location='${parseInt(originX)-1}']`)
        const rightNeighbour = document.querySelector(`.tile-row[rowLocation='${originY}'] .tile[location='${parseInt(originX)+1}']`)

        if (upNeighbour) {
            if (upNeighbour.classList[1] !== `color-${state.selectedColor}` && upNeighbour.classList[1] === `color-${state.targetColor}`) {
                this.through(originX, parseInt(originY)-1)
            } 
        }
        if (downNeighbour) {
            if (downNeighbour.classList[1] !== `color-${state.selectedColor}` && downNeighbour.classList[1] === `color-${state.targetColor}`) {
                this.through(originX, parseInt(originY)+1)
            } 
        }
        if (leftNeighbour) {
            if (leftNeighbour.classList[1] !== `color-${state.selectedColor}` && leftNeighbour.classList[1] === `color-${state.targetColor}`) {
                this.through(parseInt(originX)-1, originY)
            } 
        }
        if (rightNeighbour) {
            if (rightNeighbour.classList[1] !== `color-${state.selectedColor}` && rightNeighbour.classList[1] === `color-${state.targetColor}`) {
                this.through(parseInt(originX)+1, originY)
            }
        }
    },
    downloadImage () {
        const pixelArt = document.getElementById('pixel-art')
        pixelArt.classList = [`tiles-wrapper ${state.selectedTool} no-border`]
        html2canvas(pixelArt).then(canvas => {
            const downloadLink = document.createElement('a')

            if (state.chosenImgType === 'png') {
                downloadLink.download = 'pixel-art.png'
                downloadLink.href = canvas.toDataURL("image/png", 1)
            } else if (state.chosenImgType === 'jpeg') {
                downloadLink.download = 'pixel-art.jpeg'
                downloadLink.href = canvas.toDataURL("image/jpeg", 1)
            } else if (state.chosenImgType === 'gif')  {
                downloadLink.download = 'pixel-art.gif'
                downloadLink.href = canvas.toDataURL("image/gif", 1)
            }

            downloadLink.click()
            pixelArt.classList = [`tiles-wrapper ${state.selectedTool}`]
        })
    }
}

export default {
    state,
    methods
}