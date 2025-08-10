import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import styles from './Profile.module.css'

function Profile() {
  const { state, setUser, setTheme, setLoading } = useAppContext()
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!state.user) {
    return (
      <div className={styles.container}>
        <h1>Access Denied</h1>
        <p>Please log in to view your profile.</p>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setTheme(theme)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      const updatedUser = {
        ...state.user!,
        name: formData.name,
        email: formData.email
      }
      
      setUser(updatedUser)
      setLoading(false)
      
      alert('Profile updated successfully!')
    }, 1000)
  }

  if (state.loading) {
    return <Loading size="large" text="Updating profile..." />
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h1>Profile Settings</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Display Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles.error : ''}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.error : ''}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <button type="submit" className={styles.button}>
            Save Changes
          </button>
        </form>

        <div className={styles.settings}>
          <h2>Appearance</h2>
          <div className={styles.themeToggle}>
            <label>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={state.theme === 'light'}
                onChange={() => handleThemeChange('light')}
              />
              Light Mode
            </label>
            <label>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={state.theme === 'dark'}
                onChange={() => handleThemeChange('dark')}
              />
              Dark Mode
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile