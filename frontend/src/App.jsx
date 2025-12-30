// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [docs, setDocs] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  // Fetch documents from backend
  const fetchDocs = () => {
    axios.get("http://localhost:8080/kyc").then((res) => {
      setDocs(res.data);
    });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // Validation function
  const validate = () => {
    let err = {};

    if (documentNumber.length !== 8 || !/^[A-Za-z0-9-]+$/.test(documentNumber)) {
      err.documentNumber = "Document number must be 8 characters (letters, numbers, or -)";
    }

    let isDate = new Date(issueDate);
    let exDate = new Date(expiryDate);
    let today = new Date();

    if (isDate >= today) {
      err.issueDate = "Issue date must be before today";
    }
    if (exDate <= today) {
      err.expiryDate = "Expiry date must be after today";
    }

    let oneYear = 1000 * 60 * 60 * 24 * 365;
    if (exDate - isDate < oneYear) {
      err.expiryDate = "Expiry must be at least 1 year after issue date";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Add or Update document same code for add and update diff is if edit id is null then new row else update the existing 
  const handleAdd = () => {
    if (!validate()) return;

    const newDoc = {
      customerName,
      documentType,
      documentNumber,
      issueDate,
      expiryDate,
      verificationStatus: status,
    };

    if (editId) {
      // Update existing document here using put because edit id id not null here and we are upadating the already existing doc and we getthe edit id from handle edit function
      axios.put(`http://localhost:8080/kyc/${editId}`, newDoc).then(fetchDocs);
      setEditId(null);
    } else {
      // Add new document
      axios.post("http://localhost:8080/kyc", newDoc).then(fetchDocs);
    }

    // Clear form to clear the names just added in the front end
    setCustomerName("");
    setDocumentType("");
    setDocumentNumber("");
    setIssueDate("");
    setExpiryDate("");
    setStatus("");
  };

  // Delete document
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/kyc/${id}`).then(fetchDocs);
  };

  // Edit document here the edit id gained is used in update document to send the put request as well
  const handleEdit = (doc) => {
    setEditId(doc.id);
    setCustomerName(doc.customerName);
    setDocumentType(doc.documentType);
    setDocumentNumber(doc.documentNumber);
    setIssueDate(doc.issueDate);
    setExpiryDate(doc.expiryDate);
    setStatus(doc.verificationStatus);
  };

  // Search for customer by name
  const handleSearch = () => {
    if (!searchName.trim()) return;

    // Filter from already fetched docs here i did not call the backend again instead i used the already having data in my docs state variable
    const filtered = docs.filter(doc =>
      doc.customerName.toLowerCase() === searchName.toLowerCase()
    );

    if (filtered.length === 0) {
      setSearchResult("No records found");
    } else {
      setSearchResult(`Status: ${filtered[0].verificationStatus}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f0f4f8" }}>
      {/* KYC Documents Heading */}
      <h1 style={{
        textAlign: "center",
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "30px",
        color: "#1a237e"
      }}>
        KYC Documents
      </h1>

      {/* SEARCH BAR */}
      <div style={{
        background: "#ffeb3b",
        padding: "10px",
        width: "50%",
        margin: "0 auto 20px auto",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <input
          type="text"
          placeholder="Enter the name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "10px", width: "70%", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            background: "#1a237e",
            color: "white",
            marginLeft: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{searchResult}</p>
      </div>

      {/* INPUT FORM */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "20px"
      }}>
        <input
          placeholder="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          <option value="">Select Document Type</option>
          <option>Passport</option>
          <option>State ID</option>
          <option>Drivers License</option>
          <option>Permanent Resident Card</option>
          <option>Military Card</option>
        </select>

        <input
          placeholder="Document Number"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
        {errors.documentNumber && <span style={{ color: "red" }}>{errors.documentNumber}</span>}

        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />
        {errors.issueDate && <span style={{ color: "red" }}>{errors.issueDate}</span>}

        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        {errors.expiryDate && <span style={{ color: "red" }}>{errors.expiryDate}</span>}

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button
          onClick={handleAdd}
          style={{
            background: "#1a237e",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {editId ? "Update" : "Add Document"}
        </button>
      </div>

      {/* TABLE */}
      <table border="1" style={{
        width: "100%",
        background: "#d6ecff",
        color: "black",
        borderCollapse: "collapse",
        textAlign: "center"
      }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Document Type</th>
            <th>Document Number</th>
            <th>Issue Date</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>{/*for every id give all the fields mentioned below in one row*/ }
              <td>{doc.id}</td>{/*td is table data tr is table row*/}
              <td>{doc.customerName}</td>
              <td>{doc.documentType}</td>
              <td>{doc.documentNumber}</td>
              <td>{doc.issueDate}</td>
              <td>{doc.expiryDate}</td>
              <td>{doc.verificationStatus}</td>
              <td>
                <button
                  onClick={() => handleEdit(doc)} 
                  style={{
                    background: "#1a237e",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  style={{
                    background: "red",
                    color: "white",
                    marginLeft: "5px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;// ensures that app functional component is available in other files as well
