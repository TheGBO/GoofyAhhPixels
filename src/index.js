const fileInput = document.getElementById("fileInput");
const canvasBuffer = document.getElementById("canvasBuffer");
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasBuffer.getContext('2d');
var sampleSize = 24;

setCanvasSample();

function setCanvasSample(){
    canvasBuffer.width = sampleSize;
    canvasBuffer.height = sampleSize;
}

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
                    setCanvasSample
    
                    ctx.drawImage(img, 0, 0, canvasBuffer.width, canvasBuffer.height);
                    const imageData = ctx.getImageData(0, 0, canvasBuffer.width, canvasBuffer.height).data;
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