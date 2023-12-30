import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";

class Register extends Component {
  state = {
    nama: "",
    username: "",
    email: "",
    password: "",
    konfirmasi: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegister = async (e) => {
    e.preventDefault();

    const {
      nama,
      username,
      email,
      password,
      konfirmasi,
    } = this.state;

    if (password !== konfirmasi) {
      alert("Password dan konfirmasi password tidak cocok");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/register`, {
        nama,
        username,
        email,
        password,
        konfirmasi,
      });

      console.log("Response from user registration API:", response.data);
      // Handle the response here (redirect, display a success message, etc.)
      if (response.status === 200) {
        alert("Anda berhasil Registrasi");
        // console.log("Video uploaded successfully");
        window.location.href = "/login";
        // Lakukan sesuatu setelah berhasil diunggah
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      // Handle errors (display an error message, etc.)
    }
  };

  render() {
    const {
      nama,
      username,
      email,
      password,
      konfirmasi,
    } = this.state;

    return (
      <div>
        <div className="overlay-reg">
          <div className="reg-container">
            <h2>Daftar Akun</h2>
            <form onSubmit={this.handleRegister}>
              <div className="form-group-reg">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={nama}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group-reg">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group-reg">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group-reg">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group-reg">
                <label htmlFor="konfirmasi">Confirm Password</label>
                <input
                  type="password"
                  id="konfirmasi"
                  name="konfirmasi"
                  value={konfirmasi}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type="submit">Daftar</button>
            </form>
            <p className="reg">
              Sudah punya akun? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
