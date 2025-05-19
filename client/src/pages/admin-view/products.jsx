import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { toast } from "sonner";


const initialFormData = {
    image : null,
    title : '',
    desccription : '',
    category : '',
    brand : '',
    price : "",
    salePrice : '',
    totalStock : ''
}


function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const {productList} = useSelector(state=>state.adminProducts)
    const dispatch = useDispatch()

    function onSubmit(event){
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl
        })).then((data) => {
           // console.log(data)
           if(data?.payload?.success){
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
             toast(
                    <div>
                        <strong className="text-lg text-green-800">Product added successfully!</strong>
                        <p className="text-sm text-green-800 text-muted-foreground">The new product is now available in the catalog.</p>
                    </div>,
                    {
                        duration: 4000, 
                    }
                  );
           }
        })

    }

     useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  //console.log(productList, uploadedImageUrl, "productList");

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=> setOpenCreateProductsDialog(true)} className="bg-background-dark text-white inline-flex gap-2
            rounded-md px-5 py-6 text-sm font-medium cursor-pointer shadow items-center">Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet  open={openCreateProductsDialog} onOpenChange={()=> setOpenCreateProductsDialog(false)}>
                <SheetContent side="right" className="overflow-auto py-5 px-6">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        />
                        
                    <div >
                        <CommonForm
                        formData={formData} setFormData={setFormData}
                        buttonText='Add' onSubmit={onSubmit}
                        formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;