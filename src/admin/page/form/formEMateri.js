import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditMateriPenjelasanForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID dari URL menggunakan useParams()

  const [judul, setJudul] = useState("");
  const [isiPenjelasan, setIsiPenjelasan] = useState("");
  const [tanggalUpload, setTanggalUpload] = useState("");

  useEffect(() => {
    const fetchMateriPenjelasanData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/materi-penjelasan/${id}`);
        if (response.status === 200) {
          const { judul, isipenjelasan, tanggal_upload } = response.data;
          setJudul(judul);
          setIsiPenjelasan(isipenjelasan);
          setTanggalUpload(tanggal_upload);
        } else {
          throw new Error("Failed to fetch Materi Penjelasan");
        }
      } catch (error) {
        console.error("Error fetching Materi Penjelasan data:", error);
      }
    };

    fetchMateriPenjelasanData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "judul") setJudul(value);
    else if (name === "isiPenjelasan") setIsiPenjelasan(value);
    else if (name === "tanggalUpload") setTanggalUpload(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/materip/update/${id}`, {
        judul: judul,
        isipenjelasan: isiPenjelasan,
        tanggal_upload: tanggalUpload
      });

      if (response.status === 200) {
        alert("Materi Penjelasan updated successfully");
        navigate("/MateriPenjelasan");
      } else {
        throw new Error("Failed to update Materi Penjelasan");
      }
    } catch (error) {
      console.error("Error updating Materi Penjelasan:", error);
    }
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Edit Materi Penjelasan</h2>
      <Form onSubmit={handleSubmit} className="w-75">
        <Form.Group controlId="judul" className="mb-3">
          <Form.Label>Judul</Form.Label>
          <Form.Control
            type="text"
            name="judul"
            value={judul}
            onChange={handleInputChange}
            placeholder="Masukkan judul materi"
          />
        </Form.Group>

        <Form.Group controlId="isiPenjelasan" className="mb-3">
          <Form.Label>Isi Penjelasan</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="isiPenjelasan"
            value={isiPenjelasan}
            onChange={handleInputChange}
            placeholder="Masukkan isi penjelasan"
          />
        </Form.Group>

        <Form.Group controlId="tanggalUpload" className="mb-3">
          <Form.Label>Tanggal Upload</Form.Label>
          <Form.Control
            type="date"
            name="tanggalUpload"
            value={tanggalUpload}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditMateriPenjelasanForm;