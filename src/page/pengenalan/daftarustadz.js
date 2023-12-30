import React, { useState, useEffect } from "react";
import axios from "axios";

function UstadzListModal({ isOpen, onClose }) {
  const [ustadzList, setUstadzList] = useState([]);

  useEffect(() => {
    // Panggil endpoint API untuk mendapatkan daftar ustadz dari CodeIgniter 4
    const fetchUstadzList = async () => {
      try {
        const response = await axios.get("URL_API_ANDA/ustadz");
        setUstadzList(response.data);
      } catch (error) {
        console.error("Error fetching ustadz list:", error);
      }
    };

    if (isOpen) {
      fetchUstadzList();
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Daftar Ustadz</h2>
        <ul>
          {ustadzList.map((ustadz) => (
            <li key={ustadz.id}>{ustadz.name}</li>
            // Sesuaikan dengan struktur data dari API Anda
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UstadzListModal;
