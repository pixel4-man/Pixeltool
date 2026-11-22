import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BgRemoverWorkspace } from './BgRemoverWorkspace';

interface ImageToolsComponentProps {
  toolId: string;
}

export const ImageToolsComponent: React.FC<ImageToolsComponentProps> = ({ toolId }) => {
  if (toolId === 'bg-remover') {
    return <BgRemoverWorkspace />;
  }

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [sliderVal, setSliderVal] = useState(50);
  const [formatChoice, setFormatChoice] = useState('image/png');
  const [colorInfo, setColorInfo] = useState<{ hex: string; rgb: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    setErrorMsg('');
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setProcessedSrc(null);
      setSuccessMsg('Image loaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imageSrc) {
      setErrorMsg('Please upload an image first.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    setTimeout(() => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setLoading(false);
          setErrorMsg('Canvas rendering context unavailable.');
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (toolId === 'image-enhancer') {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const factor = (sliderVal + 50) / 100;
          for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = Math.min(255, imgData.data[i] * factor);
            imgData.data[i + 1] = Math.min(255, imgData.data[i + 1] * factor);
            imgData.data[i + 2] = Math.min(255, imgData.data[i + 2] * factor);
          }
          ctx.putImageData(imgData, 0, 0);
          setProcessedSrc(canvas.toDataURL('image/jpeg', 0.9));
        } else if (toolId === 'image-compressor') {
          const quality = Math.max(0.1, sliderVal / 100);
          setProcessedSrc(canvas.toDataURL('image/jpeg', quality));
        } else if (toolId === 'image-resizer') {
          const scale = sliderVal / 100;
          const newW = Math.round(img.width * scale);
          const newH = Math.round(img.height * scale);
          const resCanvas = document.createElement('canvas');
          resCanvas.width = newW;
          resCanvas.height = newH;
          const resCtx = resCanvas.getContext('2d');
          resCtx?.drawImage(img, 0, 0, newW, newH);
          setProcessedSrc(resCanvas.toDataURL('image/png'));
        } else if (toolId === 'image-format-converter') {
          setProcessedSrc(canvas.toDataURL(formatChoice, 0.95));
        } else if (toolId === 'image-rotator') {
          const rotCanvas = document.createElement('canvas');
          rotCanvas.width = img.height;
          rotCanvas.height = img.width;
          const rotCtx = rotCanvas.getContext('2d');
          rotCtx?.translate(rotCanvas.width / 2, rotCanvas.height / 2);
          rotCtx?.rotate(Math.PI / 2);
          rotCtx?.drawImage(img, -img.width / 2, -img.height / 2);
          setProcessedSrc(rotCanvas.toDataURL('image/png'));
        } else if (toolId === 'image-blur') {
          ctx.filter = `blur(${Math.round(sliderVal / 10)}px)`;
          ctx.drawImage(img, 0, 0);
          setProcessedSrc(canvas.toDataURL('image/png'));
        } else {
          setProcessedSrc(canvas.toDataURL('image/png'));
        }

        setLoading(false);
        setSuccessMsg('Image processed successfully!');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      };
      img.src = imageSrc;
    }, 600);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (toolId !== 'color-picker' || !imageSrc) return;
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / canvas.clientWidth) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / canvas.clientHeight) * canvas.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = '#' + [pixel[0], pixel[1], pixel[2]].map(x => x.toString(16).padStart(2, '0')).join('');
    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    setColorInfo({ hex, rgb });
  };

  return (
    <div className="space-y-8">
      {!imageSrc ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#E5D9CC] hover:border-[#F36B21] rounded-3xl p-12 text-center cursor-pointer bg-white transition-all group shadow-sm"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#222222] font-heading">
            Upload Image to Process
          </h3>
          <p className="text-sm text-[#666666] mt-1">
            Drag and drop your photo here, or click to browse files (PNG, JPG, WebP)
          </p>
          <button className="mt-6 px-6 py-2.5 rounded-xl bg-[#F36B21] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 hover:bg-[#E95516]">
            Browse Files
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-[#E5D9CC] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#222222]">
                Original Image ({fileName})
              </span>
              <button
                onClick={() => { setImageSrc(null); setProcessedSrc(null); }}
                className="text-xs text-red-500 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Change Image
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-[#FFF9F2] flex items-center justify-center h-72 border border-[#E5D9CC]">
              <img 
                src={imageSrc} 
                alt="Original" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E5D9CC] shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#222222]">
                  {processedSrc ? 'Processed Result' : 'Settings & Controls'}
                </span>
                {processedSrc && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Ready
                  </span>
                )}
              </div>

              {processedSrc ? (
                <div className="relative rounded-2xl overflow-hidden bg-[#FFF9F2] flex items-center justify-center h-72 border border-[#E5D9CC]">
                  <img src={processedSrc} alt="Processed" className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <div className="space-y-6 py-4">
                  {(toolId === 'image-enhancer' || toolId === 'image-compressor' || toolId === 'image-resizer' || toolId === 'image-blur') && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-[#666666]">
                        <span>Intensity / Scale / Quality</span>
                        <span className="font-bold text-[#F36B21]">{sliderVal}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={sliderVal} 
                        onChange={(e) => setSliderVal(Number(e.target.value))}
                        className="w-full accent-[#F36B21]"
                      />
                    </div>
                  )}

                  {toolId === 'image-format-converter' && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#666666]">Target Format</label>
                      <select 
                        value={formatChoice}
                        onChange={(e) => setFormatChoice(e.target.value)}
                        className="w-full bg-[#FFF9F2] border border-[#E5D9CC] rounded-xl px-4 py-2.5 text-sm text-[#222222]"
                      >
                        <option value="image/png">PNG (Lossless)</option>
                        <option value="image/jpeg">JPEG (Compressed)</option>
                        <option value="image/webp">WebP (Modern)</option>
                      </select>
                    </div>
                  )}

                  {toolId === 'color-picker' && (
                    <div className="space-y-3">
                      <p className="text-xs text-[#666666]">Click anywhere on the image preview to pick a color.</p>
                      {colorInfo ? (
                        <div className="p-4 bg-[#FFF9F2] rounded-2xl flex items-center gap-4 border border-[#E5D9CC]">
                          <div className="w-10 h-10 rounded-xl border shadow" style={{ backgroundColor: colorInfo.hex }}></div>
                          <div>
                            <p className="text-sm font-bold text-[#222222]">{colorInfo.hex}</p>
                            <p className="text-xs text-[#666666]">{colorInfo.rgb}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 text-center border border-dashed rounded-xl text-[#666666] text-xs">
                          No color selected yet. Click the image.
                        </div>
                      )}
                    </div>
                  )}

                  {toolId !== 'color-picker' && (
                    <button
                      onClick={processImage}
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Process Image Now</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {processedSrc && (
              <div className="flex gap-4 pt-4">
                <a
                  href={processedSrc}
                  download={`pixeltools-${toolId}-${fileName}`}
                  className="flex-1 py-3 bg-[#F36B21] hover:bg-[#E95516] text-white text-center rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Result
                </a>
                <button
                  onClick={() => setProcessedSrc(null)}
                  className="px-6 py-3 bg-[#FFF9F2] hover:bg-[#E5D9CC]/50 border border-[#E5D9CC] rounded-xl font-semibold text-sm text-[#222222]"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && !errorMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
};
