import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';

function Table({
    users,
    visibleUsers,
    edit,
    remove,
    beingEdited,
    updateUsers,
    removeChecked }) {
    const [tempEntry, setTempEntry] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    })
    const [checked, setChecked] = useState([]);



    const handleChange = (target) => {
        setTempEntry({ ...tempEntry, [target.name]: target.value })
    }


    const startEditing = (entry) => {
        edit(entry);
        setTempEntry(entry);
    }

    const finishEdit = (entry) => {
        edit(entry);
        let tempUsers = users.map(a => ({ ...a }));
        tempUsers.splice(users.findIndex(i => i.id === entry.id), 1, tempEntry);
        updateUsers(tempUsers);
        setTempEntry({
            id: "",
            name: "",
            email: "",
            role: ""
        })
    }



    const handleChecked = (event, entry) => {
        if (event.target.checked) {
            setChecked([...checked, entry]);
        }
        else {
            setChecked([...checked].filter(i => i.id !== entry.id));
        }
    }


    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setChecked(visibleUsers)
        }
        else {
            setChecked([]);
        }
    }

    const checkIfTicked = (entry) => {
        let flag = false;
        checked.forEach(i => {
            if (entry.id === i.id) {
                flag = true;
            }
        })
        return flag;
    }

    const handleDeleteSelected = () => {
        removeChecked(checked)
        setChecked([]);
    }

    return (
        <>
            {visibleUsers.length ? (<table>
                <thead>
                    <tr>
                        <th><input checked={checked.length === visibleUsers.length ? true : false} type='checkbox' onChange={(e) => handleSelectAll(e)} /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleUsers.length && (visibleUsers.map(entry => {
                        if (entry.id === beingEdited) {
                            return (
                                <tr key={entry.id}
                                    className={checkIfTicked(entry) ? 'checked' : ''}
                                >
                                    <td><input
                                        type='checkbox'
                                        checked={checkIfTicked(entry) ? true : false}
                                        onChange={e => handleChecked(e, entry)}
                                    /></td>
                                    <td>
                                        <input
                                            name="name"
                                            value={tempEntry.name}
                                            onChange={(e) => handleChange(e.target)} />
                                    </td>
                                    <td>
                                        <input
                                            name="email"
                                            value={tempEntry.email}
                                            onChange={(e) => handleChange(e.target)} />
                                    </td>
                                    <td>
                                        <input
                                            name="role"
                                            value={tempEntry.role}
                                            onChange={(e) => handleChange(e.target)} />
                                    </td>
                                    <td>
                                        <button onClick={() => finishEdit(entry)} className='btn'>
                                            <DoneIcon sx={{ color: 'green' }} />
                                        </button>
                                        &nbsp;
                                        <button onClick={() => remove(entry)} className='btn'>
                                            <DeleteOutlinedIcon sx={{ color: 'red' }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr key={entry.id}
                                    className={checkIfTicked(entry) ? 'checked' : ''}
                                >
                                    <td><input
                                        checked={checkIfTicked(entry) ? true : false}
                                        type='checkbox'
                                        onChange={e => handleChecked(e, entry)}
                                    /></td>
                                    <td>{entry.name}</td>
                                    <td>{entry.email}</td>
                                    <td>{entry.role}</td>
                                    <td>
                                        <button onClick={() => startEditing(entry)} className='btn'>
                                            <EditOutlinedIcon sx={{ color: 'grey' }} />
                                        </button>
                                        &nbsp;
                                        <button onClick={() => remove(entry)} className='btn'>
                                            <DeleteOutlinedIcon sx={{ color: 'red' }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    }
                    ))}
                </tbody>
            </table>) : (<div>No data exists</div>)}
            <button className='btn delete-button' onClick={() => handleDeleteSelected()}>DELETE SELECTED</button>

        </>
    )
}

export default Table

