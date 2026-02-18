import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackgroundRemoverUI = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // API configuration
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/remove-bg';
  const API_KEY = import.meta.env.VITE_API_KEY || 'mysecretkey123';

  // Clear messages after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Validate file
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, etc.)');
      return false;
    }
    return true;
  };

  // Read image as base64
  const readImageAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection
  const handleFileSelect = async (file) => {
    if (!validateFile(file)) return;

    setSelectedImage(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setResultImage(null);
    };
    reader.readAsDataURL(file);
  };

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Remove background
  const handleRemoveBackground = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Convert image to base64
      const base64Image = await readImageAsBase64(selectedImage);

      // Send to API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API key is invalid');
        }
        if (response.status === 400) {
          throw new Error('Invalid image format');
        }
        throw new Error(`API error: ${response.status}`);
      }

      // Get result as blob and convert to data URL
      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultImage(resultUrl);
      setSuccessMessage('✓ Background removed successfully!');
    } catch (err) {
      console.error('Error removing background:', err);
      setError(err.message || 'Failed to remove background. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Download result image
  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `removed-bg-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccessMessage('✓ Image downloaded successfully!');
  };

  // Reset everything
  const handleReset = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setResultImage(null);
    setError('');
    setSuccessMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fc' }}>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div className="container-lg">
          <a className="navbar-brand fw-bold" href="#" style={{ color: '#5865f2', fontSize: '1.5rem' }}>
            ✨ Remover.AI
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="ms-auto">
              <button className="btn btn-sm" style={{ color: '#5865f2', border: '2px solid #5865f2' }}>
                Account
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 py-5">
        <div className="container-lg">
          {/* ALERTS */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert" style={{ borderRadius: '12px' }}>
              <strong>⚠️ Error:</strong> {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show mb-4" role="alert" style={{ borderRadius: '12px', backgroundColor: '#d4edda', borderColor: '#c3e6cb' }}>
              <strong>✓ Success:</strong> {successMessage}
              <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
            </div>
          )}

          {/* TWO COLUMN LAYOUT */}
          <div className="row g-4">
            {/* LEFT PANEL - UPLOAD & CONTROLS */}
            <div className="col-lg-4">
              {/* UPLOAD CARD */}
              <div className="card border-0 mb-4" style={{ borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-4" style={{ color: '#1a202c' }}>📁 Upload Image</h5>

                  <div
                    className={`p-5 text-center border-2 border-dashed cursor-pointer`}
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                      borderColor: dragOver ? '#5865f2' : '#cbd5e0',
                      borderRadius: '16px',
                      backgroundColor: dragOver ? 'rgba(88, 101, 242, 0.05)' : '#f7f7f9',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
                    <p className="fw-semibold mb-1" style={{ color: '#1a202c', fontSize: '1rem' }}>
                      {selectedImage ? selectedImage.name : 'Drag & drop image here'}
                    </p>
                    <p className="text-muted small mb-0">
                      {selectedImage ? 'or click to change' : 'or click to select'}
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />

                  {selectedImage && (
                    <div className="mt-3 small" style={{ color: '#718096' }}>
                      <div className="d-flex justify-content-between mb-2">
                        <span>File size:</span>
                        <span>{(selectedImage.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Type:</span>
                        <span>{selectedImage.type}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="card border-0 mb-4" style={{ borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
                <div className="card-body p-4">
                  <button
                    className="btn btn-lg w-100 fw-bold text-white mb-3"
                    onClick={handleRemoveBackground}
                    disabled={!selectedImage || loading}
                    style={{
                      background: 'linear-gradient(135deg, #5865f2 0%, #a78bfa 100%)',
                      borderRadius: '50px',
                      border: 'none',
                      padding: '0.9rem',
                      fontSize: '1rem'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      '✨ Remove Background'
                    )}
                  </button>

                  <button
                    className="btn btn-lg w-100 fw-bold text-white mb-3"
                    onClick={handleDownload}
                    disabled={!resultImage}
                    style={{
                      backgroundColor: resultImage ? '#10b981' : '#cbd5e0',
                      borderRadius: '50px',
                      border: 'none',
                      padding: '0.9rem',
                      cursor: resultImage ? 'pointer' : 'not-allowed'
                    }}
                  >
                    ⬇️ Download Result
                  </button>

                  <button
                    className="btn btn-lg w-100 fw-bold"
                    onClick={handleReset}
                    style={{
                      backgroundColor: '#f3f4f8',
                      color: '#4a5568',
                      borderRadius: '50px',
                      border: 'none',
                      padding: '0.9rem'
                    }}
                  >
                    🔄 Start New
                  </button>
                </div>
              </div>

              {/* PRO TIPS */}
              <div style={{
                backgroundColor: 'rgba(88, 101, 242, 0.1)',
                borderLeft: '4px solid #5865f2',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <h6 className="fw-bold mb-3" style={{ color: '#1a202c' }}>💡 Pro Tips</h6>
                <ul className="mb-0" style={{ paddingLeft: '1.25rem' }}>
                  <li style={{ color: '#4a5568', marginBottom: '0.5rem' }}>Use high-quality images (JPG, PNG)</li>
                  <li style={{ color: '#4a5568', marginBottom: '0.5rem' }}>Maximum file size: 10MB</li>
                  <li style={{ color: '#4a5568', marginBottom: '0.5rem' }}>Works best on clear backgrounds</li>
                  <li style={{ color: '#4a5568' }}>Try different lighting</li>
                </ul>
              </div>

              {/* UPGRADE */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <h6 className="fw-bold" style={{ color: '#10b981' }}>🚀 Upgrade to Pro</h6>
                <p style={{ color: '#4a5568', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  Unlimited processing & batch operations
                </p>
                <button className="btn btn-sm fw-bold text-white w-100" style={{
                  backgroundColor: '#10b981',
                  borderRadius: '50px',
                  border: 'none'
                }}>
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* RIGHT PANEL - PREVIEW */}
            <div className="col-lg-8">
              {/* IMAGE PREVIEW CARD */}
              {(previewImage || resultImage) ? (
                <div className="card border-0" style={{ borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
                  <div className="card-header border-0 px-4 py-3" style={{ backgroundColor: '#ffffff', borderRadius: '20px 20px 0 0' }}>
                    <h5 className="mb-0 fw-bold" style={{ color: '#1a202c' }}>
                      {resultImage ? '🔄 Before & After' : '👀 Image Preview'}
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3">
                      {/* ORIGINAL */}
                      <div className="col-md-6">
                        <div style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          backgroundColor: '#f3f4f8',
                          aspectRatio: '1',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                          <img
                            src={previewImage}
                            alt="Original"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              animation: 'fadeIn 0.5s ease'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '12px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}>
                            Original
                          </div>
                        </div>
                      </div>

                      {/* PROCESSED */}
                      <div className="col-md-6">
                        <div style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          backgroundColor: '#f3f4f8',
                          aspectRatio: '1',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
                          backgroundSize: '20px 20px',
                          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {resultImage ? (
                            <>
                              <img
                                src={resultImage}
                                alt="Processed"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  animation: 'fadeIn 0.5s ease'
                                }}
                              />
                              <div style={{
                                position: 'absolute',
                                bottom: '12px',
                                left: '12px',
                                background: 'linear-gradient(135deg, #5865f2, #a78bfa)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                              }}>
                                ✓ Processed
                              </div>
                            </>
                          ) : (
                            <div style={{ textAlign: 'center', color: '#718096' }}>
                              {loading ? (
                                <>
                                  <div style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '4px solid #cbd5e0',
                                    borderTop: '4px solid #5865f2',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto 1rem'
                                  }}></div>
                                  <p>Processing...</p>
                                </>
                              ) : (
                                <>
                                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👉</div>
                                  <p>Click "Remove Background"<br />to see result</p>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STATS */}
                  {(previewImage || resultImage) && (
                    <div style={{ borderTop: '1px solid #e2e8f0', padding: '1.5rem' }}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div style={{
                            backgroundColor: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '1rem',
                            textAlign: 'center'
                          }}>
                            <small style={{ color: '#718096', display: 'block', marginBottom: '0.5rem' }}>⚡ Speed</small>
                            <h6 className="fw-bold" style={{ color: '#5865f2' }}>&lt; 2 seconds</h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div style={{
                            backgroundColor: '#f7f7f9',
                            borderRadius: '12px',
                            padding: '1rem',
                            textAlign: 'center'
                          }}>
                            <small style={{ color: '#718096', display: 'block', marginBottom: '0.5rem' }}>🎯 Quality</small>
                            <h6 className="fw-bold" style={{ color: '#10b981' }}>Excellent</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card border-0" style={{ borderRadius: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
                  <div className="card-body text-center py-5 px-4">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨</div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1a202c' }}>No Image Yet</h4>
                    <p style={{ color: '#4a5568', marginBottom: 0 }}>
                      Upload an image on the left to get started.<br />
                      Our AI will remove the background instantly!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        marginTop: '3rem',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="container-lg">
          <div className="row mb-4">
            <div className="col-md-4 mb-4 mb-md-0">
              <h6 className="fw-bold" style={{ color: '#1a202c' }}>About Remover.AI</h6>
              <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>
                Professional AI-powered background remover for creators, marketers, and businesses.
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h6 className="fw-bold" style={{ color: '#1a202c' }}>Product</h6>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#" style={{ color: '#4a5568', textDecoration: 'none' }} className="hover-link">Features</a></li>
                <li><a href="#" style={{ color: '#4a5568', textDecoration: 'none' }} className="hover-link">Pricing</a></li>
                <li><a href="#" style={{ color: '#4a5568', textDecoration: 'none' }} className="hover-link">API Docs</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold" style={{ color: '#1a202c' }}>Legal</h6>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#" style={{ color: '#4a5568', textDecoration: 'none' }} className="hover-link">Privacy</a></li>
                <li><a href="#" style={{ color: '#4a5568', textDecoration: 'none' }} className="hover-link">Terms</a></li>
                <li><a href="#" style={{ color: '#4a5568', textDecoration: 'none' }} className="hover-link">Contact</a></li>
              </ul>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #e2e8f0',
            marginTop: '2rem',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#718096',
            fontSize: '0.9rem'
          }}>
            © 2024 Remover.AI. All rights reserved. | Made with ❤️ for creators
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover-link:hover {
          color: #5865f2 !important;
        }
      `}</style>
    </div>
  );
};

export default BackgroundRemoverUI;
