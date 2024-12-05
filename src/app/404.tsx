'use client';
import Link from "next/link";
export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! This page is still under construction.</p>
      <p>
        Hire me, and let's build something amazing together! 🚀
      </p>
      <Link href="/">
        <a style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</a>
      </Link>
    </div>
  )
}
