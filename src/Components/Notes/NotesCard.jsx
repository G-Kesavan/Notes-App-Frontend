import React from 'react'
import {MdCreate, MdDelete, MdOutlinePushPin} from 'react-icons/md'

const NotesCard = ({
    id,
    tital,
    date,
    content,
    tags,
    isPinned,
    onEditOpen,
    onDelete,
    onPinNote,
}) => {

  return (
    <div className='border-blue-100 border rounded-lg p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex justify-between'>
            <div>
                <h6>{tital}</h6>
                <span>{date}</span>
            </div>
            <MdOutlinePushPin 
                className={`icon-btn cursor-pointer ${isPinned ? 'text-blue-950':'text-blue-300'}`}
                onClick={()=>onPinNote((id))}
            />
        </div>
        
        <p>{content?.slice(0,60)}</p>
        <div className='flex justify-between'>
            <div>{tags.map((tag,index)=>(<span key={index}>{` #${tag}`}</span>))}</div>
            <div className='flex items-center justify-center gap-1.5'>
                <MdCreate
                    onClick={()=>onEditOpen(id)}
                    className='cursor-pointer'
                />
                <MdDelete
                     onClick={()=>onDelete((id))}
                     className='cursor-pointer'
                />
            </div>
        </div>
    </div>
  )
}

export default NotesCard