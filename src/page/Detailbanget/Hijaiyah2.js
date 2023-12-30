import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../DetailPembelajaran/Detail.css";
import tt from "../../assets/thumble.png";

function Detailhijaiyah2() {

  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/materi/vidio/22`);
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  };

  const videoContainerStyle = {
    marginBottom: "20px",
  };

  return (
    <div className="container" style={containerStyle}>
      <div>
  <h2 style={{ textAlign: "center" }}>{videoData && videoData.judul_vidio}</h2>
</div>

      <div className="video-container" style={videoContainerStyle}>
      {videoData && (
          <video width="764" height="430" controls>
            <source src={`http://localhost:8080/uploads/${videoData.vidio_data}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div>
        <h3 style={{ textAlign: "center" }}>Selanjutnya</h3>
        <ul className="video-list">
        <Link to="/Hijaiyah1">
        <div className="video-item">
          <img src={tt} alt="Thumbnail Video 1" className="thumbnail" />
          <span className="video-title">Judul Video 1</span>
        </div>
      </Link>
      <Link to="/Hijaiyah3">
        <div className="video-item">
          <img src={tt} alt="Thumbnail Video 1" className="thumbnail" />
          <span className="video-title">Judul Video 3</span>
        </div>
      </Link>
        </ul>
      </div>
      <div className="centered-containerr">
        <Link to="/pengenalan" className="button-containerr">
          <div>Selesai</div>
        </Link>
      </div>
    </div>
  );
}

export default Detailhijaiyah2;
