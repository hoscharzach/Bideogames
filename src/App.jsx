
import { useState } from 'react';
import './App.css'
import ChatBox from './components/ChatBox';
import LogOutButton from './components/LogOutButton';
import Signin from './components/Signin';
import { UserAuth } from './context/AuthContext'

function App() {
  const [cats, setCats] = useState([])

  // console.log(UserAuth())
  const { user } = UserAuth()
  console.log(user)

  async function getCats() {
    const CAT_API = 'live_gSfrFvjdVslqjvRmMwfqzd8MsXa1xfnvw5JbIdnGl7u3GSWxUjpVfWgwMkAEmsr0'
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=2&breed_ids=beng&api_key=${CAT_API}`)
    if (res.ok) {
      const catArray = await res.json()
      console.log(catArray)
      setCats(catArray)
    }
  }
  // aslkjfskldfd
  return (
    <>
      <div className="App">
        {user && <ChatBox />}

        {user?.displayName ? <LogOutButton /> : <Signin />}
      </div>
      <button style={{ marginTop: '2rem' }} onClick={getCats}>Get Cats</button>
      {cats.length > 0 && cats.map((cat, i) => <img key={i} style={{ maxWidth: '400px', maxHeight: '400px' }} src={cat.url}></img>)}
    </>
  )
}

export default App