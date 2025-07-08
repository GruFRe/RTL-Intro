import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className='bg-yellow-300 text-black rounded'>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchUsers(signal);

    return () => controller.abort();
  }, []);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body items-center'>
          <span className='loading loading-spinner loading-lg'></span>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body items-center'>
          <div className='alert alert-error'>
            <span>{error}</span>
          </div>
          <button className='btn btn-primary mt-4' onClick={() => fetchUsers()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>User Directory</h2>
        <div className='form-control w-full mb-4'>
          <div className='join join-item'>
            <input
              type='text'
              placeholder='Search users...'
              className='input input-bordered w-full'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              className='btn join-item'
              disabled={!searchTerm}
              onClick={() => setSearchTerm('')}
            >
              &times;
            </button>
          </div>
        </div>
        {filteredUsers.length === 0 ? (
          <div className='text-center py-8'>
            <p>No users found matching your search.</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='table table-zebra'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{highlightMatch(user.name, searchTerm)}</td>
                    <td>@{highlightMatch(user.username, searchTerm)}</td>
                    <td>{highlightMatch(user.email, searchTerm)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='card-actions justify-end mt-4'>
          <button className='btn btn-outline' onClick={() => fetchUsers()}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
