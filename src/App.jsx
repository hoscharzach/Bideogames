
import { useState } from 'react';
import './App.css'
import ChatBox from './components/ChatBox';
import LogOutButton from './components/LogOutButton';
import Signin from './components/Signin';
import { Button } from './components/StyledComponents/Button';
import { CatImage } from './components/StyledComponents/CatImage';
import { FlexContainer } from './components/StyledComponents/FlexContainer';
import { ImageContainer } from './components/StyledComponents/ImageContainer';
import { UserAuth } from './context/AuthContext'

function App() {
  const [cats, setCats] = useState([])
  const [answer, setAnswer] = useState('')
  const [catsLoading, setCatsLoading] = useState(false)

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

  return (
    <FlexContainer col>
      <h1>Random Stuff...</h1>
      {user?.displayName && <ChatBox answer={answer} />}
      <FlexContainer margin="1" gap>
        <Button onClick={handleClick}>Magic Eight Ball</Button>
        {user?.displayName ? <LogOutButton /> : <Signin />}
        <Button onClick={getCats}>Get Cats</Button>
      </FlexContainer>
      <ImageContainer>
        {cats.length > 0 && cats.map((cat, i) => <CatImage key={i} src={cat.url}></CatImage>)}
      </ImageContainer>
    </FlexContainer>
  )
}

export default App
