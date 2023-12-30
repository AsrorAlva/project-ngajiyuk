import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Sidebar from "../component/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [ustadzList, setUstadzList] = useState([]);

  useEffect(() => {
    const fetchUstadzData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/ustadz`);
        if (response.ok) {
          const data = await response.json();
          setUstadzList(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching ustadz data:", error);
      }
    };

    fetchUstadzData();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus akun ini?');
    
    if (shouldDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/ustadz/delete/${id}`);
        if (response.status === 200) {
          const updatedUstadzList = ustadzList.filter(ustadz => ustadz.id !== id);
          setUstadzList(updatedUstadzList);
        } else {
          throw new Error('Failed to delete ustadz');
        }
      } catch (error) {
        console.error('Error deleting ustadz:', error);
      }
    }
  };
  

  const handleEdit = (ustadzID) => {
    // Logika untuk mengedit ustadz dengan ustadzID tertentu
    // Lakukan pembaruan data ustadz atau navigasi ke halaman edit ustadz
    navigate(`/FormUstadz/${ustadzID}`);
  };

  const handleUpload = () => {
    // Logika untuk mengelola proses unggah video
    // Mungkin Anda perlu menggunakan library atau mengirim permintaan ke endpoint API
    navigate("/CreateUstadz");
  };

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-content">
        <h2>Ustadz Management</h2>
        <Button variant="primary" onClick={handleUpload}>
          Buat Akun Ustadz
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Email</th>
              <th>Nama</th>
              <th>No Telepon</th>
              <th>Actions</th>
              {/* Tambahkan kolom lain jika diperlukan */}
            </tr>
          </thead>
          <tbody>
            {ustadzList.map((ustadz) => (
              <tr key={ustadz.id}>
                <td>{ustadz.id}</td>
                <td>{ustadz.username}</td>
                <td>{ustadz.password}</td>
                <td>{ustadz.email}</td>
                <td>{ustadz.nama}</td>
                <td>{ustadz.noTlpn}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(ustadz.id)}>Delete</Button>{' '}
                  <Button variant="warning" onClick={() => handleEdit(ustadz.id)}>Edit</Button>
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
