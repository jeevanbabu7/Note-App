import { Link } from 'react-router-dom'
import { Tag } from '../App'
import './NoteCard.css'
type NoteCardProps = {
    id: string
    title: string
    tags: Tag []
}
const NoteCard = ({id, title, tags}: NoteCardProps) => {
  return (
    <Link to={`${id}`} style={{textDecoration: 'none'}}>
        <div className='note-wrapper'>
            <h2>{title}</h2>
            
            <div className="card-tags">
                {tags.map((tag, index) => {
                    return (
                        <div key={index} className="tag">
                            <p>{tag.label}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
