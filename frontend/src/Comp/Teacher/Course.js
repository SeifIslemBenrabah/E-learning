import React, { useEffect, useState,useRef } from "react";
import one from "../../assets/one.png";
import { AuthData } from "../../Auth/AuthWrapper";
import axios from "axios";

const Course = () => {
  const { logout, user } = AuthData();
  const [open, setOpen] = useState(false);
  const [dragActive,setDragActive] = useState(false)
  const inputRef = useRef(null)
  const [files,setFiles] = useState([])
  const [listmodules, setlistmodules] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    moduleId: "",
  });

  const [isOpen, setIsOpen] = useState(false); // popup for add/edit
  const [editId, setEditId] = useState(null);

  // Fetch teacher's modules with their courses
  useEffect(() => {
    const fetchModules = async (id) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/modules/teacher/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log(res.data)
        setlistmodules(res.data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    if (user?.id) fetchModules(user.id);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "moduleId" ? Number(value) : value,
    });
  };

  // Add or update course
// inside Course component

// Add or update course
const handleSave = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("Description", formData.Description);
    data.append("moduleId", formData.moduleId);

    files.forEach((file) => {
      data.append("files", file); // must match multer field name
    });

    if (editId) {
      // Update course
      await axios.put(`http://localhost:5000/cours/${editId}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      // Create course with files
      await axios.post("http://localhost:5000/cours", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    // Reset form + 
    
    setIsOpen(false);
    setFormData({ Name: "", Description: "", moduleId: "" });
    setFiles([]);
    setEditId(null);

    // Refresh modules
    const res = await axios.get(
      `http://localhost:5000/modules/teacher/${user.id}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setlistmodules(res.data);
  } catch (err) {
    console.log("Save error:", err);
  }
};


  // Edit course
  const handleEdit = (cour) => {
    setFormData({
      Name: cour.Name,
      Description: cour.Description || "",
      moduleId: cour.moduleId,
    });
    setEditId(cour.id);
    setIsOpen(true);
  };

  // Delete course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cours/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // refresh modules
      const res = await axios.get(
        `http://localhost:5000/modules/teacher/${user.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setlistmodules(res.data);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  function handleChangee(e) {  
    e.preventDefault();  
    console.log("File has been added");  
    if (e.target.files && e.target.files[0]) {  
      for (let i = 0; i < e.target.files["length"]; i++) {  
        setFiles((prevState) => [...prevState, e.target.files[i]]);  
      }  
    }  
  }  
  
  function handleSubmitFile(e) {  
    if (files.length === 0) {  
      // no file has been submitted  
    } else {  
      // write submit logic here  
    }  
  }  
  
  function handleDrop(e) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(false);  
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {  
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {  
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);  
      }  
    }  
  }  
  
  function handleDragLeave(e) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(false);  
  }  
  
  function handleDragOver(e) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(true);  
  }  
  
  function handleDragEnter(e) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(true);  
  }  
  
  function removeFile(fileName, idx) {  
    const newArr = [...files];  
    newArr.splice(idx, 1);  
    setFiles([]);  
    setFiles(newArr);  
  }  
  
  function openFileExplorer() {  
    inputRef.current.value = "";  
    inputRef.current.click();  
  }  
  // utils/pdfHandler.js (or inside your component)

  const handlePdfClick = async (fileId) => {
    try {
      const response = await axios.get(`http://localhost:5000/files/${fileId}`, {
        responseType: "blob",
      });
  
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); // backend can send file name too
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download error:", err);
    }
  };
  
  
  
  
  

  return (
    <div className="w-full flex flex-col bg-bluebg ">
      {/* Navbar */}
      <div className=" fixed w-10/12 h-12 bg-white flex flex-row items-center justify-between px-6">
        <p className="font-semibold text-gray">
          Welcome Back, Mr {user?.lastName || "User"} !
        </p>
        <div className="flex flex-row gap-1 items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img src={one} alt="profile" />
          </div>
          <div className="text-[10px]">
            <p className="font-bold">
              {user?.firstName + " " + user?.lastName || "User"}
            </p>
            <p>{user?.role || "Role"}</p>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="border-[0.2px] border-blue rounded-full flex ml-2 p-[2px] pt-[2.5px] items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-2"> <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /> </svg>
          </button>
          {open && (
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-md w-28 py-2 text-sm z-50">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editId ? "Edit Course" : "Add Course"}
            </h2>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <input
                type="text"
                name="Name"
                placeholder="Course Name"
                value={formData.Name}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              <form  
        className={`${  
          dragActive ? "bg-blue-400" : "bg-blue-100"  
        }  p-4 w-1/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}  
        onDragEnter={handleDragEnter}  
        onSubmit={(e) => e.preventDefault()}  
        onDrop={handleDrop}  
        onDragLeave={handleDragLeave}  
        onDragOver={handleDragOver}  
      >  
       <input  
          placeholder="fileInput"  
          className="hidden"  
          ref={inputRef}  
          type="file"  
          multiple={true}  
          onChange={handleChangee}  
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"  
        />  
  
        <p>  
          Drag & Drop files or{" "}  
          <span  
            className="font-bold text-blue-600 cursor-pointer"  
            onClick={openFileExplorer}  
          >  
            <u>Select files</u>  
          </span>{" "}  
          to upload  
        </p> 
        <div className="flex flex-col items-center p-3">  
          {files.map((file, idx) => (  
            <div key={idx} className="flex flex-row space-x-5">  
              <span>{file.name}</span>  
              <span  
                className="text-red-500 cursor-pointer"  
                onClick={() => removeFile(file.name, idx)}  
              >  
                remove  
              </span>  
            </div>  
          ))}  
        </div>   
      </form>  
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modules & Courses */}
      <div className="flex flex-col my-14 px-7">
        {listmodules.map((m) => (
          <div key={m.id}>
            <div className="w-full flex flex-row items-center justify-between">
              <h1 className="text-xl font-medium text-blue mt-4">{m.Name}</h1>
            </div>

            <div className="grid grid-cols-3 ml-4 gap-3 mt-1">
              {m.Cours?.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col items-start px-8 bg-white shadow-md rounded-md py-4 gap-2"
                >
                  <p className="font-semibold">{c.Name}</p>
                  <p className="text-gray-600 text-sm">{c.Description}</p>
                  {c.Files?.map((f)=>(
                    <button  onClick={() => handlePdfClick(f.id)}
                     className="text-cyan-400 text-sm"> - {f.name}</button>
                  ))}
                  <div className="flex flex-row justify-between w-full items-center mt-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Add new course button */}
              <div className="flex flex-col items-center justify-center px-8 bg-white shadow-md rounded-md py-4 gap-2">
                <p>Add New Course</p>
                <div className="flex-grow flex items-center justify-center pb-4">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setEditId(null);
                      setFormData({
                        Name: "",
                        Description: "",
                        moduleId: m.id,
                      });
                    }}
                    className="flex  items-center justify-center p-4 bg-gray/40 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
