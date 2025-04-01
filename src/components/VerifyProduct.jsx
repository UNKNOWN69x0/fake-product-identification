import React, { useState, useEffect, useRef } from 'react';
import '../styles/VerifyProduct.css';

const VerifyProduct = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [productSN, setProductSN] = useState('');
    const [consumerCode, setConsumerCode] = useState('');
    const [verificationStatus, setVerificationStatus] = useState({
        icon: '🔍',
        text: 'Scan product to verify authenticity',
        isGenuine: null
    });
    const [isVerifying, setIsVerifying] = useState(false);
    const videoRef = useRef(null);
    const cameraStreamRef = useRef(null);

    useEffect(() => {
        // Initialize camera
        const initializeCamera = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { facingMode: 'environment' } 
                    });
                    cameraStreamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                } catch (err) {
                    console.error("Camera access error:", err);
                }
            } else {
                alert("Camera access is not supported in this browser");
            }
        };

        initializeCamera();

        // Cleanup function
        return () => {
            if (cameraStreamRef.current) {
                cameraStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        setIsVerifying(true);
        setVerificationStatus({
            icon: '⏳',
            text: 'Verifying...',
            isGenuine: null
        });

        // Simulate verification process
        setTimeout(() => {
            const isGenuine = productSN.toLowerCase() === "sn1" && consumerCode.toLowerCase() === "valid123";
            setIsVerifying(false);
            setVerificationStatus({
                icon: isGenuine ? "✅" : "❌",
                text: isGenuine ? "Genuine Product Verified!" : "Fake Product Detected!",
                isGenuine
            });
        }, 1500);
    };

    return (
        <div className="verify-product">
            {/* Modern Navigation */}
            <nav className="navbar">
                <div className="nav-links">
                    <a href="/index" className="logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        ChainVerify
                    </a>
                    <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
                        <a href="./index">Home</a>
                        <a href="./manufacturer">Manufacturer</a>
                        <a href="./seller">Seller</a>
                        <a href="./consumer" className="active">Consumer</a>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container">
                <h1>Product Verification</h1>
                
                <div className="verification-interface">
                    <div className="scan-section">
                        {/* Camera Preview */}
                        <div className="camera-preview">
                            <video ref={videoRef} id="cameraStream" autoPlay playsInline></video>
                        </div>

                        {/* Input Section */}
                        <div className="input-section">
                            <form onSubmit={handleVerify}>
                                <div className="input-group">
                                    <label htmlFor="productSN">Product Serial Number</label>
                                    <input 
                                        type="text" 
                                        id="productSN" 
                                        placeholder="Scan or enter product SN" 
                                        required
                                        value={productSN}
                                        onChange={(e) => setProductSN(e.target.value)}
                                    />
                                </div>
                                
                                <div className="input-group">
                                    <label htmlFor="consumerCode">Verification Code</label>
                                    <input 
                                        type="text" 
                                        id="consumerCode" 
                                        placeholder="Enter verification code" 
                                        required
                                        value={consumerCode}
                                        onChange={(e) => setConsumerCode(e.target.value)}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="verify-btn"
                                    disabled={isVerifying}
                                >
                                    {isVerifying ? 'Verifying...' : 'Verify Authenticity'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Verification Result */}
                    <div className={`verification-result ${verificationStatus.isGenuine !== null ? 
                        (verificationStatus.isGenuine ? 'genuine' : 'fake') : ''}`}>
                        <div className="result-icon">{verificationStatus.icon}</div>
                        <div className="result-text">{verificationStatus.text}</div>
                        {verificationStatus.isGenuine === false && (
                            <p className="report-text">Report this product to authorities</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyProduct;