function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: 200,
        background: "#222",
        color: "white",
        padding: 20
      }}>
        <p>Home</p>
        <p>Dealerships</p>
        <p>Tickets</p>             
        <p>Statistics</p>
        <p>Map</p>                  
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 20 }}>
        <h1>Dashboard</h1>
        <button>Add User</button>
      </div>

    </div>
  );
}

export default App;
