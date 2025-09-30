import React from "react";
import { Link } from "react-router-dom"

function DoctorCard({ to, title, icoin }) {
    return (
        <Link to={to} className="text-decoration-none">
            <div
                className="card shadow-sm border-0 rounded-4"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 0.75rem 1.5rem rgba(0,0,0,.08)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                }}
                style={{ transition: "all .2s ease" }}
            >
                <div
                    className="card-body d-flex align-items-center justify-content-center"
                    style={{ minHeight: 160 }}
                >
                    <h3 className="mb-0 fw-bold">
                        {icoin} {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
}

function DoctorHome() {
    const cards = [
        { to: "doctor/schedule", title: "Xem lịch khám", icoin: "📅" },
        { to: "doctor/schedule", title: "Tạo phiếu chỉ định xét nghiệm", icoin: "🧪" },
        { to: "doctor/schedule", title: "Hồ sơ bệnh án", icoin: "📁" },
    ];

    return (
        <div className="container mb-5 pb-5">
            <div className="row g-3">
                {cards.map((c, index) => (
                    <div className="col-12" key={index}>
                        <DoctorCard {...c} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorHome;