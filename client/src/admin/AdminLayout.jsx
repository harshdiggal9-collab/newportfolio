import { NavLink, Outlet, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin", label: "Projects", end: true },
  { to: "/admin/media", label: "Media (Image / YouTube)" },
  { to: "/admin/clients", label: "Clients" }
];

function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-layout page">
      <aside className="admin-sidebar glass premium-card">
        <p className="eyebrow">Admin</p>
        <nav className="admin-nav">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="btn btn-outline admin-logout" onClick={logout}>
          Log out
        </button>
      </aside>
      <div className="admin-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
