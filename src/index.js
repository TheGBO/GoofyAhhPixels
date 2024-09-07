const fileInput = document.getElementById("fileInput");
const canvasBuffer = document.getElementById("canvasBuffer");
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvasBuffer.getContext('2d');

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
                    canvasBuffer.width = img.width;
                    canvasBuffer.height = img.height;
    
                    ctx.drawImage(img, 0, 0);
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