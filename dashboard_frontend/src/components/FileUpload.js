import React, { useCallback, useMemo, useRef, useState } from "react";
import { FiFileText, FiImage, FiUploadCloud, FiX } from "react-icons/fi";
import { Button } from "./Button";

function iconForFile(file) {
  if (!file) return <FiFileText />;
  if (file.type?.startsWith("image/")) return <FiImage />;
  return <FiFileText />;
}

function isAllowed(file) {
  // images, pdf, docs
  const okTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return file.type?.startsWith("image/") || okTypes.includes(file.type);
}

// PUBLIC_INTERFACE
export function FileUpload({ value, onChange }) {
  /** Drag-and-drop file upload component storing file in-memory. */
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const fileMeta = useMemo(() => value || null, [value]);

  const pick = useCallback(() => inputRef.current?.click(), []);
  const clear = useCallback(() => onChange?.(null), [onChange]);

  const accept = "image/*,.pdf,.doc,.docx";

  const setFile = useCallback(
    (file) => {
      if (!file) return;
      if (!isAllowed(file)) {
        onChange?.({ error: "Unsupported file type. Please upload an image, PDF, or DOC/DOCX." });
        return;
      }
      const url = URL.createObjectURL(file);
      onChange?.({
        name: file.name,
        type: file.type,
        size: file.size,
        url,
        __file: file, // retained in memory for future upload mock
      });
    },
    [onChange]
  );

  const onInputChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      setFile(file);
      e.target.value = "";
    },
    [setFile]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      setFile(file);
    },
    [setFile]
  );

  return (
    <div className="file-upload">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onInputChange}
        style={{ display: "none" }}
      />

      <div
        className={`file-dropzone ${dragOver ? "is-dragover" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        aria-label="Upload a file"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") pick();
        }}
        onClick={pick}
      >
        <div className="file-dropzone-icon" aria-hidden="true">
          <FiUploadCloud />
        </div>
        <div className="file-dropzone-text">
          <div className="file-dropzone-title">Drag & drop a file</div>
          <div className="file-dropzone-subtitle">or click to browse (images, PDF, DOC)</div>
        </div>
      </div>

      {fileMeta?.error ? (
        <div className="form-error" role="alert">
          {fileMeta.error}
        </div>
      ) : null}

      {fileMeta && !fileMeta.error ? (
        <div className="file-preview">
          <div className="file-preview-icon" aria-hidden="true">
            {iconForFile(fileMeta)}
          </div>
          <div className="file-preview-meta">
            <div className="file-preview-name">{fileMeta.name}</div>
            <div className="file-preview-sub">
              {(fileMeta.size / 1024).toFixed(1)} KB
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clear} aria-label="Remove uploaded file">
            <FiX />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
