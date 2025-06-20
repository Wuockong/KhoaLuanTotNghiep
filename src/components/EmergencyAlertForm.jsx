import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { fetchNearbyHospitals } from "../services/osmService";
import _ from "lodash";
// import L from "leaflet";
import "../../src/assets/styles/pages/alertForm.css";

export default function EmergencyAlertForm() {
  const [formData, setFormData] = useState({
    alert_code: "",
    elderly_id: "",
    nurse_id: "",
    triggered_by: "y_ta",
    incident_type: "nga",
    description: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const hospitals = await fetchNearbyHospitals(lat, lng);
          if (!hospitals.length)
            throw new Error("Không tìm thấy bệnh viện gần.");

          const nearest = _.minBy(hospitals, (h) => {
            const dLat = h.lat - lat;
            const dLng = h.lng - lng;
            return dLat * dLat + dLng * dLng;
          });

          const now = new Date();
          const alertCode =
            (formData.alert_code || "NGA") +
            now.toISOString().slice(0, 16).replace(/[-:T]/g, "");

          const payload = {
            _id: Date.now().toString(),
            alert_code: alertCode,
            elderly_id: formData.elderly_id,
            nurse_id: formData.nurse_id || null,
            triggered_by: formData.triggered_by,
            incident_type: formData.incident_type,
            description: formData.description,
            location: {
              type: "Point",
              coordinates: [lng, lat],
            },
            status: "da_nhan",
            created_at: now.toISOString(),
            received_at: now.toISOString(),
            updated_at: now.toISOString(),
            medical_facility_notified: true,
            hospital_assigned: {
              hospital_id: nearest.id || "unknown",
              name: nearest.name || "unknown",
              address: nearest.address || "unknown",
              contact_phone: nearest.phone || "unknown",
              distance_km: nearest.distance || 0,
              latitude: nearest.lat,
              longitude: nearest.lng,
              rating: nearest.rating || 0,
              type: nearest.type || "general",
              emergency_available: nearest.emergency_available || true,
            },
            notified_contacts: [],
            action_logs: [
              {
                timestamp: now.toISOString(),
                action: "received",
                performed_by: {
                  user_id: "system",
                  name: "Hệ thống",
                  role: "auto",
                },
                details: "Cảnh báo đã được hệ thống nhận.",
              },
              {
                timestamp: now.toISOString(),
                action: "assigned_to_hospital",
                performed_by: {
                  user_id: "system",
                  name: "Hệ thống",
                  role: "auto",
                },
                details: `Đã gửi tới bệnh viện ${nearest.name}.`,
              },
            ],
          };

          setSubmittedData(payload);
          downloadJSON(payload, `alert_${payload._id}.json`);
        } catch (err) {
          alert(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        alert("Lỗi lấy vị trí: " + err.message);
        setLoading(false);
      }
    );
  };

  const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Tạo Cảnh Báo Khẩn Cấp</h2>
          <Input
            placeholder="Mã cảnh báo (3 ký tự)"
            name="alert_code"
            onChange={handleChange}
          />
          <Input
            placeholder="ID người cao tuổi"
            name="elderly_id"
            onChange={handleChange}
          />
          <Input
            placeholder="ID y tá (tùy chọn)"
            name="nurse_id"
            onChange={handleChange}
          />
          <Input
            placeholder="Mô tả sự cố"
            name="description"
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lấy vị trí..." : "Gửi cảnh báo"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Bản đồ cảnh báo</h2>
          {submittedData ? (
            <MapContainer
              center={[
                submittedData.location.coordinates[1],
                submittedData.location.coordinates[0],
              ]}
              zoom={14}
              style={{ height: 400, width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OSM"
              />
              <Circle
                center={[
                  submittedData.location.coordinates[1],
                  submittedData.location.coordinates[0],
                ]}
                radius={50}
                color="red"
                fillOpacity={0.6}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span>
                    📍 <strong>Vị trí người dùng</strong>
                    <br />
                    Kinh độ: {submittedData.location.coordinates[0].toFixed(5)}
                    <br />
                    Vĩ độ: {submittedData.location.coordinates[1].toFixed(5)}
                  </span>
                </Tooltip>
              </Circle>
              <Circle
                center={[
                  submittedData.hospital_assigned.latitude,
                  submittedData.hospital_assigned.longitude,
                ]}
                radius={70}
                color="blue"
                fillOpacity={0.4}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span>
                    🏥 <strong>{submittedData.hospital_assigned.name}</strong>
                    <br />
                    Địa chỉ: {submittedData.hospital_assigned.address}
                    <br />
                    Liên hệ: {submittedData.hospital_assigned.contact_phone}
                  </span>
                </Tooltip>
              </Circle>
            </MapContainer>
          ) : (
            <p className="text-gray-500">Chưa có cảnh báo nào.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
