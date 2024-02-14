import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handleUpload, logout } from "../Redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Homepage() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

    const formData = new FormData();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);

        const imagesArray = [];
        for (const file of files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                imagesArray.push(fileReader.result);
                setPreviewImages([...imagesArray])
            }
        }
    };

    const handleSubmit = async () => {
        try {
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }
            console.log("I am form data", formData)

            await dispatch(handleUpload(formData));
            setSelectedFiles(null);
            setPreviewImages([]);
            document.querySelectorAll("#root > div.container.mx-auto.mt-10 > div:nth-child(2) > input")[0].value = "";
        } catch (error) {
            navigate("/login");
        }
    }


    return (
        <div className="container mx-auto mt-10">
            <p className="text-center mb-5">We can upload any no. of Images and we can Increase and decrease the no. of Images as per our requirement.( Currently it is set to 10 as maximum )</p>
            <div className="flex justify-center">
                <input type="file" className="border rounded-lg px-4 py-2 mr-4" onChange={handleFileChange} multiple />
                <button className="bg-amber-600 text-white rounded-lg px-4 py-2" onClick={handleSubmit}>Upload</button>
            </div>
            {selectedFiles && (
                <div>
                    <h2>Selected Images:</h2>
                    <div className="flex flex-wrap">
                        {previewImages.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
                        ))}
                    </div>
                </div>
            )}
            {!isLoggedIn && (<div className="flex justify-center mt-5">
                <Link to="/login" className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-4">Login</Link>
                <Link to="/signup" className="bg-green-500 text-white rounded-lg px-4 py-2">Sign Up</Link>
            </div>)}
            {isLoggedIn && (
                <div className="flex justify-center mt-5">
                    <button onClick={() => { dispatch(logout()) }} className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-4">Logout</button>
                </div>
            )}
        </div>
    );
}


export default Homepage;
