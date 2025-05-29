import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {fetchProductDetails } from "@/store/shop/products-slice";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";


function SearchProducts(){

    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const {searchResults} = useSelector((state)=> state.shopSearch);
    const {cartItems} = useSelector((state)=> state.shopCart);
    const {user} = useSelector((state)=>state.auth);
    const {productDetails} = useSelector((state)=> state.shopProducts);

    function handleAddToCart(getCurrentProductId, getTotalStock){
    let getCartItems = cartItems.items || [] ;

    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item=>item.productId === getCurrentProductId);
      if(indexOfCurrentItem > -1){
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if(getQuantity + 1 > getTotalStock){
             toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-red-600">
                        {`Only ${getQuantity} quantity can be added for this item`}
                      </p>
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
                  return;
          }
      }
      
      
    }

    dispatch(addToCart(
      {
        userId: user?.id, 
        productId: getCurrentProductId, 
        quantity: 1 
      }))
    .then((data)=> {
      if(data?.payload.success){
        dispatch(fetchCartItems(user?.id));
          toast(
                    <div className="flex gap-3 items-center">
                      <p className="text-[16px] font-semibold text-green-600">Product added to your cart.</p>
                      <CircleCheck stroke="#16a34a"  className="w-5 h-5" />
                    </div>,
                    {
                        duration: 8000, 
                    }
                  );
      }
    })
  };

   function handleGetProductDetails(getCurrentProductId){
      //console.log(getCurrentProductId);
      dispatch(fetchProductDetails(getCurrentProductId))
    }

    useEffect(()=> {
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3 ){
            setTimeout(()=> {
                setSearchParams(new URLSearchParams(`?leyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?leyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

    useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    

    return(
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="w-full flex items-center">
                <Input value={keyword} name="keyword" onChange={(event)=> setKeyword(event.target.value)}  className="py-6 border border-gray-200" placeholder="Search Products..."/>
            </div>
             {

                    !searchResults.length ? <h1 className="text-3xl font-extrabold mt-8">No products found matching your search!</h1>
                    : null
                }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
               
                {
                    searchResults.map((item, index) => <div key={index}><ShoppingProductTile 
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart} product={item}/></div>) 
                }
            </div>
             <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
        </div>
    )
}

export default SearchProducts;