/**
 * Preload
 */
// the image
const img = new Image()
img.src = 'monkey.png'

// titles
const title1 = document.createElement('h1')
title1.textContent = 'Original Image'
const title2 = document.createElement('h1')
title2.textContent = 'Filtered Image'

// canvas 1
const canvas1 = document.createElement('canvas')
const ctx1 = canvas1.getContext('2d')

// canvas 2
const canvas2 = document.createElement('canvas')
const ctx2 = canvas2.getContext('2d')

// add canvases to doc
const container = document.getElementById('container')
container.appendChild(title1)
container.appendChild(title2)
container.appendChild(canvas1)
container.appendChild(canvas2)

// add controls
const controls = document.getElementById('controls')
const buttons = ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7']
buttons.forEach((task) => {
    const wrap = create('div')
    wrap.id = task
    const text = create('p')
    text.textContent = task
    wrap.addEventListener('click', () => handle(task))
    wrap.appendChild(text)
    controls.appendChild(wrap)
})

/**
 * On Start
 */
// when the img is ready
img.onload = () => {
    // draw the pictures to the canvases
    ctx1.drawImage(img, 0, 0, canvas1.width, canvas1.height)
    ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height)
}

/**
 * Handle Events
 */
/**
 * Handle - handle button clicks
 * @param {String} task 
 */
function handle(task) {
    // clear and reset the canvas
    clearCanvas(canvas2, ctx2, img)
    // use a filter
    if (task == 'task1') {
        applyFilter(canvas2, ctx2, img, 'wacky')
        title2.textContent = 'Wacky Filter'
    } else if (task == 'task2') {
        applyFilter(canvas2, ctx2, img, 'quantize')
        title2.textContent = 'Color Quantization'
    } else if (task == 'task3') {

    } else if (task == 'task4') {

    } else if (task == 'task5') {

    } else if (task == 'task6') {

    }
}

/**
* FILTERS
* params: i, rgba
*/
/**
 * Wacky Filter - A Completely Random Filter
 * @param {Integer} i 
 * @param {Array} rgba 
 */
function filterWacky(i, rgba) {
    rgba[i * 4 + 0] *= Math.random() * Math.random() + Math.random()
    rgba[i * 4 + 1] *= Math.random() * Math.random() + Math.random()
    rgba[i * 4 + 2] *= Math.random() * Math.random() + Math.random()
    rgba[i * 4 + 3] *= Math.random() * Math.random() + Math.random()
}

/**
 * Color Quantization Filter
 * @param {Integer} i 
 * @param {Array} rgba 
 */
 function filterQuantize(i, rgba) {
    rgba[i * 4 + 0] 
    rgba[i * 4 + 1] 
    rgba[i * 4 + 2] 
    rgba[i * 4 + 3] 
}

/**
 * HELPER FUCTIONS
 */
/**
 * Create - an html element
 * @param {*} t tag
 * @param {*} c class
 * @param {*} i id
 * @returns html element
 */
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

/**
 * Clears & resets the canvas
 * @param {node} canvas 
 * @param {object} context 
 * @param {Image} image 
 */
function clearCanvas(canvas, context, image) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
}

/**
 * Apply a filter
 * @param {node} canvas 
 * @param {object} context 
 * @param {Image} image 
 * @param {String} filter
 */
function applyFilter(canvas, context, image, filter) {
    // get data
    const data = context.getImageData(0, 0, canvas.width, canvas.height)
    // get rgba
    const rgba = data.data
    // get pixels
    const pixels = image.width * image.height
    // iterrate over pixels and apply filter
    for (let i = 0; i < pixels; i++) {
        const red = rgba[i * 4 + 0]
        const green = rgba[i * 4 + 1]
        const blue = rgba[i * 4 + 2]
        const alpha = rgba[i * 4 + 3]

        // select filter
        switch (filter) {
            case 'wacky': filterWacky(i, rgba)
                break;
            case 'quantize': filterQuantize(i, rgba)
                break;
        }
    }
    // place filter on context/canvas
    context.putImageData(data, 0, 0)
}
