import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const UploadVideoForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [judulMateri, setJudulMateri] = useState("");
  const [tanggalUpload, setTanggalUpload] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setVideoFile(selectedFile);
  };

  const handleJudulChange = (event) => {
    setJudulMateri(event.target.value);
  };

  const handleTanggalUploadChange = (event) => {
    setTanggalUpload(event.target.value);
  };

  const handleUpload = async () => {
    if (!videoFile || !judulMateri || !tanggalUpload) {
      console.log("Mohon lengkapi semua field!");
      return;
    }

    const formData = new FormData();
    formData.append("judul_vidio", judulMateri);
    formData.append("vidio_data", videoFile);
    formData.append("tanggal_upload", tanggalUpload);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/upload-video`,
        formData
      );

      if (response.status === 200) {
        alert("Data User Berhasil di Update");
        console.log("Video uploaded successfully");
        window.location.href = "/materividio";
        // Lakukan sesuatu setelah berhasil diunggah
      } else {
        throw new Error("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      // Lakukan penanganan error jika diperlukan
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload(); // Panggil fungsi untuk upload video
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Upload Video</h2>
      <Form onSubmit={handleSubmit} className="w-75">
        <Form.Group controlId="formJudulMateri" className="mb-3">
          <Form.Label>Judul Materi</Form.Label>
          <Form.Control
            type="text"
            value={judulMateri}
            onChange={handleJudulChange}
          />
        </Form.Group>

        <Form.Group controlId="formVideoFile" className="mb-4">
          <Form.Label>Pilih file video</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group controlId="formTanggalUpload" className="mb-3">
          <Form.Label>Tanggal Upload</Form.Label>
          <Form.Control
            type="date"
            value={tanggalUpload}
            onChange={handleTanggalUploadChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Upload
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UploadVideoForm;
