import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const CreateUstadzForm = () => {
  const [ustadzData, setUstadzData] = useState({
    username: "",
    password: "",
    email: "",
    nama: "",
    noTlpn: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUstadzData({ ...ustadzData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/ustadz/create`, ustadzData);

      if (response.status === 200) {
        alert("Ustadz created successfully");
        window.location.reload();
        window.location.href = "/ustadz";
      } else {
        throw new Error("Failed to create ustadz");
      }
    } catch (error) {
      console.error("Error creating ustadz:", error);
    }
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Create Ustadz</h2>
      <Form onSubmit={handleSubmit} className="w-75">
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={ustadzData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={ustadzData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={ustadzData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formNama" className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={ustadzData.nama}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formNoTlpn" className="mb-3">
          <Form.Label>No Telepon</Form.Label>
          <Form.Control
            type="text"
            name="noTlpn"
            value={ustadzData.noTlpn}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Create Ustadz
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateUstadzForm;
