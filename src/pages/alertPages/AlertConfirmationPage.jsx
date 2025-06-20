// /pages/AlertConfirmationPage.jsx
import { useParams, Link } from "react-router-dom";
import { useAlertDetail } from "../hooks/useAlerts";
import LocationMap from "../components/LocationMap";

export default function AlertConfirmationPage() {
  const { id } = useParams();
  const { alert, loading } = useAlertDetail(id);

  if (loading || !alert) return <p>Đang tải...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-green-700">✅ Gửi cảnh báo thành công!</h1>
      <p>Mã cảnh báo: <b>{alert.alert_code}</b></p>
      <LocationMap location={alert.location} hospital={alert.hospital_assigned} />
      <div>
        <p><b>Bệnh viện được phân công:</b> {alert.hospital_assigned?.name}</p>
        <p>Hệ thống đã chuyển thông tin đến cơ sở y tế gần nhất.</p>
      </div>
      <Link to={`/alerts/${id}`} className="text-blue-600 underline">Xem chi tiết cảnh báo</Link>
    </div>
  );
}
