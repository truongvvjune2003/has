import React, { useRef, useState } from "react";

function DoctorLabCreate() {
    const today = new Date();
    const toDateStr = (d) => d.toISOString().slice(0, 10);
    const toDateOnly = (s) => {
        const d = new Date(s);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    };
    const todayStr = toDateStr(today);
    const yesterdayStr = toDateStr(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1))

    const [form, setForm] = useState({
        testName: "",
        patientName: "",
        dob: "",
        address: "",
        orderDate: todayStr
    });
    const [errors, setErrors] = useState({});
    const firstErrorRef = useRef(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onReset = () => {
        setForm({
            testName: "",
            patientName: "",
            dob: "",
            address: "",
            orderDate: todayStr
        });
        setErrors({});
    }

    const rules = {
        testName: (v) => (!v ? "Vui lòng nhập tên xét nghiệm!" : ""),
        patientName: (v) => {
            if (!v) return "Vui lòng nhập họ tên!";
            if (!/^[\p{L}\s]+$/u.test(v)) return "Họ tên chỉ gồm chữ cái (có dấu) và khoảng trắng!";
            return "";
        },
        dob: (v) => {
            if (!v) return "Vui lòng chọn ngày sinh!"
            if (toDateOnly(v) >= toDateOnly(todayStr)) return "Ngày sinh phải là ngày trong quá khứ!";
            return "";
        },
        address: (v) => (!v ? "Vui lòng nhập địa chỉ!" : ""),
        orderDate: (v) => {
            if (!v) return "Vui lòng chọn ngày chỉ định";
            if (toDateOnly(v) < toDateOnly(todayStr)) return "Ngày chỉ định phải là hôm nay hoặc tương lai!";
            return "";
        }
    }

    const validateForm = () => {
        const newErrors = {};
        Object.entries(rules).forEach(([field, rule]) => {
            const msg = rule(form[field]);
            if (msg) newErrors[field] = msg;
        });
        setErrors(newErrors);
        return newErrors;
    };

    const onPrint = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            if (firstErrorRef.current) firstErrorRef.current.focus();
            return;
        }
        const printableHtml =
            `
        <!doctype html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title></title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 40px;
                            color: #111;
                        }
                        .sheet {
                            max-width: 800px;
                            margin: 0 auto;
                            border: 1px solid #e5e7eb;
                            padding: 24px;
                            border-radius: 12px;
                        }
                        h1 {
                            text-align: center;
                            margin: 0 0 16px;
                            font-size: 22px;
                        }
                        .row {
                            display: flex;
                            margin-bottom: 10px;
                        }
                        .label {
                            width: 220px;
                            color: #374151;
                        }
                        .value {
                            flex: 1;
                            font-weight: normal;
                        }
                        .value-strong {
                            flex: 1;
                            font-weight: bold;
                        }
                        hr {
                            border: none;
                            border-top: 1px dashed #cbd5e1;
                            margin: 16px 0;
                        }
                        .footer {
                            margin-top: 32px;
                            display: flex;
                            justify-content: flex-end;
                        }
                        .sign {
                            text-align: center;
                            min-width: 240px;
                        }
                        @page {
                            margin: 20mm;
                        }
                    </style>
                </head>
                <body>
                    <div class="sheet">
                        <h1>PHIẾU CHỈ ĐỊNH XÉT NGHIỆM</h1>
                        <hr/>

                        <div class="row">
                            <div class="label">Tên xét nghiệm:</div>
                            <div class="value-strong">${form.testName}</div>
                        </div>

                         <div class="row">
                            <div class="label">Họ tên bệnh nhân:</div>
                            <div class="value-strong">${form.patientName}</div>
                        </div>

                        <div class="row">
                            <div class="label">Ngày sinh:</div>
                            <div class="value">${form.dob}</div>
                        </div>

                        <div class="row">
                            <div class="label">Địa chỉ:</div>
                            <div class="value">${form.address}</div>
                        </div>

                        <div class="row">
                            <div class="label">Ngày chỉ định:</div>
                            <div class="value">${form.orderDate}</div>
                        </div>
                        
                        <div class="footer">
                            <div class="sign">
                                <strong>Bác sĩ chỉ định</strong>
                                <div style="margin-top:56px">(Ký, ghi rõ họ tên)</div>
                            </div>
                        </div>
                        
                    </div>
                </body>
            </html>
        `

        const printWindow = window.open("", "PRINT", "height=800,width=700");
        if (!printWindow) return;
        printWindow.document.open();
        printWindow.document.write(printableHtml);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const fields = [
        { name: "testName", label: "Tên xét nghiệm", type: "text", placeholder: "VD: Xét nghiệm máu..." },
        { name: "patientName", label: "Họ tên bệnh nhân", type: "text", placeholder: "VD: Vương Văn Trường..." },
        { name: "dob", label: "Ngày sinh", type: "date", max: yesterdayStr },
        { name: "address", label: "Địa chỉ", type: "text", placeholder: "VD: Số nhà, đường, phường/xã,..." },
        { name: "orderDate", label: "Ngày chỉ định", type: "date", min: todayStr },

    ];

    return (
        <div className="container mb-5 pb-5">
            <h2 className="text-center mb-2">Tạo phiếu chỉ định xét nghiệm</h2>
            <p></p>
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    <div className="row g-3">
                        {fields.map((f) => (
                            <div key={f.name} className="col-12 col-md-6">
                                <label className="form-label">{f.label}</label>
                                <input
                                    type={f.type}
                                    name={f.name}
                                    value={form[f.name]}
                                    onChange={onChange}
                                    placeholder={f.placeholder}
                                    min={f.min}
                                    max={f.max}
                                    className={`form-control ${errors[f.name] ? "is-invalid" : ""}`}
                                    ref={(el) => {
                                        if (errors[f.name] && !firstErrorRef.current) firstErrorRef.current = el;
                                    }}
                                />
                                {errors[f.name] && <div className="invalid-feedback">{errors[f.name]}</div>}
                            </div>
                        ))}
                    </div>
                    <div className="d-flex gap-2 mt-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={onPrint}>In phiếu</button>
                        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onReset}>Làm mới</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorLabCreate;