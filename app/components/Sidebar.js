import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/tickets', title: 'Tickets' },
  { href: '/reports', title: 'Reports' },
  { href: '/analytics', title: 'Analytics' },
  { href: '/settings', title: 'Settings' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Ticketing System</h1>
      <ul>
        {menuItems.map(({ href, title }) => (
          <li className="mb-4" key={title}>
            <Link href={href}              
                className={`block p-2 rounded hover:bg-gray-700 ${
                  router.pathname === href ? 'bg-gray-700' : ''
                }`}
              >
                {title}               
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}