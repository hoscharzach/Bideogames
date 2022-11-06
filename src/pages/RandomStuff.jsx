import { useEffect, useRef, useState } from "react"
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
import { nanoid } from "nanoid"


export default function RandomStuff(props) {

    const { getRandomAnswer, user } = UserAuth()

    const chatInput = useRef(null)

    const [cats, setCats] = useState([])
    const [answer, setAnswer] = useState('')
    const [catsLoading, setCatsLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [roomId, setRoomId] = useState(null)
    const [connectionStatus, setConnectionStatus] = useState('Not Connected')
    const [conn, setConn] = useState(null)

    const dev = import.meta.env.DEV === true


    function handleWS() {
        if (window["WebSocket"]) {
            try {
                setConn(new WebSocket(dev ? 'ws://localhost:5000/ws/2' : 'ws://golang-test.onrender.com/ws/2'))
            } catch (e) {
                console.log(e, "Error establishing websocket")
            }
        } else {
            console.log("Your browser does not support websockets")
        }

        setRoomId('2')
    }

    useEffect(() => {
        if (conn) {
            conn.onclose = (e) => {
                setConnectionStatus('Connection closed')
                setMessages(prev => [...prev, 'Connection Closed'])
                setRoomId(null)
            }
            conn.onmessage = (e) => {
                let newMessage = e.data
                setMessages(prev => [...prev, newMessage])
            }
        }
    }, [conn])

    const fetchRandomAnswer = async () => {
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

        if (!chatInput.current || !chatInput.current.value || !conn) return

        conn.send(chatInput.current.value)
    }

    return (
        <FlexContainer col>
            <h1>Random Stuff...</h1>
            <MagicEightBall>
                <div className="eight">8</div>
            </MagicEightBall>
            <ChatBox answer={answer} />
            <FlexContainer margin="1" gap="1" col>
                <Button onClick={fetchRandomAnswer}>Magic Eight Ball</Button>


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
                <div>Currently chatting in room: {roomId}</div>
                <ChatMessages height="30">
                    {messages.map((msg, i) => (
                        <Message key={nanoid()}>{msg}</Message>
                    ))}
                </ChatMessages>
                <FlexContainer>
                    <form onSubmit={submitChat}>
                        <FlexContainer gap w="500">
                            <ChatInput ref={chatInput} type="text" />
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
