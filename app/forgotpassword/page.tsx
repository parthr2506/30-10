"use client"
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/users/forgotpassword', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })

        const data = await res.json();
        setMessage(data.message || data.error);
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 w-full mb-3"
                />
                <button type="submit">Send Reset Link</button>
            </form>

            {message &&
                <p className="mt-3 text-sm">
                    {message}
                </p>
            }
        </div>
    )
}

