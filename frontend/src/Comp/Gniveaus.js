import axios from 'axios'
import React,{useEffect,useState} from 'react'
const Gniveaus = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [listniveaus, setlistniveaus] = useState([]);
    useEffect(()=>{
        const fatchniveaus = async()=>{
            try{
                const res = await axios.get(`http://localhost:8080/niveau`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                })
                setlistniveaus(res.data.niveau)
            }
            catch(err){
                console.log('err:',err)
            }
        };
        fatchniveaus();
    },[])
  return (
    <div className='w-5/6 h-screen right-0 absolute'>
    <div className='flex flex-row items-center my-6 ml-8'>
    <h1 className='text-4xl font-semibold text-primary '>GESTION DES NIVEAUS</h1>
    <button className='absolute right-0 bg-primary text-white p-2 rounded-lg flex flex-row justify-around gap-2 items-center mr-10'>
        Add Niveau
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </button>
    </div>
    <div className='flex justify-center mt-16'>
    <div className='w-11/12'>
        <table className='w-full shadow-lg '>
            <tr>
                <th >Name</th>
                <th >Action</th>
            </tr>
            {listniveaus.length > 0 ? (
                listniveaus.map((niveau) => (
                    <tr key={niveau.id}>
                            <td >{niveau.name}</td>
                            <td className='flex flex-row justify-center items-center gap-2'>
                            <button  >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                            <button >
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
                    <p className='flex justify-center items-center'>No Niveau available</p>
                </td>
            </tr>
            )}
        </table>
    </div>
    </div>
    </div>
  )
}

export default Gniveaus
