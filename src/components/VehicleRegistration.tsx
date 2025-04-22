import React, { useState } from 'react';

interface Entry {
  name: string;
  email: string;
  vehicle: 'Car' | 'Motorcycle';
  payment: 'Gcash' | 'Card' | 'Pay at the counter';
}

const VehicleRegistration: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [formData, setFormData] = useState<Entry>({
    name: '',
    email: '',
    vehicle: 'Car',
    payment: 'Gcash',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEntries((prev) => [...prev, formData]);
    setFormData({ name: '', email: '', vehicle: 'Car', payment: 'Gcash' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register Vehicle</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Vehicle Type</label>
            <select 
              name="vehicle" 
              value={formData.vehicle} 
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Payment Method</label>
            <select 
              name="payment" 
              value={formData.payment} 
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Gcash">Gcash</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="Pay at the counter">Pay at the counter</option>
            </select>
          </div>
          
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>

      {entries.length > 0 && (
        <div style={styles.entriesContainer}>
          <h3 style={styles.subtitle}>Registered Entries</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>#</th>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Vehicle</th>
                  <th style={styles.tableHeader}>Payment</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                    <td style={styles.tableCell}>{index + 1}</td>
                    <td style={styles.tableCell}>{entry.name}</td>
                    <td style={styles.tableCell}>{entry.email}</td>
                    <td style={styles.tableCell}>{entry.vehicle}</td>
                    <td style={styles.tableCell}>{entry.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  title: {
    color: '#2d3748',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    fontWeight: '600',
  },
  subtitle: {
    color: '#2d3748',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    color: '#4a5568',
    fontWeight: '500',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem',
  },
  entriesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tableContainer: {
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '1rem',
  },
  tableHeaderRow: {
    backgroundColor: '#f7fafc',
  },
  tableHeader: {
    padding: '1rem',
    textAlign: 'left' as const,
    color: '#4a5568',
    fontWeight: '600',
    borderBottom: '1px solid #e2e8f0',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  tableRowAlt: {
    backgroundColor: '#f7fafc',
    '&:hover': {
      backgroundColor: '#f0f5ff',
    },
  },
  tableCell: {
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#4a5568',
  },
};

export default VehicleRegistration;