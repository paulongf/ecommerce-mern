import Address from '@/components/shopping-view/address';
import img from '../../assets/account.jpg'
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { createNewOrder } from "@/store/shop/order-slice";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { useState } from 'react';




function ShoppingCheckout() {
     const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

 // console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

   function handleInitiatePaypalPayment() {
   /*  if (cartItems.length === 0) {
      

      return;
    }
    if (currentSelectedAddress === null) {
      

      return;
    } */

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log(orderData)

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "sangam");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

        
    return (
        <div className="flex flex-col ">
           <div className="relative h-[300px] w-full overflow-hidden">
                <img
                src={img}
                className='h-full w-full object-cover object-center' 
                />
            </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 mt-5'>
                    <Address
                    selectedId={currentSelectedAddress} 
                    setCurrentSelectedAddress={setCurrentSelectedAddress}/>
                    <div className='flex flex-col gap-4 '>
                        {
                            cartItems && cartItems.items && cartItems.items.length > 0 ?
                            cartItems.items.map((cartItem, index) => <div key={index}><UserCartItemsContent cartItem={cartItem}/></div>) : null
                        }
                        <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total: </span>
                            <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
                        </div>
                        </div>
                            <div className='mt-4'>
                                <Button onClick={handleInitiatePaypalPayment} className="buttonStyle w-full">
                                    Checkout with Paypal
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
    )
};

export default ShoppingCheckout;