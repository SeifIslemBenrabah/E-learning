import axios from 'axios'
import React,{useEffect,useState} from 'react'
const Gmodule = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [listmodules, setlistmodules] = useState([]);
    const [listteachers, setlistteachers] = useState([])
    const [listGrades, setlistGrades] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
      Name: "",
      Description: "",
      gradeId: "",
      teacherId: "",
      coTeacherIds: []
    })
    useEffect(()=>{
        const fatchModules = async()=>{
            try{
                const res = await axios.get(`http://localhost:5000/modules`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                setlistmodules(res.data)
            }
            catch(err){
                console.log('err:',err)
            }
        };
        const fetchTeachers = async () => {
            try {
              const res = await axios.get(`http://localhost:5000/teachers`, {
                headers: { Authorization: `Bearer ${user.token}` },
              })
              setlistteachers(res.data)
            } catch (err) {
              console.log('err:', err)
            }
          }
          const fatchGrade = async()=>{
            try{
                const res = await axios.get(`http://localhost:5000/grades`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                setlistGrades(res.data)
            }
            catch(err){
                console.log('err:',err)
            }
        }
        fatchGrade();
          fatchModules();
          fetchTeachers()
        
    },[])

  // 📌 Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 📌 Handle multi-select co-teachers
  const handleCoTeachers = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => parseInt(opt.value))
    setFormData(prev => ({ ...prev, coTeacherIds: selected }))
  }

  // 📌 Submit new module
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:5000/modules`,
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setlistmodules([...listmodules, res.data])
      setShowForm(false)
      setFormData({ Name: "", Description: "", gradeId: "", teacherId: "", coTeacherIds: [] })
    } catch (err) {
      console.error("Error creating module:", err.response?.data || err.message)
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/modules/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      
    } catch (err) {
      console.log("Delete error:", err);
    }
  };
  return (
    <div className='w-full h-screen pt-14 bg-bluebg -z-40 absolute'>
        <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-blue my-6 ml-8'>Modules Management</h1>
        <div className=' w-full flex flex-row items-center gap-3 justify-center'>
        <button  onClick={() => setShowForm(true)} className='bg-primary text-white py-1 px-4 rounded-md text-sm flex flex-row justify-around gap-2 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Module
        </button>
        </div>
        </div>
        {showForm && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-6 shadow-lg rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Create Module</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="Name"
                placeholder="Module Name"
                value={formData.Name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
                className="border p-2 rounded"
              />
             <select
  name="gradeId"
  value={formData.gradeId}
  onChange={handleChange}
  className="border p-2 rounded-md"
>
<option value="">Select Grade</option>
{listGrades.map((grade) => (
  <option key={grade.id} value={grade.id}>
    {grade.name} {grade.specialty ? ` - ${grade.specialty}` : ""}
  </option>
))}
</select>
              <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">-- Select Main Teacher --</option>
                {listteachers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.User?.firstName} {t.User?.lastName}
                  </option>
                ))}
              </select>
              <select
                multiple
                onChange={handleCoTeachers}
                className="border p-2 rounded h-32"
              >
                {listteachers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.User?.firstName} {t.User?.lastName}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
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
                Cohort
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pt-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                </button>
                <button className='px-5 flex flex-row items-center justify-center gap-6 text-sm border-r-[0.5px] border-gray'>
                Teacher Responsable
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
                    <th className='font-normal pl-5'>Module Name</th>
                    <th className='font-normal pl-5'>Class</th>
                    <th className='font-normal pl-5'>Editor</th>
                    <th className='font-normal pl-5'>Teachers</th>
                    <th className='font-normal pl-5'>Actions</th>
                </tr>
                {listmodules.length > 0 ? (
                    listmodules.map((module) => (
                        <tr key={module.id}>
                                <td >{module.Name}</td>
                                <td>{module.Grade.name}</td>
                                <td>{module.mainTeacher?.User
          ? `${module.mainTeacher.User.lastName} ${module.mainTeacher.User.firstName}`
          : "No main teacher"}</td>
                                <td>{module.Teachers && module.Teachers.length > 0
    ? module.Teachers
        .filter(t => t.User) // make sure User exists
        .map(t => `${t.User.lastName} ${t.User.firstName}`)
        .join(", ")
    : "No co-teachers"}</td>
                                <td className='flex flex-row justify-center items-center gap-2'>
                                <button  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(module.id)} >
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
                        <p className='flex justify-center items-center text-xl font-bold'>No Module available</p>
                    </td>
                </tr>
                )}
            </table>
        </div>
        </div>
    </div>
  )
}

export default Gmodule
