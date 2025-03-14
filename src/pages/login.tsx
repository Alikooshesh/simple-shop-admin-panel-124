import { useState } from "react"
import { useLoginRequest } from "../services/auth"

const LoginPage = ()=>{

    const [values , setValues] = useState({
        email : "",
        password : ""
    })

    const {mutate , isLoading,isError} = useLoginRequest()

    if(isLoading){
        return <p>loading ...</p>
    }

    return(
        <div>
            <div>
                <label>
                    email :
                    <input className="border border-black" value={values.email} onChange={(e)=> setValues({...values , email : e.target.value})}/>
                </label>
            </div>
            <div>
                <label>
                    password :
                    <input className="border border-black" value={values.password} onChange={(e)=> setValues({...values , password : e.target.value})}/>
                </label>
            </div>
            <button className="border border-black" onClick={()=> mutate(values)}>login</button>
        </div>
    )
}

export default LoginPage