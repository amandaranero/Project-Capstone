import {useFormik} from 'formik'
import {useState, useContext} from 'react'
import * as yup from 'yup'
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom'
import { usersContext } from "../UsersProvider"
import { profileContext } from '../ProfileProvider';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'


function UserForm(){
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useContext(profileContext)
    const {id} = profile
    console.log(profile)
    console.log(id)

    const navigate = useNavigate()
    

    const formSchema = yup.object().shape({
        name: yup.string(),
        username: yup.string(),
        bio: yup.string()
    })

        const formik = useFormik({
            initialValues:{
                name:'',
                username:'',
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
                const resp = await fetch(`/users/${id}`, {
                    method: 'PATCH',
                    body: formData,
                }) 
                if (resp.ok){
                    const userData = await resp.json()
                    setLoading(false)
                    setProfile(userData)
                    navigate('/profile')
                    helpers.resetForm()

                }else{
                    setLoading(false)
                    console.log('failed')
                }
            },  
        })

    return (
        <div>
            <h1>Edit Your Profile</h1>
            <Box>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div>
                    <TextField
                        label="name"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        /> {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div> ) :null}     
                </div>
                <div>
                <TextField
                        label="username"
                        id="name"
                        name="username"
                        type = "text"
                        value={formik.values.username}
                        onChange={formik.handleChange  }
                        onBlur={formik.handleBlur}
                        /> {formik.touched.username && formik.errors.username ? (
                            <div>{formik.errors.username}</div> ) :null}     
                </div>
                <div>
                <TextField
                        label="bio"
                        name="bio"
                        type = "text"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        /> {formik.touched.bio && formik.errors.bio ? (
                            <div>{formik.errors.bio}</div> ) :null}     
                </div>
                <div>
                    <TextField
                        name="image"
                        type = "file"
                        onChange={(e)=> formik.setFieldValue('image', e.currentTarget.files[0]
                        )}
                        /> {loading ? <p>Your photo is uploading</p>: null}  
                        <Button type='submit' variant='outlined' sx={{color:'#618833'}}>Submit</Button>  
                </div>
            </form>
            </Box>
        </div>

    )

}

export default UserForm 