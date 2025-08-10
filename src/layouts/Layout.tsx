import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { state, setUser } = useAppContext()
  
  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    setUser(null)
    alert('You have been logged out')
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>My App</div>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
          >
            About
          </Link>
          
          {state.user ? (
            <>
              <Link 
                to="/profile" 
                className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
              >
                Profile
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/register" 
                className={`${styles.navLink} ${isActive('/register') ? styles.active : ''}`}
              >
                Register
              </Link>
              <Link 
                to="/login" 
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default Layout