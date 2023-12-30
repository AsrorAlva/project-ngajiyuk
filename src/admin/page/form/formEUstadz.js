import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditUstadz = () => {
  const { id } = useParams();
  const [ustadzData, setUstadzData] = useState({});

  useEffect(() => {
    const fetchUstadz = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ustadz/${id}`);
        if (response.status === 200) {
          setUstadzData(response.data);
        } else {
          throw new Error("Failed to fetch ustadz data");
        }
      } catch (error) {
        console.error("Error fetching ustadz data:", error);
      }
    };

    fetchUstadz();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/ustadz/edit/${id}`, ustadzData);
      if (response.status === 200) {
        alert("Ustadz updated successfully");
        window.location.href = "/ustadz";
      } else {
        throw new Error("Failed to update ustadz");
      }
    } catch (error) {
      console.error("Error updating ustadz:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUstadzData({ ...ustadzData, [name]: value });
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Edit Ustadz</h2>
      <Form onSubmit={handleUpdate} className="w-75">
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={ustadzData.username || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={ustadzData.password || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={ustadzData.email || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formNama" className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={ustadzData.nama || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formNoTlpn" className="mb-3">
          <Form.Label>No Telepon</Form.Label>
          <Form.Control
            type="text"
            name="noTlpn"
            value={ustadzData.noTlpn || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Update Ustadz
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditUstadz;
