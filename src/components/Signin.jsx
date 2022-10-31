import React from "react";
import { GoogleButton } from 'react-google-button'
import { UserAuth } from "../context/AuthContext";

export default function Signin() {

    const { googleSignIn } = UserAuth()

    async function handleGoogleSignIn() {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    )
}
