import React, { useState, useEffect } from "react";
import axios from "axios";
import "./materiP.css";

function Materi1() {
  const [materiPenjelasan, setMateriPenjelasan] = useState([]);
  const idToFetch = 8; // Ganti dengan ID yang ingin Anda panggil

  useEffect(() => {
    const fetchMateriPenjelasan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/materi-penjelasan/${idToFetch}`
        );
        if (response.status === 200) {
          setMateriPenjelasan([response.data]);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching materi penjelasan:", error);
      }
    };

    fetchMateriPenjelasan();
  }, [idToFetch]);

  return (
    <div className="container mt-4">
  <div className="header-section">
    <h1 className="mb-4">Penjelasan Materi</h1>
  </div>
  {materiPenjelasan.map((materi) => (
    <div key={materi.id} className="materi-container">
      <h2 className="materi-title">{materi.judul}</h2>
      <p className="materi-content">{materi.isipenjelasan}</p>
    </div>
  ))}
</div>

  );
}

export default Materi1;
