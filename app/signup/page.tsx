"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

export default function SignupPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const buttonDisabled = !user.email || !user.password || !user.username;
    // const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            // console.log("Signup Success", response.data)
            router.push("/login")

        } catch (error: any) {
            // console.log("Signup Failed", error.message)
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    // useEffect(() => {
    //     if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    //         setButtonDisabled(false);
    //     }
    //     else {
    //         setButtonDisabled(true)
    //     }

    // }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2"
                type="text"
                id="username"
                value={user.username}
                placeholder="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="email">email</label>
            <input className="p-2"
                type="text"
                id="email"
                value={user.email}
                placeholder="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">password</label>
            <input className="p-2"
                type="password"
                id="password"
                value={user.password}
                placeholder="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button className="mt-4 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onSignup}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Enter Fields" : "Signup"}
            </button>
            <Link href="/login">Login</Link>
        </div>
    )
}