import { useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForms from "../components/GoalForms"
import Spin from '../components/Spin'
import { getGoals, reset } from "../features/goals/goalSlice"
import Goalitem from "../components/Goalitem"


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const {goals, isLoading, isError, message} = useSelector((state)=>state.goals)
  
  useEffect(()=>{
    if (isError) {
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoals())
    return () => {
      dispatch(reset())
    }
  },[user, navigate, isError, message, dispatch ])
  if(isLoading){
    return <Spin />
  }
  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1>
      </section>
      <GoalForms />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">{goals.map((goal) =>(
            <Goalitem key={goal._id} goal={goal} />
          ))}</div>
        ) : (<h3>You have not set any goals</h3>)}
      </section>
    </>
  )
}

export default Dashboard