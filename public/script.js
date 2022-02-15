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
}