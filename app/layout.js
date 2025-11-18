import './globals.css';

export const metadata = {
  title: 'Interactive Logo Studio',
  description: 'Realistic logo exploration for interactive design teams.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
