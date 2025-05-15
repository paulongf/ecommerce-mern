import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";


const initialState = {
    userName : '',
    email : '',
    password : ''
}


function AuthRegister() {

    const [formData, setFormData] = useState(initialState);

    function onsSubmit() {

    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
           <div className="text-center text-black">
                <h1 className="text-3xl font-bold tracking-tight">Create new account</h1>
                <p className="mt-2">
                    Already have an account 
                    <Link className="font-medium ml-2 hover:underline" to={'/auth/login'}>Login</Link>
                </p>             
           </div>
           <CommonForm
           formControls={registerFormControls}
           buttonText={'Sign Up'}
           formData={formData}
           setFormData={setFormData}
           onSubmit={onsSubmit}
           />
        </div>
    )
}

export default AuthRegister;