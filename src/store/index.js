import { reactive } from 'vue'
import html2canvas from 'html2canvas'

//created an external store file in order to enable it through the entire app
//if I had only used a single component for the entire project, then this would not be necessary

const state = reactive({
    boardSize: '12',
    board: new Array(12),
    selectedColor: '',
    targetColor: '',
    selectedTool: 'single-tile',
    chosenImgType: 'png'
})

const methods = {
    //handles selection from color pallette
    selectColor (e) {
        const allColors = document.querySelectorAll('.pallete-color')
        allColors.forEach(item => {
            item.classList.remove('active')
        })
        e.target.classList.add('active')

        state.selectedColor = e.target.attributes.color.value.substring(1)
    },
    //handles changes in board size
    chooseBoardSize (e) {
        let currentSelection = e.target.value
        state.boardSize = currentSelection
        state.board.length = state.boardSize
        const allTiles = document.querySelectorAll('.tile')
        allTiles.forEach(item => {
            item.classList = ['tile color-fff']
        })
    },
    //handles selection of painting tool
    choosePaintTool (e) {
        state.selectedTool = e.target.value
        document.querySelector('.tiles-wrapper').classList = ['tiles-wrapper']

        if (state.selectedTool === 'single-tile') {
            document.querySelector('.tiles-wrapper').classList.add('single-tile')
        } else {
            document.querySelector('.tiles-wrapper').classList.add('fill')
        }
    },
    //handles desired image format
    chooseImageType (e) {
        state.chosenImgType = e.target.value
    },
    //handles coloring of a single tile
    colorTile (e) {
        if (state.selectedTool === 'single-tile') {
            e.target.classList = ['tile']
            e.target.classList.add(`color-${state.selectedColor}`)
        } else if (state.selectedTool === 'fill') {
            methods.fillTiles(e.target)
        }
    },
    //handles coloring an area of neighbouring pixels
    fillTiles (el) {
        state.targetColor = el.classList[1].split('-')[1]

        let originX = el.attributes.location.value
        let originY = el.parentElement.attributes.rowLocation.value

        methods.through(originX, originY);
    },
    //recursive function that checks and colors neighbouring tiles
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
    //handles download
    downloadImage () {
        const pixelArt = document.getElementById('pixel-art')
        pixelArt.classList = [`tiles-wrapper ${state.selectedTool} no-border`] //temporarily remove borders so as to not show on the downloaded picture (optional, could be removed)
        html2canvas(pixelArt).then(canvas => { //here is the 3rd party library that helps convert html element into canvas
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
            pixelArt.classList = [`tiles-wrapper ${state.selectedTool}`] //returning borders
        })
    }
}

export default {
    state,
    methods
}