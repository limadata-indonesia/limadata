import Sidebar from "../../../components/admin/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar />
      <div style={{ marginLeft: 220, minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
