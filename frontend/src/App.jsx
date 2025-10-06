import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";     
import Footer from "./components/Footer.jsx";     
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Appointments from "./pages/Appointments.jsx";
import Consultations from "./pages/Consultations.jsx";
import Examinations from "./pages/Examinations.jsx";
import Prescriptions from "./pages/Prescriptions.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import DoctorHome from "./pages/DoctorHome.jsx";
import DoctorLabCreate from "./pages/DoctorLabCreate.jsx";

import { Layout } from "antd";
const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />

        <Content style={{ padding: 24 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route element={<RoleRoute allowedRoles={["Patient"]} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/examinations" element={<Examinations />} />
                <Route path="/prescriptions" element={<Prescriptions />} />
              </Route>

              <Route element={<RoleRoute allowedRoles={["Doctor"]} />}>
                <Route path="/doctor" element={<DoctorHome />} />
                <Route path="/doctor/laboratory/create" element={<DoctorLabCreate />} />
              </Route>
            </Route>
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
