"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const buttonDisabled = !user.email || !user.password
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/login", user);
            console.log("Login Success", response.data);
            toast.success("Login Success")
            router.push("/profile")

        } catch (error: any) {
            console.log("Login Failed", error.message)
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Login"}</h1>
            <hr />
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
                onClick={onLogin}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Enter details" : "Login"}
            </button>
            <Link href="/signup">Sign Up</Link>
        </div>
    )
}