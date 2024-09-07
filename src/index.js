const fileInput = document.getElementById("fileInput");
const canvasBuffer = document.getElementById("canvasBuffer");
const displayColour = document.getElementById("displayColour");
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasBuffer.getContext('2d');
var sampleSize = 24;

fileInput.addEventListener('change', () =>{
    const fileList = fileInput.files;
    const file = fileList[0];

    if(file){
        const fileType = file.type;
        if(fileType){
            const reader = new FileReader();
            reader.onload = (e)=>{
                const img = new Image();
                img.src = e.target.result;
                img.onload = () =>{
                    canvasBuffer.width = sampleSize;
                    canvasBuffer.height = sampleSize;
    
                    ctx.drawImage(img, 0, 0, canvasBuffer.width, canvasBuffer.height);
                    const imageData = ctx.getImageData(0, 0, canvasBuffer.width, canvasBuffer.height).data;
                    let pixels = [];
                    for (let i = 0; i < imageData.length; i += 4) {
                        const rgba = [
                            imageData[i],
                            imageData[i + 1],
                            imageData[i + 2],
                            imageData[i + 3]
                        ];
                        pixels.push(rgba);
                    }
                    
                    let allPixelSum = [0,0,0,0];
                    for (let i = 0; i < pixels.length; i++) {
                        const pixel = pixels[i];
                        allPixelSum = allPixelSum.map((num, index) => num+pixel[index]);
                        console.log(pixel);
                    }
                    console.log(allPixelSum)
                    const finalColour = `rgba(${allPixelSum[0]/pixels.length}, ${allPixelSum[1]/pixels.length}, ${allPixelSum[2]/pixels.length}, ${allPixelSum[3]/pixels.length})`;
                    displayColour.style.backgroundColor = finalColour;
                    console.log(finalColour);
                    
                }
                
            }
            reader.readAsDataURL(file);

        }else{
            alert(`File type of ${file.name} is not supported.`);
        }
    }else{
        console.log("No file found.");
    }
});