
import { useEffect, useRef } from 'react';
import { EditorView, keymap, highlightActiveLine, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { foldGutter, indentOnInput, indentUnit, bracketMatching } from '@codemirror/language';
import { lintKeymap } from '@codemirror/lint';

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
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      foldGutter(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      highlightSelectionMatches(),
      indentUnit.of('  '),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
        }
      }),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...completionKeymap,
        ...lintKeymap,
      ]),
      getLanguageExtension(),
      EditorView.theme({
        '&': {
          height: height,
          fontSize: '14px',
        },
        '.cm-content': {
          padding: '16px',
          minHeight: height,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          lineHeight: '1.5',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          fontSize: '14px',
        },
        '.cm-scroller': {
          overflow: 'auto',
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
      viewRef.current = null;
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
