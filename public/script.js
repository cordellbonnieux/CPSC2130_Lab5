//author Cordell Bonnieux
//title: CPSC 2130 Lab5
// description:
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
canvas1.width = img.width
canvas1.height = img.height

// canvas 2
const canvas2 = document.createElement('canvas')
const ctx2 = canvas2.getContext('2d')
canvas2.width = img.width
canvas2.height = img.height

// wrappers
const wrapper1 = document.createElement('div')
wrapper1.appendChild(title1)
wrapper1.appendChild(canvas1)
const wrapper2 = document.createElement('div')
wrapper2.appendChild(title2)
wrapper2.appendChild(canvas2)

// add canvases to doc
const container = document.getElementById('container')
container.appendChild(wrapper1)
container.appendChild(wrapper2)

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
        task3(canvas2, ctx2)
        title2.textContent = 'Encoding Indexed Images'
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
 * Filter for task 1
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
 * Filter for task 2
 * @param {Integer} i 
 * @param {Array} rgba 
 */
 function filterQuantize(i, rgba) {
    const palette = [
        [100, 100, 100],
        [23.5, 16.9, 6.7],
        [52.9, 40, 23.9],
        [82.7, 74.1, 54.5],
        [92.5, 78.4, 69.8],
        [58.8, 45.9, 28.2],
        [4.3, 6.3, 7.8],
        [65.5, 80, 91.4]
    ]
    const r = rgba[i * 4 + 0] 
    const g = rgba[i * 4 + 1] 
    const b = rgba[i * 4 + 2] 
    let match = []
    let lastDistance = r + g + b;
    for (let y = 0; y < palette.length; y++) {
        const differenceR = Math.pow((r - palette[y][0]), 2)
        const differenceG = Math.pow((g - palette[y][1]), 2)
        const differenceB = Math.pow((b - palette[y][2]), 2)
        const nextDistance = Math.sqrt(differenceR + differenceG + differenceB)
        if (nextDistance < lastDistance) {
            lastDistance = nextDistance
            match = [
                palette[y][0], 
                palette[y][1], 
                palette[y][2]
            ]
        }
    }
    rgba[i * 4 + 0] = match[0]
    rgba[i * 4 + 1] = match[1]
    rgba[i * 4 + 2] = match[2]
}
/**
 * Task 3 Explaination
 * @param {*} t 
 * @param {*} c 
 * @param {*} i 
 * @returns 
 */
function task3(canvas, context) {
    const max = canvas.width - 20
    const line = 20
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = (line - 2) + 'px Arial'

    // sizes
    const bits = 1280 * 720 * 3
    const bytes = (1280 * 720 * 3) / 8
    const kb = ((1280 * 720 * 3) / 8) / 1024
    
    // Q1: how should each color in the palette be encoded and how many bits does it take to encode each color? 3 bits
    const q1 = 'Q1: How should each color in the palette be encoded and how many bits does it take to encode each color?'
    const a1 = 'A1: Each of the 8 colors can be represented by 3 bits, or in JavaScript as 8 arrays of 3 string values (RGB).'
    const a1p2 = 'Thus, the image can be encoded using 3 bits per pixel (or, each pixel represented by three strings, RGB)'
    const a1p3 = '2^3bpp means that there are 8 possible colors per pixel of the image.'
    context.fillText(q1, 10, line, max)
    context.fillText(a1, 10, line * 2, max)
    context.fillText(a1p2, 10, line * 3, max)
    context.fillText(a1p3, 10, line * 4, max)

    // Q2: how is each pixel encoded
    const q2 = 'Q2: How is each pixel encoded? (describe what information must be recorded to represent each pixel).'
    const a2 = 'A2: Each pixel\'s color from the original image needs to be compared with all 8 of the chosen colors in the palette.'
    const a2p2 = 'The replacement color, who\'s summed RGB values have the shortest average distance from the original pixel\'s (RGB)color, will be used.'
    context.fillText(q2, 10, line * 6, max)
    context.fillText(a2, 10, line * 7, max)
    context.fillText(a2p2, 10, line * 8, max)

    // Q3: how many bits does it take to encode each ? 3bits?
    const q3 = 'Q3: How many bits does it take to encode each pixel?'
    const a3 = 'A3: Each pixel can be encoded using 3 bits(2^3bpp), which can represent all 8 colors in the palette.'
    context.fillText(q3, 10, line * 10, max)
    context.fillText(a3, 10, line * 11, max)

    // Q4: What would the final file size of this image be, in bits? In bytes? In kibibytes? (Explain each step in calculating your results.)
    const q4 = 'Q4: What would the final file size of this image be, in bits? In bytes? In kibibytes? (Explain each step in calculating your results.)'
    const a4 = 'A4: The final image size will be calculated using: pixel-image-height * pixel-image-width * bits-per-pixel = image-size-in-bits'
    const a4p2 = 'So, in my case this image is 1280px by 720px and it will be encoded at a pixel depth of 3 bits-per-pixel (the calculations below assume there is no other data in the image)'
    const a4p3 = 'bits = ' + bits + ', bytes = ' + bytes + ', kilobytes = ' + kb
    context.fillText(q4, 10, line * 13, max)
    context.fillText(a4, 10, line * 14, max)
    context.fillText(a4p2, 10, line * 15, max)
    context.fillText(a4p3, 10, line * 16, max)

    // Q5: It may be helpful to think about how your proposed encoding scheme would be decoded. What information do you need to encode to fully reconstruct the image?
    const q5 = 'Q5: It may be helpful to think about how your proposed encoding scheme would be decoded. What information do you need to encode to fully reconstruct the image?'
    const a5 = 'A5: In order to fully reconstruct the image the actual colors themselves also need to be represented and stored in the image file, so the pixels have colors to reference.'
    const a5p2 = 'This would require 24 bits (RGB = 8*3) to represent each of the 8 color strings, meaning an additional 192 (24 * 8) bits will be needed to store the color information.'
    context.fillText(q5, 10, line * 18, max)
    context.fillText(a5, 10, line * 19, max)
    context.fillText(a5p2, 10, line * 20, max)
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
    context.clearRect(0, 0, canvas.width, canvas.height)
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
            case 'task3': task3(canvas, context)
                break;
        }
    }
    // place filter on context/canvas
    context.putImageData(data, 0, 0)
}
