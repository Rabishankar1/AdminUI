import logo from './logo.svg';
import './App.css';
import config from './config'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Pagination from './components/Pagination';



function App() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [editing, setEditing] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(config.endPoint).then(response => {
      setUsers((response.data));
      setVisibleUsers(response.data.slice(0, 10));
    });

  }, [])


  useEffect(() => {
    if (input.length) {
      handlePageClicked(1);
      let results = searchFilter(input, users);
      let tempUsers = results.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
      setVisibleUsers(tempUsers);
      setSearchResults(results);
    };
  }, [input])

  const handleEdit = (entry) => {
    if (editing) {

      setEditing('');
    }
    else {
      setEditing(entry.id)
    }
  }

  const handleRemove = (entry) => {
    let data = users.filter(i => i.id !== entry.id);
    if (editing === entry.id) setEditing('');
    let tempUsers = searchFilter(input, data).slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
    setVisibleUsers(tempUsers);
    setUsers(data);
  }

  const handleCheckedRemove = (entries) => {
    let entryIds = entries.map(i => i.id);
    let data = users.filter(i => {
      if (!entryIds.includes(i.id)) return i
    });
    let tempUsers = searchFilter(input, data).slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
    setVisibleUsers(tempUsers);
    setUsers(data);

  }

  const handlePageClicked = (page) => {
    setCurrentPage(page);
    let tempUsers = users.slice((page - 1) * 10, (page - 1) * 10 + 10);
    setVisibleUsers(tempUsers);
  }

  const handleUpdateUsers = (users) => {
    let tempUsers = users.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
    setVisibleUsers(tempUsers);
    setUsers(users);

  }

  const searchFilter = (str, entries) => {
    let arr = [];
    for (let entry of entries) {
      let columns = ['name', 'email', 'role'];
      for (let columnItem of columns) {
        if (entry[columnItem].includes(str)) {
          arr.push(entry);
          break;
        }
      }
    }
    return arr;
  }


  return (
    <div className="App">
      <input
        placeholder='Search by name, email or role'
        className='searchBox'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Table
        beingEdited={editing}
        users={input.length ? searchResults : users}
        visibleUsers={visibleUsers}
        edit={entry => handleEdit(entry)}
        remove={entry => handleRemove(entry)}
        removeChecked={entries => handleCheckedRemove(entries)}
        updateUsers={(users) => handleUpdateUsers(users)}
      />
      {users.length && (<Pagination
        length={input.length ? searchResults.length : users.length}
        pageClicked={(page) => handlePageClicked(page)}
        currentPage={currentPage}
      />)}
    </div>
  );
}

export default App;
