import React from 'react'
import { Button, Modal } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../../../Services/helper';

import "./Modal.scss"

const ModalComponent = ({ modal1Open, setModal1Open, title, setTitle, description, setDescription, taskStatus, setAllTasks, getTasks }) => {
    const handleSubmit = (ev) => {
        try {
            const data = {
                title: title,
                description: description,
                taskStatus: taskStatus
            };
            if (title.length === 0) {
                alert("Title is required")
            } else {
                axios.post(BASE_URL + '/kanban/addtask', data).then((res) => {
                    getTasks(setAllTasks);
                    setModal1Open(false);
                    setTitle("");
                    setDescription("");
                });
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal
                title="Add Task"
                centered
                open={modal1Open}

                onCancel={() => setModal1Open(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModal1Open(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Add Task
                    </Button>,
                ]}
            >
                <div className='task-modal'>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
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
                </div>
            </Modal>
        </>
    )
}

export default ModalComponent;
