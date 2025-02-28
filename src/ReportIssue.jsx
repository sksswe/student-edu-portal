import React, { useState } from 'react';
import axios from 'axios';

function ReportIssue() {
  const [issue, setIssue] = useState('');

  const handleReportIssue = () => {
    axios.post('/api/report-issue', { issue })
      .then(response => alert('Issue reported successfully'))
      .catch(error => alert('Reporting issue failed'));
  };

  return (
    <div className="container">
      <h1>Report Issue</h1>
      <textarea placeholder="Describe the issue" value={issue} onChange={e => setIssue(e.target.value)} />
      <button onClick={handleReportIssue}>Report Issue</button>
    </div>
  );
}

export default ReportIssue;
