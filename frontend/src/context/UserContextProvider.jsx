import { useState, useEffect } from 'react'
import UserContext from './Usercontext'

const UserContextProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null
  const [user, setUser] = useState(storedUser)

  // Effect to initialize user state from local storage on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/check-login-on-start', {
          credentials: 'include',
        });
        const data = await response.json();
        
        if (response.ok) {
          // Store both in state and localStorage to keep them in sync
          setUser(data.username);
          localStorage.setItem('user', JSON.stringify(data.username));
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setUser(null);
        localStorage.removeItem('user');
      }
    };
    
    // Only check login status if we have a stored user
    if (storedUser) {
      checkLoginStatus();
    }
  }, [storedUser]);

  // Effect to update local storage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
