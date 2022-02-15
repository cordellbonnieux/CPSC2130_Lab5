let img = new Image()
img.src = 'monkey.png'

img.onload = () => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    canvas.width = img.width
    canvas.height = img.height

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
        if (i % 25 == 0) {
            rgba[i * 4 + 0] = 0
            rgba[i * 4 + 1] = 0
            rgba[i * 4 + 2] = 255
        }
    }
    
    let canvasModified = document.createElement('canvas')
    let ctxModified = canvasModified.getContext('2d')
    canvasModified.width = img.width
    canvasModified.height = img.height

    document.body.appendChild(canvasModified)

    ctxModified.putImageData(imgData, 0, 0)
}