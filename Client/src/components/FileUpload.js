


import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");
    const [transaction, setTransaction] = useState("");
    const [preview, setPreview] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch('http://localhost:5000/Upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    setCid(data.cid);
                    setTransaction(data.transactionHash);
                    console.log(data.cid);
                    console.log(data.transactionHash);
                } else {
                    console.error("Error response from server:", response.statusText);
                }
            }
        } catch (error) {
            console.error("Error occurred during file upload:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    const retrieveFile = (event) => {
        try {
            const data = event.target.files[0];
            setFile(data);

            // Read the file and set preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(data);
        } catch (error) {
            console.error("Error occurred while retrieving file:", error);
            alert("Failed to retrieve file. Please try again.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-8">
                {preview && (
                    <img src={preview} className="max-w-xs md:max-w-lg" alt="Uploaded Image Preview" />
                )}
            </div>
            <div className="mb-8">
                {cid && (
                    <a href={`https://${cid}.ipfs.dweb.link`}>
                        <img src={`https://${cid}.ipfs.dweb.link`} className="max-w-xs md:max-w-lg" alt="Uploaded Image" />
                    </a>
                )}
            </div>
            <div className="mb-8">
                {transaction && (
                    <a href={`https://mumbai.polygonscan.com/tx/${transaction}`}>Transaction Details</a>
                )}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="file" className="mb-4" onChange={retrieveFile} />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">NFT Minter</button>
                </form>
            </div>
        </div>
    );
}

export default FileUpload;

