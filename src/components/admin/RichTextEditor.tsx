import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  id: string;
  label?: string;
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ id, label, value, onChange }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'align'
  ];

  return (
    <div className="space-y-2 rich-text-editor">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="border rounded-md">
        <ReactQuill
          ref={quillRef}
          id={id}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="h-64"
        />
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .ql-container {
            min-height: 15rem;
          }
          .ql-editor {
            min-height: 15rem;
          }
          .rich-text-content ul {
            list-style-type: disc;
            padding-left: 1.5rem;
          }
          .rich-text-content ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
          }
        `
      }}/>
    </div>
  );
};

export default RichTextEditor;
