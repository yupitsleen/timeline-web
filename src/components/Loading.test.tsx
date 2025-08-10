import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Loading from './Loading'

describe('Loading Component', () => {
  it('renders loading spinner', () => {
    render(<Loading />)
    
    const spinner = screen.getByRole('status', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })

  it('displays loading text when provided', () => {
    render(<Loading text="Loading data..." />)
    
    const text = screen.getByText('Loading data...')
    expect(text).toBeInTheDocument()
  })

  it('renders different sizes correctly', () => {
    const { container, rerender } = render(<Loading size="small" />)
    const smallElement = container.querySelector('[role="status"]')
    expect(smallElement).toBeInTheDocument()
    
    rerender(<Loading size="large" />)
    const largeElement = container.querySelector('[role="status"]')
    expect(largeElement).toBeInTheDocument()
  })
})