import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";


function ProductDetailsDialog({open, setOpen, productDetails}){
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 sm:max-w-[80vw] lg:max-w-[70vw]">
                <DialogTitle className="hidden"></DialogTitle>
                <div className="relative overflow-hidden rounded-lg">
                    <img
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600} height={600}
                    className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-gray-600 text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                       <div className="flex items-center justify-between">
                            <p
                            className={`text-3xl font-bold text-primary ${
                                productDetails?.salePrice > 0 ? "line-through" : ""
                            }`}
                            >
                            ${productDetails?.price}
                            </p>
                            {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-gray-700">
                                ${productDetails?.salePrice}
                            </p>
                            ) : null}
                        </div>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default ProductDetailsDialog;