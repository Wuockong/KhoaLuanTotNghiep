import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input.jsx";
import { Card, CardContent } from "./ui/card.jsx";

const DEFAULT_POSITION = [10.823098, 106.629664];

export default function EmergencyAlertForm() {
  const [formData, setFormData] = useState({
    alert_code: "",
    elderly_id: "",
    nurse_id: "",
    triggered_by: "y_ta",
    incident_type: "nga",
    description: "",
    location: {
      type: "Point",
      coordinates: [106.629664, 10.823098],
    },
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    const coords = e.target.value.split(",").map(Number);
    setFormData({
      ...formData,
      location: { ...formData.location, coordinates: [coords[1], coords[0]] },
    });
  };

  const handleSubmit = () => {
    const hospital = {
      hospital_id: "hospital123",
      name: "Bệnh viện Trung Ương",
      address: "123 Đường Y Tế, TP.HCM",
      contact_phone: "0123456789",
      distance_km: 1.2,
    };

    const payload = {
      ...formData,
      _id: Date.now().toString(),
      status: "da_nhan",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      received_at: new Date().toISOString(),
      medical_facility_notified: true,
      hospital_assigned: hospital,
      notified_contacts: [],
      action_logs: [
        {
          timestamp: new Date().toISOString(),
          action: "received",
          performed_by: {
            user_id: "system",
            name: "Hệ thống",
            role: "auto",
          },
          details: "Cảnh báo đã được hệ thống nhận.",
        },
        {
          timestamp: new Date().toISOString(),
          action: "assigned_to_hospital",
          performed_by: {
            user_id: "system",
            name: "Hệ thống",
            role: "auto",
          },
          details: `Đã gửi hồ sơ tới bệnh viện ${hospital.name}, cách ${hospital.distance_km} km.`,
        },
      ],
    };

    setSubmittedData(payload);
    downloadJSON(payload);
  };

  const downloadJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `emergency_alert_${data._id}.json`;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Tạo Cảnh Báo Khẩn Cấp</h2>
          <Input
            placeholder="Mã cảnh báo (VD: NGA202510051430)"
            name="alert_code"
            onChange={handleChange}
          />
          <Input
            placeholder="ID người cao tuổi"
            name="elderly_id"
            onChange={handleChange}
          />
          <Input
            placeholder="ID y tá (có thể để trống)"
            name="nurse_id"
            onChange={handleChange}
          />
          <Input
            placeholder="Mô tả sự cố"
            name="description"
            onChange={handleChange}
          />
          <Input
            placeholder="Tọa độ vị trí (lat,lng) VD: 10.823098,106.629664"
            onChange={handleLocationChange}
          />
          <Button onClick={handleSubmit}>Gửi cảnh báo</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Bản đồ vị trí cảnh báo</h2>
          <MapContainer
            center={DEFAULT_POSITION}
            zoom={13}
            style={{ height: "400px", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {submittedData && (
              <>
                <Marker
                  position={[
                    submittedData.location.coordinates[1],
                    submittedData.location.coordinates[0],
                  ]}>
                  <Popup>Vị trí người gửi</Popup>
                </Marker>
                <Marker
                  position={[
                    submittedData.location.coordinates[1] + 0.01,
                    submittedData.location.coordinates[0],
                  ]}>
                  <Popup>
                    Bệnh viện: {submittedData.hospital_assigned?.name}
                  </Popup>
                </Marker>
              </>
            )}
          </MapContainer>

          {submittedData && (
            <div className="mt-4 text-green-600 font-semibold">
              Đã gửi thông tin tới bệnh viện gần nhất:{" "}
              {submittedData.hospital_assigned?.name}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
