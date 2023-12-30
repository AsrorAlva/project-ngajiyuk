import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditAdminForm = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState({
  //   namaAdmin: "",
  //   email: "",
  //   password: ""
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${id}`);
        if (response.status === 200) {
          setAdmin(response.data);
        } else {
          throw new Error("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/admin/edit/${id}`, admin);
      if (response.status === 200) {
        alert("Admin updated successfully");
        window.location.href = "/admin";
      } else {
        throw new Error("Failed to update admin");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Edit Admin</h2>
      <Form onSubmit={handleUpdate} className="w-75">
        <Form.Group controlId="formNamaAdmin" className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="namaAdmin"
            value={admin.namaAdmin || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={admin.email || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={admin.password || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Update Admin
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditAdminForm;
