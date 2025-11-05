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
            toast.success("Login successful! Redirecting to home...");
            router.push("/")

        } catch (error: any) {
            // Check if error response and data exist for specific backend message
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            toast.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-black  p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-300">
                    {loading ? "Processing..." : "Login to Your Account"}
                </h1>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            placeholder="you@example.com"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={user.password}
                            placeholder="••••••••"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out
                            ${buttonDisabled || loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            }`}
                    >
                        {loading ? (
                            <>
                                Logging in...
                            </>
                        ) : buttonDisabled ? (
                            "Enter details"
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
