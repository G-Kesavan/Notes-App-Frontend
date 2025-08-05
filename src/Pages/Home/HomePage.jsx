import {useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import NotesCard from '../../Components/Notes/NotesCard'
import { MdAdd } from 'react-icons/md'
import AddNotes from '../../Components/AddNotes/AddNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

const HomePage = () => {

  const navigate = useNavigate()
  const [allNotes,setAllNotes]=useState([])
  const [userInfo,setUserInfo]=useState()

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow:false,
    type:'add',
    data:null
  })

  

  const getUserInfo = async ()=>{
    try{
      const response =await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    }
    catch(error){
      if(error.response.status === 401){
        localStorage.clear()
        navigate("/login")
      }
    }
  };

  const getAllNotes = async () => {
      try{
      const response =await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }
    }catch(error){
      if(error.response.status === 401){  
      }
    }
  }

const onPinNote = async (id) => {
  const noteToUpdate = allNotes.find(note => note._id === id);
  if (!noteToUpdate) return;

  const newIsPinned = !noteToUpdate.isPinned;

  try {
    console.log(newIsPinned);
    await axiosInstance.put(`/edit-pin/${id}`, {
      isPinned: newIsPinned
    });
    getAllNotes(); 
  } catch (error) {
    console.error("Failed to update pin status", error);
  }
};


const onDelete = async(id) => {
    try{
      const response = await axiosInstance.delete(`/delete-notes/${id}`);
      getAllNotes()
    }catch(error){
      console.log(error);
    }   
}

const onEditOpen = async(id) => {
   allNotes.forEach(note => {
    if(note._id == id){
      const id = note._id
      const title = note.title
      const content = note.content
      const tags = note.tags
      setOpenAddEditModal({
        isShow:true,
        type:'edit',
        data:{id,title,content,tags}
      })
    }
   });  
}

  useEffect(() => {
    getUserInfo()
    getAllNotes()
    return () => {
      
    }
  }, [])
  return (
    <>
      <Navbar userInfo={userInfo}/>
      <div className='container mx-auto bg-blue-50'>
        <div className='grid grid-cols-3 gap-4 m-7'>
          {allNotes.map((note)=>(
            <NotesCard
              key={note._id}
              id={note._id}
              tital={note.title}
              content={note.content}
              date={note.createdOn} 
              tags={note.tags}
              isPinned={note.isPinned }
              onEditOpen={onEditOpen}
              onDelete={onDelete}
              onPinNote={onPinNote}
          />
          ))}
          
        </div>
      </div>
      <button 
        className='bg-blue-500 text-white flex items-center justify-center rounded-lg absolute bottom-8 right-8 hover:bg-blue-700'
        onClick={()=>{setOpenAddEditModal({isShow:true,type:'add',data:null})}}
       >
        <MdAdd className='text-5xl'/>
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={()=>{}}
        className= "w-full h-full flex bg-black/30"
      >
        <AddNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          allNotes={allNotes}
          getAllNotes={getAllNotes}
          closeOn={()=>setOpenAddEditModal({
            isShow:false,
            type:'add',
            data:null
          })}
        />
      </Modal>        
        
    </>
  )
}

export default HomePage