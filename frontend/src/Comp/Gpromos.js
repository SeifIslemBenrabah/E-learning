import axios from 'axios'
import React,{useEffect,useState} from 'react'
const Gpromos = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [listpromo, setlistpromo] = useState([]);
    const [listGrades, setlistGrades] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // popup state
    const [isEdit, setIsEdit] = useState(false); // edit mode
    const [currentId, setCurrentId] = useState(null); // promo being edited
    const [formData, setFormData] = useState({
        promoName: "",
        gradeId: ""
      });
    useEffect(()=>{
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
        fatchPromos();
        fatchGrade();
    },[])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleAddPromo = async (e) => {
        e.preventDefault();
        try {
          if (isEdit) {
            // update promo
            await axios.put(`http://localhost:5000/promo/${currentId}`, formData, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
          } else {
            // add promo
            await axios.post(`http://localhost:5000/promo`, formData, {
              headers: { Authorization: `Bearer ${user.token}` },
            });
          }
    
          setIsOpen(false);
          setIsEdit(false);
          setFormData({
            promoName: "",
            gradeId: ""
          });
          
        } catch (err) {
          console.log("Save promo error:", err);
        }
      };
    
      // delete promo
      const handleDeletePromo = async (id) => {
        if (!window.confirm("Are you sure you want to delete this promo?")) return;
        try {
          await axios.delete(`http://localhost:5000/promo/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          
        } catch (err) {
          console.log("Delete promo error:", err);
        }
      };
    
      // edit promo
      const handleEditPromo = (promo) => {
        setIsOpen(true);
        setIsEdit(true);
        setCurrentId(promo.id);
        setFormData({
        promoName: promo.promoName,
        gradeId: promo.gradeId
        });
      };
  return (
    <div className='w-full h-screen pt-14 bg-bluebg -z-40 absolute'>
        <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-blue my-6 ml-8'>Class Management</h1>
        <div className=' w-full flex flex-row items-center gap-3 justify-center'>
        <button onClick={() => setIsOpen(true)} className='bg-primary text-white py-1 px-4 rounded-md text-sm flex flex-row justify-around gap-2 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Class
        </button>
        </div>
        </div>
        {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-lg font-bold mb-4">
                {isEdit ? "Edit Promo" : "Add Promo"}
              </h2>
            <form onSubmit={handleAddPromo} className="flex flex-col gap-3">
              <input
                type="text"
                name="promoName"
                placeholder="Promo Name"
                value={formData.promoName}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
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
                Class Name
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 pt-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                </button>
                <button className='px-5 flex flex-row items-center justify-center gap-6 text-sm border-r-[0.5px] border-gray'>
                Specialty
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
                    <th className='font-normal pl-5'>Class Name</th>
                    <th className='font-normal pl-5'>Year</th>
                    <th className='font-normal pl-5'>Students</th>
                    <th className='font-normal pl-5'>Specialty</th>
                    <th className='font-normal pl-5'>Actions</th>
                </tr>
                {listpromo.length > 0 ? (
                    listpromo.map((promo) => (
                        <tr key={promo.id}>
                                <td >{promo.promoName}</td>
                                <td>{promo.Grade.name}</td>
                                <td>{promo.studentCount}</td>
                                <td>{promo.Grade.specialty || "Null"}</td>
                                <td className='flex flex-row justify-center items-center gap-2'>
                                <button   onClick={() => handleEditPromo(promo)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDeletePromo(promo.id)}>
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
                        <p className='flex justify-center items-center text-xl font-bold'>No Class available</p>
                    </td>
                </tr>
                )}
            </table>
        </div>
        </div>
    </div>
  )
}

export default Gpromos
