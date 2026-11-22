import React from 'react';
import { Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { TOOLS } from '../data/toolsData';
import { ImageToolsComponent } from '../components/tools/ImageToolsComponent';
import { TextToolsComponent } from '../components/tools/TextToolsComponent';
import { PdfToolsComponent } from '../components/tools/PdfToolsComponent';
import { AiToolsComponent } from '../components/tools/AiToolsComponent';
import { DeveloperToolsComponent } from '../components/tools/DeveloperToolsComponent';
import { ProductivityToolsComponent } from '../components/tools/ProductivityToolsComponent';

interface ToolRunnerProps {
  toolId: string;
  navigate: (route: string, param?: string) => void;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ toolId, navigate }) => {
  const tool = TOOLS.find(t => t.id === toolId) || TOOLS[0];
  const relatedTools = TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 3);

  const renderToolWorkspace = () => {
    switch (tool.categoryId) {
      case 'image':
        return <ImageToolsComponent toolId={tool.id} />;
      case 'text':
        return <TextToolsComponent toolId={tool.id} />;
      case 'pdf':
        return <PdfToolsComponent toolId={tool.id} />;
      case 'ai':
        return <AiToolsComponent toolId={tool.id} />;
      case 'developer':
        return <DeveloperToolsComponent toolId={tool.id} />;
      case 'productivity':
        return <ProductivityToolsComponent toolId={tool.id} />;
      default:
        return <TextToolsComponent toolId={tool.id} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#F4EDE4]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#666666] font-medium">
        <button onClick={() => navigate('home')} className="hover:text-[#F36B21]">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-[#E5D9CC]" />
        <button onClick={() => navigate('category', tool.categoryId)} className="hover:text-[#F36B21]">{tool.categoryName}</button>
        <ChevronRight className="w-3.5 h-3.5 text-[#E5D9CC]" />
        <span className="text-[#222222] font-semibold">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9F2] border border-[#E5D9CC] text-[#F36B21] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{tool.categoryName}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#222222] font-heading">
          {tool.name}
        </h1>
        <p className="text-[#666666] text-base max-w-2xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Main Tool Workspace */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5D9CC] shadow-xl">
        {renderToolWorkspace()}
      </div>

      {/* How to Use Section */}
      <div className="bg-[#FFF9F2] p-8 rounded-3xl border border-[#E5D9CC] space-y-6">
        <h3 className="text-xl font-bold text-[#222222] font-heading flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#F36B21]" /> How to Use {tool.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#666666]">
          <div className="space-y-2">
            <span className="font-bold text-[#F36B21] block">Step 1</span>
            <p>Upload your file or enter your data into the interactive workspace above.</p>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-[#F36B21] block">Step 2</span>
            <p>Configure any preferred settings or parameters if required.</p>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-[#F36B21] block">Step 3</span>
            <p>Click process and instantly download or copy your polished results.</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#222222] font-heading">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-2xl border border-[#E5D9CC] space-y-2 shadow-sm">
            <h4 className="text-sm font-bold text-[#222222]">Is my data secure and private?</h4>
            <p className="text-xs text-[#666666] leading-relaxed">Yes! All file processing and text transformations happen securely in your browser locally. Your files are never stored or shared.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-[#E5D9CC] space-y-2 shadow-sm">
            <h4 className="text-sm font-bold text-[#222222]">Do I need to install any software?</h4>
            <p className="text-xs text-[#666666] leading-relaxed">No installation is required. PixelTools runs entirely online in all modern web browsers.</p>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-xl font-bold text-[#222222] font-heading">Related Tools in {tool.categoryName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map(rt => (
              <div
                key={rt.id}
                onClick={() => navigate('tool', rt.id)}
                className="p-6 bg-white rounded-2xl border border-[#E5D9CC] hover:border-[#F36B21] cursor-pointer group space-y-3 shadow-sm"
              >
                <h4 className="font-bold text-sm text-[#222222] group-hover:text-[#F36B21] transition-colors">{rt.name}</h4>
                <p className="text-xs text-[#666666] line-clamp-2">{rt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
