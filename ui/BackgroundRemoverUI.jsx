import React, { useState, useRef } from 'react';

const BackgroundRemoverUI = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState('editor');
  const fileInputRef = useRef(null);

  const API_URL = 'http://127.0.0.1:8000/docs';
  const API_KEY = 'mysecretkey123';

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setSelectedImage(file);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary', 'bg-primary/10');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const removeBackground = async () => {
    if (!previewImage) return;

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ image: previewImage }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);
      setResultImage(resultUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('Error removing background: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `removed-bg-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetUI = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setResultImage(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="relative mx-auto flex h-screen max-w-md flex-col overflow-hidden bg-white shadow-2xl">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined">auto_fix_high</span>
          </div>
          <h1 className="text-lg font-extrabold tracking-tight text-[#0d121b]">Remover.AI</h1>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background-light text-primary hover:bg-primary/10">
          <span className="material-symbols-outlined">person</span>
        </button>
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-background-light px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-[#0d121b]">Magic Erase</h2>
          <p className="mt-2 text-sm text-[#4c669a]">AI-powered transparency in seconds.</p>
        </div>

        {/* Main Tool Card */}
        <div className="rounded-xl bg-white p-2 shadow-xl shadow-primary/5">
          {!previewImage ? (
            // Upload Dropzone
            <div
              className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 px-6 py-12 transition-all hover:border-primary/40 hover:bg-primary/[0.08]"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined !text-4xl">cloud_upload</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d121b]">Upload an image</h3>
              <p className="mt-1 text-xs text-[#4c669a]">Drag &amp; drop or tap to browse</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 font-bold text-white shadow-lg shadow-primary/30 active:scale-95"
              >
                <span className="material-symbols-outlined">add_photo_alternate</span>
                Select File
              </button>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-[#4c669a]/60">
                Supports JPG, PNG, WEBP (Max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
            </div>
          ) : (
            // Comparison Preview
            <div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {/* Before */}
                <div className="group relative aspect-square overflow-hidden rounded-lg bg-background-light">
                  <img
                    alt="Original"
                    className="h-full w-full object-cover"
                    src={previewImage}
                  />
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    BEFORE
                  </div>
                </div>

                {/* After */}
                <div className="group relative aspect-square overflow-hidden rounded-lg bg-white" style={{
                  backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}>
                  {resultImage ? (
                    <img
                      alt="Result"
                      className="h-full w-full object-cover"
                      src={resultImage}
                    />
                  ) : (
                    <>
                      {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="absolute bottom-2 left-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    {resultImage ? 'AFTER' : 'PREVIEW'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          {previewImage && (
            <div className="mt-4 flex flex-col gap-2 p-2">
              <button
                onClick={removeBackground}
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-white shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">auto_fix_high</span>
                    Remove Background
                  </>
                )}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={downloadImage}
                  disabled={!resultImage}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-success/10 font-bold text-success hover:bg-success/20 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download
                </button>
                <button
                  onClick={resetUI}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background-light text-[#4c669a] hover:bg-background-light/80"
                >
                  <span className="material-symbols-outlined">refresh</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent History */}
        {!previewImage && (
          <>
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between px-2">
                <h4 className="font-bold text-[#0d121b]">Recent Edits</h4>
                <a className="text-xs font-semibold text-primary" href="#">
                  View All
                </a>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-primary/10 bg-white p-1">
                  <img
                    alt="Headphones"
                    className="h-full w-full rounded-lg object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdKv50QQQdfdWAmzSZbnLcI6YB3ZEe4xywh8xFclZCwSGo9wtf23BgrX0xK7c6XDOk0kld0rdQ8bX9vf-CwqZhYKuDQdQ8Be31167GktEKakod7Ar5LpHLj5nvCwQyZhL1ZyK70s-VYCgXEIr50T2OvvcoAC_wN2-QawdMIHmqYQ8Vjhfdm8jUuxcEZaU0v1FhflpLuNlDdDat3aXdaBaW9L1P8tm6PCjOGiWk01JP-efT3hr_cTHGR4_YYw0zjnmHO5j7n37immlj"
                  />
                </div>
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-primary/10 bg-white p-1">
                  <img
                    alt="Red Sneaker"
                    className="h-full w-full rounded-lg object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOnmFmckgm7EF92vntVp4bFkFD3ypM_dpUwvEiwjlpmvEIOJNpO7jyzI1ecyoEhWUSGU7K4wR55dNjqybuhHRr_7eEphNgIv1oscqRwlQhqiW52cf2_fq3Uh-88lp_HxmzP6-497IERaCRNCzbZgClgkXxDEXJDLxwTtf9dK-L6tY21chh48DjbCaGWcz-9zAwlJbHp9q26K0QuHdC6PD9yEykJGOAc_EX1NT8xy9eTKQ99tP16PhrE_S_fv27SyVrwslWyMFO82Y4"
                  />
                </div>
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-primary/10 bg-white p-1">
                  <img
                    alt="Smart Watch"
                    className="h-full w-full rounded-lg object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhe_5PHqfroygKrLFgNGmhKD6QIG_MDoUdZqf_0UUxasRms-kKf-zYPmbl3LXt_eEZOc7oNnE8xZv8VmiyDQQ1-hLnyYDXip7sRoeY0aBVDJhoFZcYCykTim1v2WdXo6f3wOQXtiFSAH_a27TkYDknfn3tIXxVjK5wKZMkiHoZGYqRst5e_w07Qiso390YmMVYqMpieoovEBSJlCLSu3bTwClAThDEM_nKVD_n2Qg3oYz1FxDLq41dtB3mQsGbecgh2aVwz0O2wi6O"
                  />
                </div>
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-primary/10 bg-white">
                  <span className="material-symbols-outlined text-primary/40">add</span>
                </div>
              </div>
            </div>

            {/* Pro CTA */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary to-[#1d4ed8] p-6 text-white shadow-xl shadow-primary/30">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-lg font-bold">Go Pro for HD</h5>
                  <p className="mt-1 text-sm text-white/80">
                    Unlimited high-resolution downloads and batch processing.
                  </p>
                </div>
                <span className="material-symbols-outlined !text-4xl opacity-40">workspace_premium</span>
              </div>
              <button className="mt-4 w-full rounded-full bg-white py-2.5 text-sm font-extrabold text-primary shadow-lg active:bg-background-light">
                Upgrade Now
              </button>
            </div>
          </>
        )}

        {/* Spacer for Nav */}
        <div className="h-24"></div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 flex h-20 items-center justify-around border-t border-primary/10 bg-white/95 px-6 pb-4 backdrop-blur-xl">
        {[
          { id: 'editor', icon: 'home_app_logo', label: 'Editor' },
          { id: 'history', icon: 'history', label: 'History' },
          { id: 'new', icon: 'add', label: 'New', center: true },
          { id: 'assets', icon: 'star', label: 'Assets' },
          { id: 'config', icon: 'settings', label: 'Config' },
        ].map((item) =>
          item.center ? (
            <div
              key={item.id}
              className="relative -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/40 outline outline-8 outline-white"
            >
              <span className="material-symbols-outlined !text-3xl">{item.icon}</span>
            </div>
          ) : (
            <a
              key={item.id}
              href="#"
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeNav === item.id
                  ? 'text-primary'
                  : 'text-[#4c669a] hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined !text-[28px]">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </a>
          )
        )}
      </nav>
    </div>
  );
};

export default BackgroundRemoverUI;
