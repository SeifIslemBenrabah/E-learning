import React, { useEffect, useState } from "react";
import one from "../../assets/one.png";
import { AuthData } from "../../Auth/AuthWrapper";
import axios from "axios";
const Resources = () => {
  const { logout, user } = AuthData();
  const [open, setOpen] = useState(false);
  const [listmodules, setlistmodules] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Link: "",
    Type:"",
    moduleId: "",
  });
  const [isOpen, setIsOpen] = useState(false); // popup for add/edit
  const [editId, setEditId] = useState(null);

  // Fetch teacher's modules with their Resources
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

  // Add or update Resource
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update
        await axios.put(
          `http://localhost:5000/resources/${editId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      } else {
        // Add
        await axios.post(`http://localhost:5000/resources`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }

      setIsOpen(false);
      setFormData({ Name: "",
        Link: "",
        Type:"",
         moduleId: "" });
      setEditId(null);

      // refresh modules
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

  // Edit Resource
  const handleEdit = (Resource) => {
    setFormData({
      Name: Resource.Name,
    Link: Resource.Link,
    Type:Resource.Type,
      moduleId: Resource.moduleId,
    });
    setEditId(Resource.id);
    setIsOpen(true);
  };

  // Delete Resource
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/resources/${id}`, {
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
  return (
    <div className='w-full flex flex-col bg-bluebg '>
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
                 <select
                name="Type"
                value={formData.Type}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">-- Select Type --</option>
                <option value="Website">Website</option>
                <option value="Playlist">Playlist</option>
                <option value="Book">Book</option>
                <option value="Youtube">Youtube</option>
              </select>
              <input
                type="text"
                name="Link"
                placeholder="Link"
                value={formData.Link}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />

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

    <div className='flex flex-col my-14 px-7'>
      {listmodules.map((m)=>(
      <div key={m.id}>
        <div className='w-full flex flex-row items-center justify-between mt-3'>
      <h1 className='text-xl font-medium text-blue mt-4'>{m.Name}</h1>
        </div>
      <div className='grid grid-cols-3 ml-4 gap-4 mt-5'>
        {m.Resources?.map((r)=>(
      <div key={r.id}
      className='relative flex flex-col items-center bg-white shadow-md rounded-lg gap-2'>
            <div className='absolute -top-5 -right-1 shadow-md flex bg-blue p-2.5 rounded-full items-center justify-center text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            </div>
            <div className='w-full bg-primary pl-6 font-light pr-8 py-5 text-white rounded-t-md'>
              <p>
                {r.Link}
                {/* https://www.youtube.com/watch?v=OKXlgAPVJ8Y */}
              </p>
            </div>
            <p className='px-8 text-sm'>
              {r.Name}
              {/* 01 - CCNA 01 - Introduction - Certifications CISCO */}
              </p>
        <div className='flex flex-row justify-between w-full items-center px-8 my-3'>
          <button onClick={() => window.open(r.Link, "_blank")} className='bg-primary border-[1px] border-primary text-white font-light text-xs px-2 py-1 rounded-sm'>View</button>
          <button  onClick={() => handleDelete(r.id)}className='border-[1px] border-red-600 text-red-600 font-light text-xs px-1.5 py-1 rounded-sm'>Delete</button>
        </div>
        </div> 
        ))}
        <div className='flex flex-col items-center justify-center px-8 bg-white shadow-md rounded-md py-4 gap-2'>
        <p>Add New Resource</p>
        <div className='flex-grow flex items-center justify-center pb-4'>
        <button  onClick={() => {
                      setIsOpen(true);
                      setEditId(null);
                      setFormData({
                        Name: "",
                        Link: "",
                        Type:"",
                        moduleId: m.id,
                      });
                    }} className='flex  items-center justify-center p-4 bg-gray/40 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </button>
        </div>
        </div>
      </div>
      </div>
      ))}
    </div>
    </div>
  )
}

export default Resources
