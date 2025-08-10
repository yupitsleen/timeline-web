import type { CSSProperties } from 'react'
import styles from './Loading.module.css'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  overlay?: boolean
  className?: string
}

export default function Loading({ 
  size = 'medium', 
  text, 
  overlay = false,
  className = '' 
}: LoadingProps) {
  const content = (
    <div className={`${styles.loading} ${styles[size]} ${className}`} role="status" aria-label={text || 'Loading'}>
      <div className={styles.spinner} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  )

  if (overlay) {
    return (
      <div className={styles.overlay}>
        {content}
      </div>
    )
  }

  return content
}