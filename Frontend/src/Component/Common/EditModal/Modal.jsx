import React from 'react'
import { Button, Modal } from 'antd';
import axios from 'axios'
import { BASE_URL } from '../../../Services/helper';
import "./Modal.scss"


const EditModal = ({ modalOpen, setModalOpen, title, setTitle, description, setDescription, taskStatus, setTaskStatus, taskId, setTaskId, setAllTasks, getTasks }) => {

    const handleUpdate = (ev) => {
        try {
            const data = {
                _id: taskId,
                title: title,
                description: description,
                taskStatus: taskStatus
            };
            if (title.length === 0) {
                alert("Title is required")
            } else {
                axios.post(BASE_URL + "/kanban/updatetask", data).then((res) => {
                    getTasks(setAllTasks);
                    setModalOpen(false);
                    setTitle("");
                    setDescription("");
                    console.log(res.data);
                });
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCancle = (ev) => {
        setModalOpen(false)
        setTitle("");
        setDescription("");
    }


    return (
        <>
            <Modal
                title="Edit Task"
                centered
                open={modalOpen}
                onOk={() => handleCancle()}
                onCancel={() => handleCancle()}

                footer={[
                    <Button key="cancel" onClick={() => handleCancle}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleUpdate}>
                        Update
                    </Button>,
                ]}
            >
                <div className='task-editmodal'>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        className='edittask-title'
                        onChange={(ev) => setTitle(ev.target.value)}
                        value={title} />
                    <label htmlFor="">Description</label>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="6"
                        onChange={(ev) => setDescription(ev.target.value)}
                        value={description}></textarea>
                    <label htmlFor="">Progress <span>{taskStatus}%</span></label>
                    <input
                        type="range"
                        className='task-Progress'
                        name=""
                        id=""
                        onChange={(ev) => setTaskStatus(ev.target.value)}
                        value={taskStatus} />
                </div>
            </Modal>
        </>
    )
}

export default EditModal;
