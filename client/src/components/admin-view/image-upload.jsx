import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";



function ProductImageUpload({
    imageFile, setImageFile,
    uploadedImageUrl, setUploadedImageUrl,
    setImageLoadingState
}){

    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage(){
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

     async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

    

      useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto mb-3 mt-4">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
           <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed border-gray-400 rounded-lg p-4">
                <Input id="image-upload"
                onChange={handleImageFileChange} 
                className="hidden"
                type="file"  ref={inputRef}/>
                {
                    !imageFile ? 
                    <Label htmlFor="image-upload" className="flez flex-col items-center 
                    cursor-pointer
                    justify-center h-32">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foregound mb-2"/>
                        <span>Drag & drop or click to upload image</span>
                    </Label> : <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 mr-2 h-8"/>
                        </div>
                        <p className="text-sm font-medium break-words max-w-[180px]">{imageFile.name}</p>
                        <Button variant="ghost" size="icon"
                        onClick={handleRemoveImage}
                        className="text-muted-foreground cursor-pointer hover:text-foreground">
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                }
            </div> 
        </div>
    );
};

export default ProductImageUpload;