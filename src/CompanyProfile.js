import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyProfile.css'; // Import CSS file for styling

const CompanyProfile = () => {
  const [symbol, setSymbol] = useState('');
  const [companyData, setCompanyData] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (companyData && companyData.logo) {
      setCompanyLogo(companyData.logo);
    }
  }, [companyData]);

  const fetchCompanyData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=cngv0c9r01qhlsli9jhgcngv0c9r01qhlsli9ji0`);
      setCompanyData(response.data);
    } catch (error) {
      setError('Error fetching data. Please make sure the company symbol is valid.');
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCompanyData();
  };

  return (
    <div className="company-profile">
      <form onSubmit={handleSubmit}>
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter company symbol" />
        <button type="submit">Fetch Profile</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {companyData && (
        <div className="profile-details">
          <h2>Company Profile</h2>
          {companyLogo && <img src={companyLogo} alt="Company Logo" className="company-logo" />}
          <p><strong>Name:</strong> {companyData.name}</p>
          <p><strong>Exchange:</strong> {companyData.exchange}</p>
          <p><strong>Industry:</strong> {companyData.finnhubIndustry}</p>
          <p><strong>Website:</strong> <a href={companyData.weburl} target="_blank" rel="noopener noreferrer">{companyData.weburl}</a></p>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
