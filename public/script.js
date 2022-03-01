// the image
const img = new Image()
img.src = 'monkey.png'
// canvas 1
const canvas1 = document.createElement('canvas')
const ctx1 = canvas1.getContext('2d')
// canvas 2
const canvas2 = document.createElement('canvas')
const ctx2 = canvas2.getContext('2d')
// add canvases to doc
const container = document.getElementById('container')
container.appendChild(canvas1)
container.appendChild(canvas2)
// add controls
const controls = document.getElementById('controls')
const buttons = ['task1', 'task2', 'task3', 'task4', 'task5', 'task6']
buttons.forEach((task) => {
    const wrap = create('div')
    wrap.id = task
    const text = create('p')
    text.textContent = task
    // add event listener next
    wrap.appendChild(text)
    controls.appendChild(wrap)
})

// create helper function
function create(t, c, i) {
    const html = document.createElement(t)
    if (c) {
        html.className = c
    }
    if (i) {
        html.id = i
    }
    return html
}

/*
img.onload = () => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    //canvas.width = img.width
    //canvas.height = img.height
    console.log(canvas.width, canvas.height)
    
    document.body.appendChild(canvas)

    ctx.drawImage(img, 0, 0)

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // array of rgba values for all pixels in the image
    let rgba = imgData.data

    let numberOfPixels = img.width * img.height

    for (let i = 0; i < numberOfPixels; i++) {
        let red = rgba[i * 4 + 0]
        let green = rgba[i * 4 + 1]
        let blue = rgba[i * 4 + 2]
        let alpha = rgba[i * 4 + 3]

        // every 25th pixel
        // new print effect
        filterNewsprint(i, rgba)

        //THRESHOLD FILTER
        filterThreshold(red, green, blue, rgba, i)
    }
    
    let canvasModified = document.createElement('canvas')
    let ctxModified = canvasModified.getContext('2d')
    canvasModified.width = img.width
    canvasModified.height = img.height

    document.body.appendChild(canvasModified)

    ctxModified.putImageData(imgData, 0, 0)
}
*/

function filterNewsprint(i, rgba) {
    if (i % 25 == 0) {
        rgba[i * 4 + 0] = 0
        rgba[i * 4 + 1] = 0
        rgba[i * 4 + 2] = 255
    }
}

function filterThreshold(red, green, blue, rgba, i) {
    let brightness = red + green + blue
    let threshold = (3 * 255) / 2
    if (brightness > threshold) {
        rgba[i * 4 + 0] = 255
        rgba[i * 4 + 1] = 255
        rgba[i * 4 + 2] = 255
    } else {
        rgba[i * 4 + 0] = 0
        rgba[i * 4 + 1] = 0
        rgba[i * 4 + 2] = 0
    }
}

