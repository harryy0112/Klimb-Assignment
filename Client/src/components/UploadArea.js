import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import handleUpload from "../api";
import Button from "../components/Button";

export default function UploadArea() {
  const [fileToUpload, setFileToUpload] = useState(null);
  const [message, setMessage] = useState("Click Here to Add xlsx File");

  const handleChange = (event) => {
    const fileName = event.target.files.item(0).name;
    const fileType = event.target.files.item(0).type;
    const fileSize = event.target.files.item(0).size;

    if (fileSize > 26214400) {
      setMessage("File size greater than 25 MB!");
      setFileToUpload(null);
    } else if (
      fileType !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setMessage("Invalid file type!");
      setFileToUpload(null);
    } else {
      setMessage(fileName);
      setFileToUpload(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload(fileToUpload).then((data) => {
      if (data.success) {
        setMessage(data.message);
        setFileToUpload(null);
      }
    });
  };

  return (
    <div>
      <form
        className="absolute w-full h-80 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="h-full w-full opacity-0 cursor-pointer"
          type="file"
          name="xlsx"
          onChange={handleChange}
        />
        {fileToUpload && (
          <Button warning className="mb-3" type="submit">
            Submit
          </Button>
        )}
      </form>
      <div className="my-10 h-80 md:container bg-slate-200 rounded shadow-md flex flex-col justify-center">
        <FiUpload className="text-4xl mx-auto" />
        <h2 className="text-2xl mx-auto">{message}</h2>
      </div>
    </div>
  );
}
