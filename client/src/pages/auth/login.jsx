import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";


const initialState = {
    email : '',
    password : ''
}


function AuthLogin() {

    const [formData, setFormData] = useState(initialState);

    function onsSubmit() {

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