import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Sidebar from "../component/sidebar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admins`);
        if (response.status === 200) {
          setAdminList(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this admin?');

    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:8080/admin/delete/${id}`);
        setAdminList(prevAdminList => prevAdminList.filter(admin => admin.adminID !== id));
      } catch (error) {
        console.error('Error deleting admin:', error);
      }
    }
  };

  const handleEdit = (adminID) => {
    // Logika untuk mengedit admin dengan adminID tertentu
    // Lakukan pembaruan data admin atau navigasi ke halaman edit admin
    navigate(`/Formadmin/${adminID}`);
  };

  const handleUpload = () => {
    // Logika untuk mengelola proses unggah video
    // Mungkin Anda perlu menggunakan library atau mengirim permintaan ke endpoint API
    navigate("/CreateAdmin");
  };

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-content">
        <h2>Admin Management</h2>
        <Button variant="primary" onClick={handleUpload}>
          Buat Akun Admin
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminList.map((admin) => (
              <tr key={admin.adminID}>
                <td>{admin.adminID}</td>
                <td>{admin.namaAdmin}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(admin.adminID)}>Delete</Button>
                  <Button variant="warning" onClick={() => handleEdit(admin.adminID)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
