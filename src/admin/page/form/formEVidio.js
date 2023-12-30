import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditVideoForm = () => {
  const { id } = useParams();
  const [materi, setMateri] = useState({
    judul_vidio: "",
    vidio_data: "", // Ubah dengan tipe data yang sesuai untuk menyimpan informasi video
    tanggal_upload: "",
  });

  useEffect(() => {
    const fetchMateriData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/materi/vidio/${id}`);
        if (response.status === 200) {
          setMateri(response.data);
        } else {
          throw new Error("Failed to fetch materi data");
        }
      } catch (error) {
        console.error("Error fetching materi data:", error);
      }
    };

    fetchMateriData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/materi/update/${id}`,
        materi
      );
      if (response.status === 200) {
        console.log("Materi updated successfully");
        // Redirect or show success message
      } else {
        throw new Error("Failed to update materi");
      }
    } catch (error) {
      console.error("Error updating materi:", error);
      // Handle errors (display an error message, etc.)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMateri({ ...materi, [name]: value });
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Edit Materi Video</h2>
      <p>Judul id : {id}</p>
      <Form onSubmit={handleUpdate} className="w-75">
        <Form.Group controlId="formJudulMateri" className="mb-3">
          <Form.Label>Judul Materi</Form.Label>
          <Form.Control
            type="text"
            name="judul_vidio"
            value={materi.judul_vidio || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Input untuk video_data (file video) */}
        <Form.Group controlId="formVideoData" className="mb-3">
          <Form.Label>Video File</Form.Label>
          <Form.Control
            type="file"
            name="vidio_data"
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* Input untuk tanggal_upload */}
        {/* <Form.Group controlId="formTanggalUpload" className="mb-3">
          <Form.Label>Tanggal Upload</Form.Label>
          <Form.Control
            type="date"
            name="tanggal_upload"
            value={materi.tanggal_upload || ""}
            onChange={handleInputChange}
          />
        </Form.Group> */}

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Update Materi
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditVideoForm;
