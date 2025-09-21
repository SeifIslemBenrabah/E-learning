import axios from 'axios'
import React,{useEffect,useState} from 'react'
const Gstudent = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [liststudents, setListStudents] = useState([]);
    const [listpromo, setlistpromo] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        promoId: "",
        password: "",
      });
    const [isOpen, setIsOpen] = useState(false); // add/edit popup
    const [editId, setEditId] = useState(null); // track editing student
  
    // Fetch students
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/student`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log(res.data)
        setListStudents(res.data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    const fatchPromos = async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/promo`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            console.log(res.data)
            setlistpromo(res.data)
        }
        catch(err){
            console.log('err:',err)
        }
    };
    useEffect(() => {
        fatchPromos();
      fetchStudents();
    }, []);
  
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: name === "promoId" ? Number(value) : value, // force promoId as number
        });
      };
      
  
    // Add or update student
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        if (editId) {
          // Update student
          await axios.put(`http://localhost:5000/student/${editId}`, formData, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
        } else {
          // Add student
          console.log(formData)
          await axios.post(`http://localhost:5000/student`, formData, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
        }
  
        setIsOpen(false);
        setFormData({ firstName: "",
            lastName: "",
            email: "",
            studentId: "",
            promoId: "",
            password: ""});
        setEditId(null);
        fetchStudents();
      } catch (err) {
        console.log("Save error:", err);
        console.log(formData)
      }
    };
  
    // Edit student
    const handleEdit = (student) => {
        setFormData({
          firstName: student.user?.firstName || "",
          lastName: student.user?.lastName || "",
          email: student.user?.email || "",
          studentId: student.studentId || "",
          promoId: student.promoId || "",
          password: "",
        });
        setEditId(student.id);
        setIsOpen(true);
      };
  
    // Delete student
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/student/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchStudents();
      } catch (err) {
        console.log("Delete error:", err);
      }
    };
  
  return (
    <div className='w-full h-screen pt-14 bg-bluebg -z-40 absolute'>
        <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-blue my-6 ml-8'>Students Management</h1>
        <div className=' w-full flex flex-row items-center gap-3 justify-center'>
        <button
        onClick={() => {
            setIsOpen(true);
            setEditId(null);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                studentId: "",
                promoId: "",
                password: "",
            });
          }}
         className='bg-primary text-white py-1 px-4 rounded-md text-sm flex flex-row justify-around gap-2 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Student
        </button>
        <button className='border-primary border-[0.5px] text-primary py-1 px-4 rounded-md text-sm flex flex-row justify-around gap-2 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>

Import csv file
        </button>
        </div>
        </div>
              {/* Popup Add/Edit */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editId ? "Edit Student" : "Add Student"}
            </h2>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
            <input
  type="text"
  name="firstName"
  placeholder="First Name"
  value={formData.firstName}
  onChange={handleChange}
  className="border p-2 rounded-md"
  required
/>
<input
  type="text"
  name="lastName"
  placeholder="Last Name"
  value={formData.lastName}
  onChange={handleChange}
  className="border p-2 rounded-md"
  required
/>
<input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  className="border p-2 rounded-md"
  required
/>
<input
  type="text"
  name="studentId"
  placeholder="Student ID"
  value={formData.studentId}
  onChange={handleChange}
  className="border p-2 rounded-md"
/>
<select
  name="promoId"
  value={formData.promoId}
  onChange={handleChange}
  className="border p-2 rounded-md"
>
<option value="">Select Promo</option>
{listpromo.map((promo) => (
  <option key={promo.id} value={promo.id}>
    {promo.Grade.name} {promo.Grade.specialty ? ` - ${promo.Grade.specialty}` : ""}
  </option>
))}
</select>
{!editId && (
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="border p-2 rounded-md"
    required
  />
)}


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
        <div className='flex flex-col items-center justify-center mt-16 gap-3'>
            <div className='flex flex-row w-11/12'>
                <div className='flex flex-row bg-slate-50 p-2 shadow-sm rounded-lg overflow-hidden'>
                <button className='border-r-[0.5px] border-gray pr-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>
                </button>
                <button className='px-5 text-sm border-r-[0.5px] border-gray'>
                Filter By
                </button>
                <button className='px-5 flex flex-row items-center justify-center gap-6 text-sm border-r-[0.5px] border-gray'>
                Student ID
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pt-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
                </button>
                <button className='px-5 flex flex-row items-center justify-center gap-6 text-sm border-r-[0.5px] border-gray'>
                Cohort
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pt-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                </button>
                <button className='px-5 flex flex-row items-center justify-center gap-6 text-sm border-r-[0.5px] border-gray'>
                Group
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pt-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                </button>
                <button className='text-red-600 px-5 flex flex-row items-center justify-center gap-4 text-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                </svg>
                Reset Filter
                </button>
                </div>
                <div className='flex-grow ml-10 bg-slate-50 p-2 shadow-sm rounded-lg flex items-center gap-2 text-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
  </svg>
  <input
    type="text"
    placeholder="Search..."
    className="outline-none w-full text-sm placeholder:text-gray-400"
  />
                </div>
            </div>
        <div className='w-11/12'>
            <table className='w-full bg-white rounded-md text-sm text-left'>
                <tr >
                    <th className='font-normal pl-5'>Student ID</th>
                    <th className='font-normal pl-5'>Student Name</th>
                    <th className='font-normal pl-5'>Email</th>
                    <th className='font-normal pl-5'>Cohort</th>
                    <th className='font-normal pl-5'>Actions</th>
                </tr>
                {liststudents.length > 0 ? (
                    liststudents.map((student) => (
                        <tr key={student.id}>
                                <td className='font-normal pl-5 py-2'>{student.studentId}</td>
                                <td className='font-normal pl-5'>{student.User.lastName+" "+student.User.firstName}</td>
                                <td className='font-normal pl-5'>{student.User.email}</td>
                                <td className='font-normal pl-5'>{student.Promo.Grade.name+"-"+student.Promo.Grade.specialty}</td>
                                <td className='flex flex-row pl-5 py-2 items-center gap-x-2'>
                                <button onClick={() => handleEdit(student)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(student.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                </td>
                        </tr>
                    ))
                ) : (
                <tr>
                    <td colSpan={5} className='p-20'>
                        <p className='flex justify-center items-center text-xl font-bold'>No Student available</p>
                    </td>
                </tr>
                )}
            </table>
        </div>
        </div>
    </div>
  )
}

export default Gstudent
