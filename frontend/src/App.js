import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:4000', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);
      setData(data);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    })
    .then(response => response.json())
    .then(newItem => {
      console.log('New item added:', newItem);
      setData([...data, newItem]);
      setTitle('');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Data from Backend</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Add new item" 
          required 
        />
        <button type="submit">Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
