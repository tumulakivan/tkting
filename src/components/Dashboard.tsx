import React from 'react';

const Dashboard = () => {
  const students = [
    { id: 1, name: 'Kent Abadiano', email: 'Kd@example.com', plan: 'Motorcycle' },
    { id: 2, name: 'Jivonz Dy', email: 'Jivonz@example.com', plan: 'Car' },
    { id: 3, name: 'Ivan Tumulak', email: 'Ivan@example.com', plan: 'Motorcycle' },
    { id: 4, name: 'John Earl', email: 'John@example.com', plan: 'Car' },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Student Dashboard</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ padding: '16px', textAlign: 'left', border: '1px solid #e5e7eb' }}>#</th>
            <th style={{ padding: '16px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ padding: '16px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Email</th>
            <th style={{ padding: '16px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td style={{ padding: '16px', border: '1px solid #e5e7eb' }}>{student.id}</td>
              <td style={{ padding: '16px', border: '1px solid #e5e7eb' }}>{student.name}</td>
              <td style={{ padding: '16px', border: '1px solid #e5e7eb' }}>{student.email}</td>
              <td style={{ padding: '16px', border: '1px solid #e5e7eb' }}>
                <span style={{
                  padding: '8px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 
                    student.plan === 'Motorcycle' ? '#d1fae5' :
                    student.plan === 'Car' ? '#fef3c7' :
                    '#e0e7ff',
                  color: 
                    student.plan === 'Motorcycle' ? '#065f46' :
                    student.plan === 'Car' ? '#92400e' :
                    '#3730a3'
                }}>
                  {student.plan}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;