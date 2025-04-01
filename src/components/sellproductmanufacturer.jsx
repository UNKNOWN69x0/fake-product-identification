import React, { useEffect, useRef } from 'react';
import '../styles/sellproductmanufacturer.css'; // We'll extract the CSS into a separate file

const SellProductManufacturer = () => {
    const videoRef = useRef(null);
    const navItemsRef = useRef(null);

    useEffect(() => {
        // Camera access setup
        const video = videoRef.current;
        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(stream => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.error("Camera access error:", err);
                    video.parentElement.style.borderColor = '#ff5757';
                });
        } else {
            alert("Camera access is not supported in this browser");
        }

        // Cleanup function to stop the camera stream
        return () => {
            if (video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleMenu = () => {
        navItemsRef.current.classList.toggle('active');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const productSN = e.target.elements.productSN.value;
        const consumerCode = e.target.elements.consumerCode.value;
        console.log({ productSN, consumerCode });
        // Add your transaction logic here
    };

    return (
        <div className="sell-product-manufacturer">
            {/* Modern Navigation */}
            <nav className="navbar">
                <div className="nav-links">
                    <a href="/" className="logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        ChainVerify
                    </a>
                    <div className="nav-items" ref={navItemsRef}>
                        <a href="/">Home</a>
                        <a href="/manufacturer" className="active">Manufacturer</a>
                        <a href="/seller">Seller</a>
                        <a href="/consumer">Consumer</a>
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
                <h2>Sell Product to Seller</h2>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        {/* Camera Preview */}
                        <div className="camera-preview">
                            <video id="cameraStream" ref={videoRef} autoPlay playsInline></video>
                        </div>

                        {/* Form Inputs */}
                        <div className="form-row">
                            <div className="input-wrapper">
                                <label htmlFor="productSN">Product Serial Number</label>
                                <input type="text" id="productSN" required />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="consumerCode">Consumer Code</label>
                                <input type="text" id="consumerCode" required />
                            </div>
                        </div>

                        <button type="submit">Complete Transaction</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellProductManufacturer;