'use client'
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const secret = "12345678";

export default function Dashboard() {
    const router = useRouter();
useEffect(()=>{
    const token =Cookies.get("jwt_token");

    if(!token){
        
        
        alert("Invalid token")
        return

    }

    try{
        const decode= jwt.verify(token,secret)
        
        
    }
    catch(err){
        console.error("Invalid token in catch")
        Cookies.remove("jwt_token")
        router.push("/")
    }
})
    
  return (
    <div>
      <h1>DashBoard Inprocess......</h1>
    </div>
  )
}


