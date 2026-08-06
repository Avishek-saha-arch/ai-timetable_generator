import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
import { UploadCloud, File, CheckSquare, Layers, BrainCircuit } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { camelToLabel } from '../../utils/helpers';
import * as documentsService from '../../services/documents.service';

const AIDocReader = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const chosen = acceptedFiles[0];
    if (!chosen) return;
    setFile(chosen);
    setIsProcessing(true);
    setResults(null);
    setSaved(false);
    setProgress(0);

    documentsService
      .extractDocument(chosen, setProgress)
      .then((data) => {
        setResults(data);
      })
      .finally(() => setIsProcessing(false));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'application/pdf': [] },
    maxFiles: 1,
  });

  const handleSave = async () => {
    await documentsService.saveExtractedRecord(results);
    setSaved(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader title="AI Document Reader" description="Instantly extract data from physical forms, IDs, and transcripts with 99% accuracy." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card
          className={`border-2 border-dashed ${isDragActive ? 'border-[#284A50] bg-[#284A50]/5' : 'border-slate-300'} flex flex-col items-center justify-center min-h-[500px] cursor-pointer hover:bg-slate-50 transition-colors shadow-none`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full max-w-xs text-center">
                <div className="relative w-24 h-24 mb-8">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="absolute inset-0 border-4 border-slate-100 border-t-[#284A50] rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BrainCircuit size={28} className="text-[#284A50] animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Extracting Data...</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Running OCR & NLP models</p>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#284A50] rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </motion.div>
            ) : file && !results ? (
              <motion.div key="file" className="flex flex-col items-center">
                <File size={48} className="text-[#284A50] mb-4" />
                <h3 className="font-bold text-lg">{file.name}</h3>
              </motion.div>
            ) : (
              <motion.div key="empty" className="flex flex-col items-center text-center px-6">
                <div className="w-20 h-20 bg-[#284A50]/5 text-[#284A50] rounded-2xl flex items-center justify-center mb-6 border border-[#284A50]/20">
                  <UploadCloud size={36} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Drag & Drop your file here</h3>
                <p className="text-slate-500 text-sm mb-8 max-w-sm font-medium">Support for PDF, JPG, PNG up to 10MB. AI automatically detects form structure.</p>
                <Button variant="outline" className="pointer-events-none">Browse Files</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <Card className="flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
              <CheckSquare className="text-emerald-500" /> Extracted Data
            </h3>
            {results && <Badge variant="success">{results.confidence}% Confidence</Badge>}
          </div>

          {!results ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <Layers size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Upload a document to view AI extractions.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {Object.entries(results).map(([key, value]) => {
                if (key === 'confidence') return null;
                return (
                  <div key={key} className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{camelToLabel(key)}</label>
                    <input
                      type="text"
                      defaultValue={value}
                      onChange={(e) => setResults((r) => ({ ...r, [key]: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#284A50]/50 focus:bg-white focus:border-[#284A50] outline-none transition-all shadow-sm"
                    />
                  </div>
                );
              })}
            </motion.div>
          )}

          {results && (
            <div className="pt-6 mt-6 border-t border-slate-100 flex gap-4">
              <Button className="flex-1" onClick={handleSave} disabled={saved}>
                {saved ? 'Saved ✓' : 'Save to Database'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null);
                  setResults(null);
                  setSaved(false);
                }}
              >
                Clear
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AIDocReader;
