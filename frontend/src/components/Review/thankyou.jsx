import React from 'react';
const ThankYouPage = () => {
  const navigateToHomePage = () => {
    window.location.href = '/homepage';
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Thank you for your review!</h1>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#2196f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={navigateToHomePage}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ThankYouPage;
