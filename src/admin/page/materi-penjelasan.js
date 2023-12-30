import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../component/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

const MateriPenjelasan = () => {
  const navigate = useNavigate();
  const [materiPenjelasanList, setMateriPenjelasanList] = useState([]);

  useEffect(() => {
    const fetchMateriPenjelasanData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/materipenjelasan`);
        if (response.ok) {
          const data = await response.json();
          setMateriPenjelasanList(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching materi penjelasan data:", error);
      }
    };

    fetchMateriPenjelasanData();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus vidio ini?');
    
    if (shouldDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/materip/delete/${id}`);
        if (response.status === 200) {
          window.location.reload();
          const updatedmaterimateriPenjelasanList =materiPenjelasanList.filter(materiVidio => materiVidio.materiVidioID !== id);
          setMateriPenjelasanList(updatedmaterimateriPenjelasanList);
        } else {
          throw new Error('Failed to delete materiVidio');
        }
      } catch (error) {
        console.error('Error deleting materiVidio:', error);
      }
    }
  };

  const handleEdit = (materiID) => {
    // Logika untuk mengedit materi penjelasan dengan materiID tertentu
    // Lakukan pembaruan data materi penjelasan atau navigasi ke halaman edit materi penjelasan
    navigate(`/FormEPenjelasan/${materiID}`)
  };

  const handleUpload = () => {
    // Logika untuk mengelola proses unggah materi penjelasan
    // Mungkin Anda perlu menggunakan library atau mengirim permintaan ke endpoint API
    navigate("/FormPenjelasan");
  };

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-content">
        <h2>Materi Penjelasan Management</h2>
        <Button variant="primary" onClick={handleUpload}>
          Upload Materi Penjelasan
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Isi Penjelasan</th>
              <th>Tanggal Upload</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materiPenjelasanList.map((materi) => (
              <tr key={materi.id}>
                <td>{materi.id}</td>
                <td>{materi.judul}</td>
                <td>{materi.isipenjelasan}</td>
                <td>{materi.tanggal_upload}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(materi.id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button variant="warning" onClick={() => handleEdit(materi.id)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MateriPenjelasan;
