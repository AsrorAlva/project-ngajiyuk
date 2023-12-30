import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usera/${id}`);
        if (response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/user/edit/${id}`,
        user
      );
      if (response.status === 200) {
        alert("Data User Berhasil di Update");
        console.log("User updated successfully");
        window.location.href = "/User";
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle errors (display an error message, etc.)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container className="my-5 py-5 border rounded shadow-lg d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Edit User</h2>
      <Form onSubmit={handleUpdate} className="w-75">
        <Form.Group controlId="formNama" className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={user.nama || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Update User
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditUser;
