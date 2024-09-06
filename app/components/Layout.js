import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex">
 <Sidebar className="bg-red-100"/>
 <main className="">{children}</main>
</div>

  );
}