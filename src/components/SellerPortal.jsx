import React, { useState, useEffect, useRef } from 'react';
import '../styles/SellerPortal.css';

const SellerPortal = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className="seller-portal">
            {/* Modern Navigation */}
            <nav className="navbar">
                <div className="nav-links">
                    <a href="./index.html" className="logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        ChainVerify
                    </a>
                    <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
                        <a href="./index.html">Home</a>
                        <a href="./manufacturer.html">Manufacturer</a>
                        <a href="./seller.html" className="active">Seller</a>
                        <a href="./consumer.html">Consumer</a>
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
                <h2>Complete Product Sale</h2>
                <div className="transaction-interface">
                    <div className="camera-preview">
                        <video ref={videoRef} id="cameraStream" autoPlay playsInline></video>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-wrapper">
                                <label htmlFor="productSN">Product Serial Number</label>
                                <input 
                                    type="text" 
                                    id="productSN" 
                                    placeholder="Scan or enter product SN" 
                                    required 
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="consumerCode">Consumer Code</label>
                                <input 
                                    type="text" 
                                    id="consumerCode" 
                                    placeholder="Enter consumer code" 
                                    required 
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">Confirm Sale</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerPortal;