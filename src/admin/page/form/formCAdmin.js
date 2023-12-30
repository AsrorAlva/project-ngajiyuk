import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const CreateAdminForm = () => {
  const [namaAdmin, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/admin/create`, {
        namaAdmin,
        email,
        password,
      });

      if (response.status === 200) {
        // console.log("Admin created successfully");
        alert("Data User Berhasil di Update");
        window.location.reload();
        window.location.href = "/admin";
        // Redirect or show success message
      } else {
        throw new Error("Failed to create admin");
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      // Handle errors (display an error message, etc.)
    }
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Create Admin</h2>
      <Form onSubmit={handleSubmit} className="w-75">
        <Form.Group controlId="formNama" className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control type="text" value={namaAdmin} onChange={handleNamaChange} />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Create Admin
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateAdminForm;
