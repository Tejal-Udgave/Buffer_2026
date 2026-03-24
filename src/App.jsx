import { useState } from "react";
import { GoogleMap, LoadScript ,Marker, InfoWindow} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 19.076,
  lng: 72.8777,
};
const stores = [
  { id: 1, lat: 19.076, lng: 72.8777, quantity: 0 },
  { id: 2, lat: 19.08, lng: 72.88, quantity: 3 },
  { id: 3, lat: 19.09, lng: 72.89, quantity: 10 },
];
function getColor(quantity) {
  if (quantity === 0) return "red";
  if (quantity < 5) return "yellow";
  return "green";
}
function App() {
  const [selectedStore, setSelectedStore] = useState(null);
  return (
    <LoadScript googleMapsApiKey="AIzaSyBg577sI230SxkIi3fE7DTfpaVBL6wIfzQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => setSelectedStore(store)}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${getColor(store.quantity)}-dot.png`
            }}
          />
        ))}
        {selectedStore && (
          <InfoWindow
            position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div>
              <h3>Store ID: {selectedStore.id}</h3>
              <p>Stock: {selectedStore.quantity}</p>
              {selectedStore.quantity < 3 && (
                <p style={{ color: "red" }}>Running Out Soon!</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
      }}>
        <p><span style={{ color: "green" }}>●</span> High Stock</p>
        <p><span style={{ color: "yellow" }}>●</span> Low Stock</p>
        <p><span style={{ color: "red" }}>●</span> Out of Stock</p>
      </div>
    </LoadScript>
  );
}

export default App;