import FileUpload, { type UploadedFile } from "@/components/common/FileUpload";
import React from "react";

export default function Reports() {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);

  return (
    <div>
      Reports
      <FileUpload value={files} onChange={setFiles} multiple />
    </div>
  );
}
