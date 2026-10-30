/* The real <html> lives in [locale]/layout.tsx (it needs the locale for
   lang). This pass-through root exists so app/not-found.tsx can render for
   URLs outside the locale tree. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
