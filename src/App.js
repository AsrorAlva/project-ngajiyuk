import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import Halaman from "./component/Halaman";
import Login from "./page/login/login";
import Register from "./page/register/register";
import Tentang from "./page/tentang/tentang";
import Pengenalan from "./page/pengenalan/pengenalan";
import Babhijaiyah from "./page/Pembelajaran/BabHijaiyah";
import Tandabaca from "./page/Pembelajaran/Tandabaca";
import Iqra1 from "./page/Pembelajaran/iqra 1-3";
import Tajwid1 from "./page/Pembelajaran/Tajwid1";
import Iqra4 from "./page/Pembelajaran/Iqra4-6";
import Tajwid2 from "./page/Pembelajaran/Tajwid2";
import Tajwid3 from "./page/Pembelajaran/Tajwid3";
import Detailhijaiyah from "./page/DetailPembelajaran/Detailhijaiyah";
import Detailiqra1 from "./page/DetailPembelajaran/DetailIqra1";
import Detailiqra4 from "./page/DetailPembelajaran/Detailiqra4";
import Detailtajwid1 from "./page/DetailPembelajaran/Detailtajwid1";
import Detailtajwid3 from "./page/DetailPembelajaran/Detailtajwid3";
import Detailtandabaca from "./page/DetailPembelajaran/Detailtandabaca";
import Detailtajwid2 from "./page/DetailPembelajaran/Detailtajwid2";
import AdminPage from "./admin/page/admin";
import User from "./admin/page/user";
import Ustadz from "./admin/page/ustadz";
import Materividio from "./admin/page/materi-vidio";
import Materipenjelasan from "./admin/page/materi-penjelasan";
import Log from "./admin/page/login/login";
import Detailhijaiyah2 from "./page/Detailbanget/Hijaiyah2";
import Detailhijaiyah3 from "./page/Detailbanget/Hijaiyah3";
import UploadVideoForm from "./admin/page/form/formVidio";
import Materi1 from "./page/materiPenjelasan/materiHijaiyah1";
import EditUser from "./admin/page/form/formEUser";
import CreateAdminForm from "./admin/page/form/formCAdmin";
import EditAdminForm from "./admin/page/form/fromEAdmin";
import CreateUstadzForm from "./admin/page/form/formCUstadz";
import EditUstadz from "./admin/page/form/formEUstadz";
import EditVideoForm from "./admin/page/form/formEVidio";
import FormulirMateriPenjelasan from "./admin/page/form/fromMateri";
import EditMateriPenjelasanForm from "./admin/page/form/formEMateri";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Halaman />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/Pengenalan" element={<Pengenalan />} />
          <Route path="/Babhijaiyah" element={<Babhijaiyah />} />
          <Route path="/Tandabaca" element={<Tandabaca />} />
          <Route path="/Iqra" element={<Iqra1 />} />
          <Route path="/Tajwid1" element={<Tajwid1 />} />
          <Route path="/Iqra4" element={<Iqra4 />} />
          <Route path="/Tajwid2" element={<Tajwid2 />} />
          <Route path="/Tajwid3" element={<Tajwid3 />} />
          <Route path="/Hijaiyah" element={<Detailhijaiyah />} />
          <Route path="/Iqra1-3" element={<Detailiqra1 />} />
          <Route path="/Tajwid1D" element={<Detailtajwid1 />} />
          <Route path="/Tajwid2D" element={<Detailtajwid2 />} />
          <Route path="/Iqra4-6" element={<Detailiqra4 />} />
          <Route path="/Tajwid3D" element={<Detailtajwid3 />} />
          <Route path="/Tandabaca1" element={<Detailtandabaca />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/User" element={<User />} />
          <Route path="/Ustadz" element={<Ustadz />} />
          <Route path="/materividio" element={<Materividio />} />
          <Route path="/materipenjelasan" element={<Materipenjelasan />} />
          <Route path="/loginadmin" element={<Log />} />

          {/* detail lagi */}
          <Route path="/Hijaiyah2" element={<Detailhijaiyah2 />} />
          <Route path="/Hijaiyah3" element={<Detailhijaiyah3 />} />
          <Route path="/Phijaiyah1" element={<Materi1 />} />

          {/* Form */}
          <Route path="/Formulir" element={<UploadVideoForm />} />
          <Route path="/FormVidio/:id" element={<EditVideoForm/>}/>
          <Route path="/Formuser/:id" element={<EditUser />} />
          <Route path="/CreateAdmin" element={<CreateAdminForm/>}/>
          <Route path="/FormAdmin/:id" element={<EditAdminForm/>}/>
          <Route path="/CreateUstadz" element={<CreateUstadzForm/>}/>
          <Route path="/FormUstadz/:id" element={<EditUstadz/>}/>
          <Route path="/FormPenjelasan" element={<FormulirMateriPenjelasan/>}/>
          <Route path="/FormEPenjelasan/:id" element={<EditMateriPenjelasanForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
