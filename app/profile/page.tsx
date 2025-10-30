"use client"
import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function Profile() {
    // const { id } = await params
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Success");
            router.push("/login")

        } catch (error: any) {
            console.log("Logout Failed", error);
            toast.error(error.message)

        }

    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/details");
        console.log(res.data)
        setData(res.data.data._id)

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page</p>
            <h2 className="mt-4 p-1 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            {/* <span className="p-2 ml-2 rounded bg-gray-500 text-black">{id}</span> */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={logout}
            >Logout</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={getUserDetails}
            >Details</button>

        </div>
    )

}