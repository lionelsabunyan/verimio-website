'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

type Project = 'verimio' | 'bfg'

// ─── Shared icon primitives ────────────────────────────────────────────────

const ICONS = {
  home: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  users: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  calendar: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  chat: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
  image: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  edit: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  bulb: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  kanban: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>,
  chart: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  video: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 10l4.553-2.069A1 1 0 0121 8.817v6.366a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  pdf: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  brand: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  terminal: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  list: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  link: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  robot: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  check: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  settings: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  // BFG-specific
  star: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  cash: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  search: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  chevronDown: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  externalLink: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
}

// ─── Nav configs ───────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  indent?: boolean
  section?: string
}

const VERIMIO_NAV: NavItem[] = [
  { label: 'Dashboard',        href: '/admin',                    icon: ICONS.home },
  { label: 'CRM — Leads',      href: '/admin/crm',                icon: ICONS.users },
  { label: 'Toplantılar',      href: '/admin/meetings',           icon: ICONS.calendar },
  { label: 'Sosyal Medya',     href: '/admin/social',             icon: ICONS.chat },


  { label: 'Onay Kuyruğu',    href: '/admin/social/approve',     icon: ICONS.check,    indent: true },
  { label: 'Ayarlar',         href: '/admin/social/settings',    icon: ICONS.settings, indent: true },
  { label: 'İçerik Üretimi',   href: '/admin/content',            icon: ICONS.edit },
  { label: 'İçerik Önerileri', href: '/admin/content/suggestions',icon: ICONS.bulb,    indent: true },
  { label: 'İçerik Pipeline',  href: '/admin/content/pipeline',   icon: ICONS.kanban,  indent: true },
  { label: 'SEO Dashboard',    href: '/admin/seo',                icon: ICONS.chart },
  { label: 'Video Merkezi',    href: '/admin/video',              icon: ICONS.video },
  { label: 'PDF Raporlar',     href: '/admin/reports',            icon: ICONS.pdf },
  { label: 'Marka Kimliği',    href: '/admin/brand',              icon: ICONS.brand },
  { label: 'Command Center',   href: '/admin/command',            icon: ICONS.terminal, section: 'command' },
  { label: 'Jobs',             href: '/admin/command/jobs',       icon: ICONS.list,    indent: true },
  { label: "Pipeline'lar",     href: '/admin/command/pipelines',  icon: ICONS.link,    indent: true },
  { label: 'Agents',           href: '/admin/command/agents',     icon: ICONS.robot,   indent: true },
  { label: 'Onaylar',          href: '/admin/command/approvals',  icon: ICONS.check,   indent: true },
  { label: 'Ayarlar',          href: '/admin/settings',           icon: ICONS.settings },
]

const BFG_NAV: NavItem[] = [
  { label: 'Dashboard',           href: '/admin',               icon: ICONS.home },
  { label: 'Broker İncelemeleri', href: '/admin/bfg/brokers',  icon: ICONS.star },
  { label: 'Affiliate Takibi',    href: '/admin/bfg/affiliate',icon: ICONS.cash },
  { label: 'SERP Pozisyonları',   href: '/admin/bfg/serp',     icon: ICONS.search },
  { label: 'İçerik Pipeline',     href: '/admin/content/pipeline', icon: ICONS.kanban, section: 'content' },
  { label: 'Sosyal Medya',        href: '/admin/social',       icon: ICONS.chat },
  { label: 'SEO Dashboard',       href: '/admin/seo',          icon: ICONS.chart },
  { label: 'Command Center',      href: '/admin/command',      icon: ICONS.terminal, section: 'command' },
  { label: 'Ayarlar',             href: '/admin/settings',     icon: ICONS.settings },
]

// ─── NavLink ────────────────────────────────────────────────────────────────

function NavLink({
  item,
  isActive,
  isBFG,
}: {
  item: NavItem
  isActive: boolean
  isBFG: boolean
}) {
  const activeBase = isBFG
    ? 'bg-orange-50 text-orange-700 font-medium'
    : 'bg-blue-50 text-blue-700 font-medium'
  const activeIcon = isBFG ? 'text-orange-600' : 'text-blue-600'
  const activeDot = isBFG ? 'bg-orange-500' : 'bg-blue-600'

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
        item.indent ? 'ml-5' : ''
      } ${
        isActive
          ? activeBase
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <span className={isActive ? activeIcon : 'text-gray-400'}>
        {item.icon}
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeDot}`}
        />
      )}
    </Link>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname()
  const [project, setProject] = useState<Project>('verimio')
  const [mounted, setMounted] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('admin_project') as Project
    if (saved === 'bfg' || saved === 'verimio') setProject(saved)
  }, [])

  function switchProject(p: Project) {
    setProject(p)
    localStorage.setItem('admin_project', p)
    setSwitcherOpen(false)
  }

  const navItems = project === 'verimio' ? VERIMIO_NAV : BFG_NAV
  const isBFG = project === 'bfg'

  const siteLabel = mounted ? (isBFG ? 'beginnerfxguide.com' : 'verimio.com.tr') : 'verimio.com.tr'
  const siteHref  = mounted ? (isBFG ? 'https://beginnerfxguide.com' : '/') : '/'

  return (
    <aside className="w-60 bg-white border-r border-gray-200 shadow-[1px_0_0_0_#f3f4f6] flex flex-col h-screen sticky top-0">

      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="h-14 px-4 flex items-center gap-3 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-sm ${
            isBFG ? 'bg-orange-500' : 'bg-blue-600'
          }`}>
            <span className="text-white font-bold text-sm select-none">
              {mounted ? (isBFG ? 'B' : 'V') : 'V'}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-gray-900 font-semibold text-sm leading-tight">
              {mounted ? (isBFG ? 'BFXGuide' : 'Verimio') : 'Verimio'}
            </div>
            <div className="text-gray-400 text-[11px]">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* ── Nav ──────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <div key={item.href}>
              {(item.section === 'command' || item.section === 'content') && (
                <div className="my-2 mx-3 border-t border-gray-100" />
              )}
              <NavLink item={item} isActive={isActive} isBFG={isBFG} />
            </div>
          )
        })}
      </nav>

      {/* ── Footer ───────────────────────────────────────── */}
      <div className="border-t border-gray-100 p-3 space-y-1">

        {/* Workspace switcher — dropdown */}
        <div className="relative">
          <button
            onClick={() => setSwitcherOpen(prev => !prev)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
              isBFG
                ? 'bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100'
                : 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
              isBFG ? 'bg-orange-500' : 'bg-blue-600'
            }`}>
              <span className="text-white font-bold text-[10px] select-none">
                {mounted ? (isBFG ? 'B' : 'V') : 'V'}
              </span>
            </div>
            <span className="flex-1 font-medium text-left">
              {mounted ? (isBFG ? 'BFXGuide' : 'Verimio') : 'Verimio'}
            </span>
            <span className={`transition-transform duration-200 ${switcherOpen ? 'rotate-180' : ''}`}>
              {ICONS.chevronDown}
            </span>
          </button>

          {switcherOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-full mb-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
            >
              {(['verimio', 'bfg'] as Project[]).map((p) => (
                <button
                  key={p}
                  onClick={() => switchProject(p)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors text-left ${
                    project === p
                      ? p === 'bfg'
                        ? 'bg-orange-50 text-orange-700 font-medium'
                        : 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                    p === 'bfg' ? 'bg-orange-500' : 'bg-blue-600'
                  }`}>
                    <span className="text-white font-bold text-[10px] select-none">
                      {p === 'bfg' ? 'B' : 'V'}
                    </span>
                  </div>
                  <span className="flex-1">{p === 'verimio' ? 'Verimio' : 'BFXGuide'}</span>
                  {project === p && (
                    <svg className={`w-3.5 h-3.5 ${p === 'bfg' ? 'text-orange-500' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Site link */}
        <a
          href={siteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-xs transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <span>{ICONS.externalLink}</span>
          <span className="flex-1 truncate">{siteLabel}</span>
        </a>
      </div>
    </aside>
  )
}
