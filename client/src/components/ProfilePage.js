import {Link} from 'react-router-dom'


function ProfilePage(){


    return(
        <div>
            <Link to = {'/userform'}>
                <button>Edit Your Profile</button>
            </Link>
            <Link to = {'/eventform'}>
                <button>Add an Event</button>
            </Link>
        </div>
    )
}

export default ProfilePage