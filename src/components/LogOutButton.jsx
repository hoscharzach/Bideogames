import { UserAuth } from "../context/AuthContext";

export default function LogOutButton() {

    const { logOut } = UserAuth()

    async function handleLogOut() {
        try {
            await logOut()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button onClick={handleLogOut}>Logout</button>
    )
}
