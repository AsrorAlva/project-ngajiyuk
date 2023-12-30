import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../component/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [materiVidioList, setMateriVidioList] = useState([]);

  useEffect(() => {
    const fetchMateriVidioData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/materi`);
        if (response.ok) {
          const data = await response.json();
          setMateriVidioList(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching materi vidio data:", error);
      }
    };

    fetchMateriVidioData();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Apakah Anda yakin ingin menghapus vidio ini?');
    
    if (shouldDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/materi/delete/${id}`);
        if (response.status === 200) {
          window.location.reload();
          const updatedmateriVidioList = materiVidioList.filter(materiVidio => materiVidio.materiVidioID !== id);
          setMateriVidioList(updatedmateriVidioList);
        } else {
          throw new Error('Failed to delete materiVidio');
        }
      } catch (error) {
        console.error('Error deleting materiVidio:', error);
      }
    }
  };

  const handleEdit = (materiID) => {
    // Logika untuk mengedit materi vidio dengan materiID tertentu
    // Lakukan pembaruan data materi vidio atau navigasi ke halaman edit materi vidio
    navigate(`/FormVidio/${materiID}`);
  };

  const handleUpload = () => {
    // Logika untuk mengelola proses unggah video
    // Mungkin Anda perlu menggunakan library atau mengirim permintaan ke endpoint API
    navigate("/Formulir");
  };

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-content">
        <h2>Materi Video Management</h2>
        <Button variant="primary" onClick={handleUpload}>
          Upload Video
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul Materi</th>
              <th>Vidio_info</th>
              <th>Tanggal Upload</th>
              <th>Actions</th>
              {/* Tambahkan kolom lain jika diperlukan */}
            </tr>
          </thead>
          <tbody>
            {materiVidioList.map((materi) => (
              <tr key={materi.id}>
                <td>{materi.id}</td>
                <td>{materi.judul_vidio}</td>
                <td>
                  <video width="400" height="200" controls>
                    <source
                      src={`http://localhost:8080/uploads/${materi.vidio_data}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </td>
                <td>{materi.tanggal_upload}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(materi.id)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(materi.id)}
                  >
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

export default AdminPage;
