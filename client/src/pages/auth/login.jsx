import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";


const initialState = {
    email : '',
    password : ''
}


function AuthLogin() {

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();


    function onsSubmit(event) {
        event.preventDefault();
        
        dispatch(loginUser(formData)).then(data=> {
            if (data?.payload?.success) {
                toast(
                    <div>
                      <strong className="text-lg text-green-800">{data?.payload?.message}</strong>
                      <p className="text-sm text-green-500 text-muted-foreground">Welcome to our page.</p>
                    </div>,
                    {
                        duration: 5000,
                        
                    }
                  );
                navigate('/auth/login');
              } else {
                toast.error(
                    <div>
                      <strong className="text-lg text-red-600">Login failed!</strong>
                      <p className="text-sm text-red-400 text-muted-foreground">{data?.payload?.message}</p>
                    </div>,
                    {
                        duration: 5000,
                    }
                  );
              }
        })


    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
           <div className="text-center text-black">
                <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
                <p className="mt-2">
                    Don't have an account 
                    <Link className="font-medium ml-2 hover:underline" to={'/auth/register'}>Register</Link>
                </p>             
           </div>
           <CommonForm
           formControls={loginFormControls}
           buttonText={'Sign In'}
           formData={formData}
           setFormData={setFormData}
           onSubmit={onsSubmit}
           />
        </div>
    )
}

export default AuthLogin;