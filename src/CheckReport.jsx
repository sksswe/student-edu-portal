import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/check-reports')
      .then(response => {
        console.log(response.data);
        setReports(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch reports:', error);
        alert('Failed to fetch reports');
      });
  }, []);

  return (
    <div className="container">
      <h1>Check Reports</h1>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>{report}</li>
        ))}
      </ul>
    </div>
  );
}

export default CheckReport;
