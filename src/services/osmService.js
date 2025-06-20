// src/services/osmService.js
export async function fetchNearbyHospitals(lat, lng, radius = 5000) {
  const query = `
      [out:json][timeout:25];
      node(around:${radius},${lat},${lng})["amenity"="hospital"];
      out center;
    `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Overpass API lỗi: " + res.statusText);
  const data = await res.json();
  return data.elements.map((el) => ({
    id: el.id,
    name: el.tags?.name || "Không rõ tên",
    lat: el.lat,
    lng: el.lon,
  }));
}
