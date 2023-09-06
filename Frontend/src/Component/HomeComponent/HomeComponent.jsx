import React, { useEffect, useMemo, useState } from 'react'
import { BsTrash, BsPencil } from 'react-icons/bs'
import "./HomeComponent.scss"
import ModalComponent from '../Common/Modal/Modal';
import axios from 'axios';
import EditModal from '../Common/EditModal/Modal';
import { BASE_URL } from '../../Services/helper';

export default function HomeComponent() {

    const [modalOpen, setModalOpen] = useState(false);

    const [modal1Open, setModal1Open] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState(0);
    const [allTasks, setAllTasks] = useState([]);

    const getTasks = async (setAllTasks) => {
        const tasks = await axios.get(BASE_URL+'/kanban/gettasks');
        setAllTasks(tasks.data);
    }

    const handleDelete = (id) => {
        axios.post(BASE_URL+'/kanban/deletetask', { id }).then((res) => {
            getTasks(setAllTasks);
        });
    }

    const handleEditTask = (id) => {
        axios.post(BASE_URL+'/kanban/getsingletask', { id }).then((res) => {
            setTaskId(id);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setTaskStatus(res.data.taskStatus)
            setModalOpen(true);
        })
    }



    useEffect(() => {
        getTasks(setAllTasks)
    }, []);
    return (
        <div className='main-container'>
            <div className='logo-title'>
                <p>Kanban Task Management Tool</p>
                <div className='add-task-btn'>
                    <button onClick={() => setModal1Open(true)}>Add Task</button>
                </div>
            </div>
            <ModalComponent
                modal1Open={modal1Open}
                setModal1Open={setModal1Open}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                taskStatus={taskStatus}
                setAllTasks={setAllTasks}
                getTasks={getTasks} />
            <div className='saperator'>
                <hr />
            </div>
            <div className='main-box'>
                <div className='todo-box'>
                    <p>Todo</p>
                    <hr />

                    <div className='todo-card'>
                        {allTasks.length > 0 ? (
                            allTasks.map((task) => {
                                if (task.taskStatus === 0) {
                                    return (
                                        <div className='main-card'>
                                            <div className="action-container">
                                                <BsTrash className='action-icon' onClick={() => handleDelete(task._id)} />
                                                <BsPencil className='action-icon' onClick={() => handleEditTask(task._id)} />
                                            </div>
                                            <p className='task-title'>{task.title}</p>
                                            <p className='task-description'>{task.description}</p>
                                        </div>
                                    )
                                }

                            })
                        ) : <>
                            <div className='empty-todo'>
                                <p>No task yet</p>
                            </div>
                        </>}
                    </div>

                    <EditModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        taskStatus={taskStatus}
                        setTaskStatus={setTaskStatus}
                        taskId={taskId}
                        setTaskId={setTaskId}
                        setAllTasks={setAllTasks}
                        getTasks={getTasks} />

                </div>
                <div className='doing-box'>

                    <p>Doing</p>
                    <hr />
                    <div className='doing-card'>
                        {allTasks.length > 0 ? (
                            allTasks.map((task) => {
                                if (task.taskStatus > 0 && task.taskStatus < 100) {
                                    return (
                                        <div className='main-card'>
                                            <div className="action-container">
                                                <BsTrash className='action-icon' onClick={() => handleDelete(task._id)} />
                                                <BsPencil className='action-icon' onClick={() => handleEditTask(task._id)} />
                                            </div>
                                            <p className='task-title'>{task.title}</p>
                                            <p className='task-description'>{task.description}</p>
                                        </div>
                                    )
                                }

                            })
                        ) : <>
                            <div className='empty-todo'>
                                <p>No task yet</p>
                            </div>
                        </>}

                    </div>
                </div>
                <div className='done-box'>
                    <p>Done</p>
                    <hr />

                    <div className='done-card'>
                        {allTasks.length > 0 ? (
                            allTasks.map((task) => {
                                if (task.taskStatus === 100) {
                                    return (
                                        <div className='main-card'>
                                            <div className="action-container">
                                                <BsTrash className='action-icon' onClick={() => handleDelete(task._id)} />
                                                <BsPencil className='action-icon' onClick={() => handleEditTask(task._id)} />
                                            </div>
                                            <p className='task-title'>{task.title}</p>
                                            <p className='task-description'>{task.description}</p>
                                        </div>
                                    )
                                }

                            })
                        ) : <>
                            <div className='empty-todo'>
                                <p>No task yet</p>
                            </div>
                        </>}

                    </div>
                </div>
            </div>

        </div>
        
    )
}
