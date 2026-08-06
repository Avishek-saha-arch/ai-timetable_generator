import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const initialFiles = [
  { name: 'Chapter 4 - Integrals.pdf', class: 'Advanced Mathematics' },
  { name: 'Lab Safety Guidelines.pdf', class: 'Chemistry Lab' },
];

const TeacherMaterials = () => {
  const [files, setFiles] = useState(initialFiles);

  const onDrop = useCallback((accepted) => {
    setFiles((prev) => [...accepted.map((f) => ({ name: f.name, class: 'Unassigned' })), ...prev]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-6">
      <PageHeader title="Course Materials" description="Upload and organize resources for your students." />
      <Card {...getRootProps()} className={`border-2 border-dashed ${isDragActive ? 'border-[#284A50] bg-[#284A50]/5' : 'border-slate-300'} flex flex-col items-center justify-center py-16 cursor-pointer shadow-none`}>
        <input {...getInputProps()} />
        <UploadCloud size={40} className="text-[#284A50] mb-4" />
        <p className="font-bold text-slate-800">Drag files here or click to browse</p>
        <p className="text-sm text-slate-500 font-medium mt-1">PDF, DOCX, PPTX up to 25MB</p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {files.map((f, i) => (
          <Card key={i} hover className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-500"><FileText size={18} /></div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-slate-800 truncate">{f.name}</p>
              <Badge className="mt-1">{f.class}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherMaterials;
