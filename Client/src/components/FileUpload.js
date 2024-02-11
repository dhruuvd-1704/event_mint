// import {useState} from "react"

// const FileUpload=()=>{
//     const [file,setFile]=useState(null);
// const handleSubmit=async(event)=>{
//     event.preventDefault();
//     try{
//         if(file){
//             const formData = new FormData();
//             formData.append("file",file);
//             const response = await fetch('http://localhost:5000/Upload',{
//                 method:'POST',
//                 body:formData
//             }).then(response=>response.json())
//             .then(data=>{
//                 console.log(data.cid)
//             })
//             .catch(error=>{
//                 console.error(error);
//             })
//         }
//     }catch(error){
//         alert(error);
//     }
    
// }
//     const retrieveFile=(event)=>{
//     try{
   
//     const data= event.target.files[0]
//     setFile(data);
//     event.preventDefault();

//      }
//      catch(error){
//         alert("Retrieve File did not work !")

//      }}
//     return<>
//     <div className="form" onSubmit={handleSubmit}>
//         <form onSubmit={handleSubmit}>
//         <input type="file" onChange={retrieveFile} className="choose"/>
//         <button classname="btn">NFT Minter</button>
//         </form>

//     </div>
    
//     </>

// }
// export default FileUpload;











// import {useState} from "react";
// const FileUpload=()=>{
// const [file,setFile]=useState(null);
// const [cid,setCid]=useState("");
// const [transaction,setTransaction]=useState("");
//     const handleSubmit =async(event)=>{
//         event.preventDefault();
//          try{
//              if(file){
//                  const formData = new FormData();
//                  formData.append("file",file);
//                  const response = await fetch('http://localhost:5000/Upload',{
//                      method:'POST',
//                      body:formData
//                  }).then(response=>response.json())
//                  .then(data=>{ 
//                     setCid(data.cid);
//                     setTransaction(data.transactionHash)
//                    console.log(data.cid)
//                    console.log(data.transactionHash)
//                  })
//                  .catch(error=>{
//                      console.error(error);
//                  })
//              }
//          }catch(error){
//             alert(error);
//          }
//     }
//     const retreieveFile=(event)=>{
//         try{
//             const data = event.target.files[0];
//             setFile(data);
//             event.preventDefault();
//         }catch(error){
//             alert("Retrieve File did Not Work");
//         }
//     }
// return<>
//  <div className="img-ctr">
//     {cid && <a href={`https://${cid}.ipfs.dweb.link`}><img src={`https://${cid}.ipfs.dweb.link`} height={"250px"} /></a>}
//     </div>
//     <div className="transaction">
//      {transaction && <a href={`https://mumbai.polygonscan.com/tx/${transaction}`}>Transaction Detials</a>}
// </div>
//  <div className="form">
//     <form onSubmit={handleSubmit}>
//     <input type="file" className="choose" onChange={retreieveFile}/>
//     <button className="btn">NFt Minter</button>
//     </form>
//     </div>
// </>
// }
// export default FileUpload;











import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");
    const [transaction, setTransaction] = useState("");

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
        } catch (error) {
            console.error("Error occurred while retrieving file:", error);
            alert("Failed to retrieve file. Please try again.");
        }
    }

    return (
        <>
            <div className="img-ctr">
                {cid && <a href={`https://${cid}.ipfs.dweb.link`}><img src={`https://${cid}.ipfs.dweb.link`} height={"250px"} alt="Uploaded Image" /></a>}
            </div>
            <div className="transaction">
                {transaction && <a href={`https://mumbai.polygonscan.com/tx/${transaction}`}>Transaction Details</a>}
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="file" className="choose" onChange={retrieveFile} />
                    <button type="submit" className="btn">NFT Minter</button>
                </form>
            </div>
        </>
    );
}

export default FileUpload;
