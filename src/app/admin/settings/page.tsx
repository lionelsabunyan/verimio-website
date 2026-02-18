import Header from '@/components/admin/Header'
import SettingsClient from '@/components/admin/SettingsClient'

export default function SettingsPage() {
  return (
    <>
      <Header title="Ayarlar" subtitle="API anahtarları ve entegrasyonlar" />
      <SettingsClient />
    </>
  )
}
