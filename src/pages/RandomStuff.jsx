import { useState } from "react"
import { UserAuth } from "../context/AuthContext"
import Signin from '../components/Signin'
import ChatBox from '../components/ChatBox'
import LogOutButton from '../components/LogOutButton'
import { Button } from '../components/StyledComponents/Button'
import { CatImage } from "../components/StyledComponents/CatImage"
import { FlexContainer } from "../components/StyledComponents/FlexContainer"
import { ImageContainer } from "../components/StyledComponents/ImageContainer"
import { MagicEightBall } from "../components/StyledComponents/MagicEightBall"
import { ChatMessages, ChatInput, Message } from "../components/StyledComponents/Chat"


export default function RandomStuff(props) {


    // establish connection variable
    let conn

    function handleWS() {

        if (window["WebSocket"]) {
            const conn = new WebSocket(`ws://localhost:5000/ws/2`)
            console.log(conn)
            conn.onclose = (e) => {
                setConnectionStatus('Connection closed')
                setMessages(prev => [...prev, 'Connection Closed'])
            }

            conn.onmessage = (e) => {
                let messages = e.data.split('\n')
                console.log(messages)
            }
        } else {
            console.log("Your browser does not support websockets")
        }
    }

    // if (window["WebSocket"]) {
    //     const params = window.location.href.split("/");
    //     const roomId = params[params.length - 1];
    //     conn = new WebSocket("wss://" + document.location.host + "/ws/" + roomId);
    //     conn.onclose = function (evt) {
    //         let item = document.createElement("div");
    //         item.innerHTML = "<b>Connection closed.</b>";
    //         appendLog(item);
    //     };
    //     conn.onmessage = function (evt) {
    //         let messages = evt.data.split('\n');
    //         for (let i = 0; i < messages.length; i++) {
    //             let item = document.createElement("div");
    //             item.innerText = messages[i];
    //             appendLog(item);
    //         }
    //     };
    // } else {
    //     let item = document.createElement("div");
    //     item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
    //     appendLog(item);
    // }

    // let url = "wss://localhost:5000/ws/"
    // const url = 'wss://localhost:5000/ws'
    // const c = new WebSocket(url)

    // console.log(c)
    const [cats, setCats] = useState([])
    const [answer, setAnswer] = useState('')
    const [catsLoading, setCatsLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [roomId, setRoomId] = useState(1)
    const [connectionStatus, setConnectionStatus] = useState('Not Connected')

    const { getRandomAnswer, user } = UserAuth()

    const handleClick = async () => {
        setAnswer("Hm...")
        const answer = await getRandomAnswer()
        setAnswer(answer)
    }


    async function getCats() {
        const CAT_API = 'live_gSfrFvjdVslqjvRmMwfqzd8MsXa1xfnvw5JbIdnGl7u3GSWxUjpVfWgwMkAEmsr0'
        setCatsLoading(true)
        const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=beng&api_key=${CAT_API}`)
        if (res.ok) {
            const catArray = await res.json()
            setCats(catArray)
        }
        setCatsLoading(false)
    }

    const submitChat = (e) => {
        e.preventDefault()
        setMessages(prev => [...messages, message])
        setMessage('')
    }

    return (
        <FlexContainer col>
            <h1>Random Stuff...</h1>
            <MagicEightBall>
                <div className="eight">8</div>
            </MagicEightBall>
            <ChatBox answer={answer} />
            <FlexContainer margin="1" gap="1" col>
                <Button onClick={handleClick}>Magic Eight Ball</Button>


                {/* Firebase auth test */}
                {user !== null ?
                    <FlexContainer col gap>
                        <div>Welcome, {user.displayName}</div>
                        <LogOutButton />
                    </FlexContainer>
                    :
                    <Signin />
                }

                {/* <Button onClick={getCats}>Get Cats</Button> */}
            </FlexContainer>

            {/* Extract to Chat Component once sockets are up */}
            <FlexContainer w="full" col gap="2" margin="1">
                <h1>{connectionStatus}</h1>
                <h1>Chat Room</h1>
                <Button onClick={handleWS}>Join Room</Button>
                <ChatMessages height="30">
                    {messages.map((msg, i) => (
                        <Message key={i}>{msg}</Message>
                    ))}
                </ChatMessages>
                <FlexContainer>
                    <form onSubmit={submitChat}>
                        <FlexContainer gap w="500">
                            <ChatInput type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
                            <Button disabled={user === null} type="submit">{user === null ? "Log in" : "Send"}</Button>
                        </FlexContainer>
                    </form>

                </FlexContainer>
            </FlexContainer>

            {/* Cat API test fetch */}

            {/* <ImageContainer>
                {cats.length > 0 && cats.map((cat, i) => <CatImage key={i} src={cat.url}></CatImage>)}
            </ImageContainer> */}
        </FlexContainer>
    )
}
