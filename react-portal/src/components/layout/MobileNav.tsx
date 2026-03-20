import { NavLink } from 'react-router-dom'
import { useMailStore } from '../../stores/mailStore'
import { cn } from '../../utils/cn'
import './MobileNav.css'

const NAV_ITEMS = [
  { to: '/', icon: '\u{1F4AC}', label: 'Chat' },
  { to: '/terminal', icon: '\u{2328}\u{FE0F}', label: 'Term' },
  { to: '/teams', icon: '\u{1F465}', label: 'Teams' },
  { to: '/calendar', icon: '\u{1F4C5}', label: 'Cal' },
  { to: '/mail', icon: '\u{1F4E8}', label: 'Mail' },
  { to: '/status', icon: '\u{1F4CA}', label: 'Status' },
  { to: '/settings', icon: '\u{2699}\u{FE0F}', label: 'More' },
] as const

export function MobileNav() {
  const unreadCount = useMailStore(s => s.unreadCount)

  return (
    <nav className="mobile-nav">
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn('mobile-nav-item', isActive && 'mobile-nav-active')}
        >
          <span className="mobile-nav-icon">
            {item.icon}
            {item.to === '/mail' && unreadCount > 0 && (
              <span className="mobile-nav-badge">{unreadCount}</span>
            )}
          </span>
          <span className="mobile-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
