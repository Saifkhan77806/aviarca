"use client";

import { AddStockBtn } from "@/components/add-stock-btn";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    // <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
    //     <img src={url ? url : "https://silver-magic-swallow-546.mypinata.cloud/ipfs/bafybeifsxo2t7xbfrtxuabkozb2osyk3k747c47lev7eokt5qm4dsx6doy"} alt="" />
    //   <input type="file" onChange={handleChange} />
    //   <button type="button" disabled={uploading} onClick={uploadFile} >
    //     {uploading ? "Uploading..." : "Upload"}
    //   </button>
    // </main>
    <div>
        <div className="flex justify-end">
        <AddStockBtn />
        </div>
    </div>
  );
}