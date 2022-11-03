import { UserAuth } from "../context/AuthContext";
import { Button } from "./StyledComponents/Button";

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
        <Button inverted onClick={handleLogOut} >Logout</Button>
    )
}
