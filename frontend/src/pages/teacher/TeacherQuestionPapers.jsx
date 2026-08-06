import React, { useState } from 'react';
import { Sparkles, FileQuestion, Download } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const TeacherQuestionPapers = () => {
  const [generating, setGenerating] = useState(false);
  const [paper, setPaper] = useState(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setPaper({ subject: 'Physics', topic: 'Newtonian Mechanics', questions: 20, difficulty: 'Medium' });
      setGenerating(false);
    }, 1600);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="AI Question Paper Generator" description="Generate exam-ready question papers in seconds." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><FileQuestion size={18} className="text-[#284A50]" /> Paper Configuration</h3>
          <div className="space-y-3">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50">
              <option>Physics</option><option>Mathematics</option><option>Chemistry</option>
            </select>
            <input placeholder="Topic (e.g. Newtonian Mechanics)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Number of Questions" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50" />
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#284A50]/50">
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={generating}>
              <Sparkles size={18} /> {generating ? 'Generating...' : 'Generate Paper'}
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center">
          {generating ? (
            <div className="text-slate-400">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-[#284A50] rounded-full animate-spin mb-4 mx-auto" />
              Compiling questions...
            </div>
          ) : paper ? (
            <div className="w-full text-left">
              <h4 className="font-bold text-lg text-slate-900 mb-4">{paper.subject}: {paper.topic}</h4>
              <p className="text-sm font-semibold text-slate-500 mb-1">{paper.questions} Questions • {paper.difficulty} Difficulty</p>
              <Button variant="outline" className="mt-6 w-full"><Download size={16} /> Download PDF</Button>
            </div>
          ) : (
            <div className="text-slate-400">
              <FileQuestion size={48} className="mx-auto mb-4 opacity-20" />
              Configure and generate a paper to preview it here.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TeacherQuestionPapers;
