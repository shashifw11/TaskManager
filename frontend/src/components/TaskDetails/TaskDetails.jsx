import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTasks } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const TaskDetails = () => {

    const navigate = useNavigate()

    const { tasks } = useTasks()
    const { id } = useParams();
    const [cardDetails, setCardDetails] = useState(null)

    const getData = () => {
        const task = tasks.find((item) => {
            if (item._id === id) {
                console.log("item", item);
                return item
            }
        }
        );
        setCardDetails(task);
    };

    useEffect(() => {
        if (tasks.length > 0) {
            getData();
        }
    }, [tasks, id]);

  const handleClose = ()=>{
      navigate("/");
      setCardDetails(null);
  }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-300"> 
       
            {cardDetails ? (
                <div className="shadow-lg w-full lg:w-[40%] h-80 p-4 m-auto bg-white rounded-lg">
                     <p className = "text-3xl">Task Details</p>
                    <h2 className = "text-2xl mt-6 ml-4">{cardDetails.title}</h2>
                    <p className = "text-1xl mt-4 ml-4">{cardDetails.description}</p>
                    <p className = "text-1xl mt-2 ml-4">{cardDetails.column}</p>
                    <p className = "text-1xl mt-2 ml-4">{new Date(cardDetails.createdAt).toLocaleString()}</p>
                    <p className = "text-1xl mt-2 ml-4">{new Date(cardDetails.updatedAt).toLocaleString()}</p>
                    <button onClick= {handleClose} className = "bg-blue-500 text-white font-semibold rounded-md py-3 px-8 mx-[80%]">Close</button>
                </div>
            ) : (
                <p>Loading task details...</p>
            )}
        </div>
    )
}

export default TaskDetails


