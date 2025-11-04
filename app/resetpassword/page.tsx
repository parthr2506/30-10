"use client"
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [newPassword, setNewPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/users/resetpassword', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword })
        })

        const data = await res.json();
        setMessage(data.message || data.error);
    }

    return (
        <div className="p-10 max-w-md mx-auto">
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="password"
                    placeholder="enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="border p-2 w-full mb-3"
                />
                <button className='border rounded bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4' type="submit">Confirm Change Password</button>
            </form>

            {message &&
                <div>
                    <p className="mt-3 text-sm">
                        {message}
                    </p>
                    <Link className="mt-4" href="/profile">Back to Profile</Link>
                </div>
            }
        </div>
    )
}

