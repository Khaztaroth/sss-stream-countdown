'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [pass, setPass] = useState<string>('0')
    const router = useRouter()

    const CheckPass = (pass: string) => {
        const math = +pass * 69
    
        if (math === 315.123) {
            router.push('/dashboard?pass=coolbeans')
        } else {
            alert("You've failed")
        }
    }

    return (
        <div style={{ color: 'black', alignItems: 'center' }}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    CheckPass(pass)
                }}
            >
                <label>
                    <input onChange={(event) => setPass(event.target.value)} id="pass" name="pass" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
