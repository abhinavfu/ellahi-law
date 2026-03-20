import { useState, useRef } from "react";
import { Bold, Italic, Heading2, Heading3, List, Quote, Link, Eye, Edit3 } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

interface ToolbarButton {
  icon: React.ReactNode;
  label: string;
  action: (textarea: HTMLTextAreaElement, value: string, setValue: (v: string) => void) => void;
}

function wrapSelection(
  textarea: HTMLTextAreaElement,
  value: string,
  setValue: (v: string) => void,
  openTag: string,
  closeTag: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = value.substring(start, end);
  const newValue = value.substring(0, start) + openTag + selected + closeTag + value.substring(end);
  setValue(newValue);
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + openTag.length, end + openTag.length);
  }, 0);
}

function insertAtLineStart(
  textarea: HTMLTextAreaElement,
  value: string,
  setValue: (v: string) => void,
  prefix: string
) {
  const start = textarea.selectionStart;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
  setValue(newValue);
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
  }, 0);
}

const TOOLBAR_BUTTONS: ToolbarButton[] = [
  {
    icon: <Bold size={15} />,
    label: "Bold",
    action: (ta, val, setVal) => wrapSelection(ta, val, setVal, "<strong>", "</strong>"),
  },
  {
    icon: <Italic size={15} />,
    label: "Italic",
    action: (ta, val, setVal) => wrapSelection(ta, val, setVal, "<em>", "</em>"),
  },
  {
    icon: <Heading2 size={15} />,
    label: "Heading 2",
    action: (ta, val, setVal) => wrapSelection(ta, val, setVal, "<h2>", "</h2>"),
  },
  {
    icon: <Heading3 size={15} />,
    label: "Heading 3",
    action: (ta, val, setVal) => wrapSelection(ta, val, setVal, "<h3>", "</h3>"),
  },
  {
    icon: <List size={15} />,
    label: "List Item",
    action: (ta, val, setVal) => insertAtLineStart(ta, val, setVal, "<li>"),
  },
  {
    icon: <Quote size={15} />,
    label: "Blockquote",
    action: (ta, val, setVal) => wrapSelection(ta, val, setVal, "<blockquote>", "</blockquote>"),
  },
  {
    icon: <Link size={15} />,
    label: "Link",
    action: (ta, val, setVal) => {
      const url = prompt("Enter URL:");
      if (url) wrapSelection(ta, val, setVal, `<a href="${url}">`, "</a>");
    },
  },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here... Use the toolbar to add formatting.",
  minHeight = "320px",
}: RichTextEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToolbarClick = (btn: ToolbarButton) => {
    if (!textareaRef.current) return;
    btn.action(textareaRef.current, value, onChange);
  };

  const renderPreview = (html: string) => {
    // Wrap bare text lines in <p> tags if not already wrapped
    const lines = html.split("\n");
    const processed = lines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (trimmed.startsWith("<")) return trimmed;
        return `<p>${trimmed}</p>`;
      })
      .join("\n");
    return processed;
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          {TOOLBAR_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              type="button"
              title={btn.label}
              onClick={() => handleToolbarClick(btn)}
              disabled={mode === "preview"}
              className="p-1.5 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {btn.icon}
            </button>
          ))}
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <button
            type="button"
            title="Paragraph"
            disabled={mode === "preview"}
            onClick={() => {
              if (!textareaRef.current) return;
              wrapSelection(textareaRef.current, value, onChange, "<p>", "</p>");
            }}
            className="px-2 py-1 rounded text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ¶
          </button>
        </div>
        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-gray-200 rounded p-0.5">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              mode === "write" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Edit3 size={12} />
            Write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              mode === "preview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Eye size={12} />
            Preview
          </button>
        </div>
      </div>

      {/* Write mode */}
      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-sm text-gray-800 bg-white resize-y outline-none font-mono leading-relaxed"
          style={{ minHeight }}
        />
      ) : (
        <div
          className="p-4 bg-white prose prose-sm max-w-none overflow-auto"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: renderPreview(value) || "<p class='text-gray-400'>Nothing to preview yet.</p>" }}
        />
      )}

      <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
        HTML supported · Use toolbar to insert formatting tags
      </div>
    </div>
  );
}
