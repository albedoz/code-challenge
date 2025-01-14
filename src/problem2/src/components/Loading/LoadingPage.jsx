import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}>
            <Spinner animation="border" variant="light" />
        </div>
    )
}

export default LoadingPage;