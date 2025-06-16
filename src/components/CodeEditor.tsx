
import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from '@codemirror/basic-setup';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: 'javascript' | 'html' | 'css' | 'jsx' | 'tsx';
  theme?: 'light' | 'dark';
  placeholder?: string;
  height?: string;
}

export const CodeEditor = ({ 
  value, 
  onChange, 
  language = 'javascript', 
  theme = 'dark',
  placeholder = 'Enter your code here...',
  height = '300px'
}: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const getLanguageExtension = () => {
    switch (language) {
      case 'html':
      case 'jsx':
      case 'tsx':
        return html();
      case 'css':
        return css();
      case 'javascript':
      default:
        return javascript();
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      basicSetup,
      getLanguageExtension(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': {
          height: height,
        },
        '.cm-content': {
          padding: '16px',
          minHeight: height,
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          fontSize: '14px',
          lineHeight: '1.5',
        },
      }),
    ];

    if (theme === 'dark') {
      extensions.push(oneDark);
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      viewRef.current?.destroy();
    };
  }, [language, theme, height]);

  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-900">
      <div ref={editorRef} className="w-full" />
    </div>
  );
};
