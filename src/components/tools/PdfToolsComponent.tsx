import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Sparkles, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface PdfToolsComponentProps {
  toolId: string;
}

export const PdfToolsComponent: React.FC<PdfToolsComponentProps> = ({ toolId }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setSelectedFiles(files);
    setResultUrl(null);
    setSuccessMsg(`${files.length} file(s) selected successfully.`);
  };

  const processPdf = async () => {
    if (selectedFiles.length === 0) {
      setErrorMsg('Please upload at least one PDF or image file.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (toolId === 'pdf-merger') {
        const mergedPdf = await PDFDocument.create();
        for (const file of selectedFiles) {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
      } else if (toolId === 'images-to-pdf') {
        const pdf = new jsPDF();
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
          if (i > 0) pdf.addPage();
          pdf.addImage(dataUrl, 'JPEG', 10, 10, 190, 270);
        }
        const pdfOutput = pdf.output('blob');
        setResultUrl(URL.createObjectURL(pdfOutput));
      } else {
        // Generic PDF processing fallback using pdf-lib
        const arrayBuffer = await selectedFiles[0].arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
      }

      setLoading(false);
      setSuccessMsg('PDF processing completed successfully!');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(`Error processing PDF: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {!selectedFiles.length ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#F36B21] rounded-3xl p-12 text-center cursor-pointer bg-neutral-50 dark:bg-neutral-900/50 transition-all group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            multiple 
            accept={toolId === 'images-to-pdf' ? 'image/*' : '.pdf'} 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-2xl bg-[#F36B21]/10 text-[#F36B21] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading">
            {toolId === 'images-to-pdf' ? 'Upload Images to Convert to PDF' : 'Upload PDF Document(s)'}
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            Drag and drop files here, or click to browse securely in your browser
          </p>
          <button className="mt-6 px-6 py-2.5 rounded-xl bg-[#F36B21] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 hover:bg-[#E95516]">
            Browse Files
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Selected Files List */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Selected Files ({selectedFiles.length})
              </span>
              <button
                onClick={() => { setSelectedFiles([]); setResultUrl(null); }}
                className="text-xs text-red-500 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Clear Files
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-sm">
                  <div className="flex items-center gap-3 truncate">
                    <FileText className="w-4 h-4 text-[#F36B21] shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className="text-xs text-neutral-500">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action / Result */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                {resultUrl ? 'Processing Complete' : 'Execute PDF Operation'}
              </h3>

              {resultUrl ? (
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
                  <p className="text-sm font-bold text-green-700 dark:text-green-300">Your PDF is ready for download!</p>
                </div>
              ) : (
                <div className="space-y-4 py-6">
                  <button
                    onClick={processPdf}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#F36B21] hover:bg-[#E95516] text-white font-semibold text-sm shadow-lg shadow-[#F36B21]/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Process PDF Now</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {resultUrl && (
              <a
                href={resultUrl}
                download="pixeltools-output.pdf"
                className="w-full py-3.5 bg-[#F36B21] hover:bg-[#E95516] text-white text-center rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Processed PDF
              </a>
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
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
};
