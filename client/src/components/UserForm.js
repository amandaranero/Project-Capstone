import {useFormik} from 'formik'
import {useState, useContext} from 'react'
import * as yup from 'yup'
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom'
import { usersContext } from "../UsersProvider"

function UserForm(){
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useContext(usersContext)
    const {user} = useAuth0();
    console.log(users)
    console.log(user)

    const navigate = useNavigate()
    

        // FINDING EMAIL IN USER (AUTH0) IN USERS 
        function findEmailID(useremail){
            return useremail.email === user.email
        }
        const myEmail = users.find(useremail=> findEmailID(useremail))
        // //SETTING ID SO CAN FETCH THIS SPECIFIC USER
        // const id = myEmail.id


    

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        username: yup.string().required('Username is required'),
        bio: yup.string().required()
    })

        const formik = useFormik({
            initialValues:{
                name:'',
                username:"",
                bio: '',
                image: ''
            }, 
            validationSchema: formSchema,
            onSubmit: async (values, helpers)=>{
                console.log("submit")
                const formData = new FormData()
                for (let value in values){
                    formData.append(value, values[value]);
                }
                setLoading(true)
                const resp = await fetch(`/users/`, {
                    method: 'PATCH',
                    body: formData,
                }) 
                if (resp.ok){
                    const userData = await resp.json()
                    setLoading(false)
                    console.log("passed", userData)
                    helpers.resetForm()
                    navigate('/profile')
                }else{
                    setLoading(false)
                    console.log('failed')
                }
            },  
        })

    return (
        <div>
            <h1>form</h1>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div>
                    <label htmlFor = "name">Name</label>
                    <input
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        /> {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div> ) :null}     
                </div>
                <div>
                    <label htmlFor = "username">Username</label>
                    <input
                        id="name"
                        name="username"
                        type = "text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        /> {formik.touched.username && formik.errors.username ? (
                            <div>{formik.errors.username}</div> ) :null}     
                </div>
                <div>
                    <label htmlFor = "bio">Bio</label>
                    <input
                        id="name"
                        name="bio"
                        type = "text"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        /> {formik.touched.bio && formik.errors.bio ? (
                            <div>{formik.errors.bio}</div> ) :null}     
                </div>
                <div>
                    <label htmlFor = "image">Upload Profile Picture</label>
                    <input
                        id="image"
                        name="image"
                        type = "file"
                        onChange={(e)=> formik.setFieldValue('image', e.currentTarget.files[0]
                        )}
                        /> {loading ? <p>Your photo is uploading</p>: null}  
                        <button type='submit'>Submit</button>  
                </div>
            </form>
        </div>

    )

}

export default UserForm 