import { useDispatch } from "react-redux"
import { deleteGoal } from '../features/goals/goalSlice'
const Goalitem = ({goal}) => {
    
    const dispatch = useDispatch()
  return (
    <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
        <h2>{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button>
    </div>
  )
}

export default Goalitem