import React from 'react'
import Login from "@/app/login/Login";
// import Login from "@/app/login/login";

const Page = () => {
    return (
        <div className="grid w-full h-screen grid-cols-2">
            <Login />
            <div className="border-l-2 bg-gradient-to-r from-emerald-300 to-emerald-700 border-emerald-500" />
        </div>
    )
}
export default Page
