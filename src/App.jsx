
import './App.css'
import ChatBox from './components/ChatBox';
import LogOutButton from './components/LogOutButton';
import Signin from './components/Signin';
import { UserAuth } from './context/AuthContext'

function App() {

  // console.log(UserAuth())
  const { user } = UserAuth()
  console.log(user)
  // aslkjfskldfd
  return (
    <>
      <div className="App">
        {user && <ChatBox />}

        {user?.displayName ? <LogOutButton /> : <Signin />}
      </div>
    </>
  )
}

export default App
