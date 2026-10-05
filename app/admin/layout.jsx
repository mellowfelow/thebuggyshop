import AdminShell from '@/src/components/admin/AdminShell';

// Private operator area: never index, never follow, never cache a snippet.
export const metadata = {
  title: { absolute: 'Reply Portal' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
