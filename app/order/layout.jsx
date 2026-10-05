// Customer payment pages are reached from a private emailed link: keep them out of search.
export const metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function OrderLayout({ children }) {
  return children;
}
