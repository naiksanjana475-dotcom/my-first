import React, { useEffect, useState } from "react";
import API from "../api";

function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    hourlyRate: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch clients
  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ✅ Add / Update client
  const addClient = async () => {
    if (!form.name || !form.email || !form.hourlyRate) {
      alert("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    try {
      if (editId) {
        await API.put(`/clients/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/clients", form);
      }

      setForm({ name: "", email: "", hourlyRate: "" });
      fetchClients();
    } catch (err) {
      alert("Error saving client");
    }
  };

  // ✅ Delete
  const deleteClient = async (id) => {
    try {
      await API.delete(`/clients/${id}`);
      fetchClients();
    } catch {
      alert("Error deleting client");
    }
  };

  // ✅ Edit
  const editClient = (client) => {
    setForm({
      name: client.name,
      email: client.email,
      hourlyRate: client.hourlyRate,
    });
    setEditId(client._id);
  };

  return (
    <div className="container mt-5">
      <div
        className="p-4 rounded shadow"
        style={{ background: "#fff" }}
      >
        {/* Logout */}
        <button
          className="btn btn-dark mb-3"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        <h2 className="text-center mb-4">Clients Dashboard</h2>

        {/* Dashboard */}
        <div className="card p-3 mb-4 shadow">
          <h5>Total Clients: {clients.length}</h5>
          <h5>
            Total Earnings: ₹
            {clients.reduce(
              (total, c) => total + Number(c.hourlyRate || 0),
              0
            )}
          </h5>
        </div>

        {/* Form */}
        <div className="card p-4 mb-4 shadow">
          <h4>{editId ? "Edit Client" : "Add New Client"}</h4>

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Hourly Rate"
            value={form.hourlyRate}
            onChange={(e) =>
              setForm({ ...form, hourlyRate: e.target.value })
            }
          />

          <button
            className="btn btn-success w-100"
            onClick={addClient}
          >
            {editId ? "Update Client" : "Add Client"}
          </button>
        </div>

        {/* Clients List */}
        <div className="row">
          {clients.map((c) => (
            <div className="col-md-4" key={c._id}>
              <div
                className="card p-3 mb-3"
                style={{
                  borderRadius: "15px",
                  transition: "0.3s",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <h5>{c.name}</h5>
                <p>{c.email}</p>
                <h6>₹{c.hourlyRate}</h6>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => editClient(c)}
                >
                  Edit ✏️
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteClient(c._id)}
                >
                  Delete ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clients;