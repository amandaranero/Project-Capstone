import {useFormik} from 'formik'
import * as yup from 'yup'
import {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";


function EventForm({users}){
    const [loading, setLoading] = useState(false)
    const { user} = useAuth0()

  

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Username is required'),
        date: yup.string().required(),
        time: yup.string().required(),
        public: yup.string(),
    })

    //POST REQUEST
    const formik = useFormik({
        initialValues:{
            name: '',
            description: '',
            date: '',
            time: '',
            event_type: '',
            image: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values, helpers)=>{
            const formData = new FormData()
            for (let value in values){
                formData.append(value, values[value])
            }
            setLoading(true)
            const resp = await fetch('/events', {
                method: 'POST',
                body: formData,
            })
            if (resp.ok){
                const postData = await resp.json()
                setLoading(false)
                console.log('yes', postData)
                helpers.resetForm() 
            } else{
                setLoading(false)
                console.log('failed')
            }
        }
    })
    

    return(
        <div>
            <h1>Events</h1>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div>
                <input
                    id="name"
                    name="name"
                    type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.name} 
                    /> {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div> ) :null}   
                </div>
                <div>
                    <label htmlFor = "description">Event Description</label>
                    <input
                        id="description"
                        name="description"
                        type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.description} 
                        /> {formik.touched.description && formik.errors.description ? (
                            <div>{formik.errors.description}</div> ) :null}     
                </div>
                <div>
                    <label htmlFor = "date">Date</label>
                    <input
                        id="date"
                        name="date"
                        type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.date}   
                        /> {formik.touched.date && formik.errors.date ? (
                            <div>{formik.errors.date}</div> ) :null}     
                </div>
                <div>
                    <label htmlFor = "time">Time</label>
                    <input
                        id="time"
                        name="time"
                        type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.time}   
                        /> {formik.touched.time && formik.errors.time ? (
                            <div>{formik.errors.time}</div> ) :null}     
                </div>
                <div>
                    <label htmlFor='Event'>Event type</label>
                    <select
                        name="event_type"
                        onChange = {formik.handleChange}
                        value= {formik.values.value}
                        onBlur={formik.handleBlur}
                        >
                            <option value="public" label="Public Event">
                                Public Event
                            </option>
                            <option value="private" label="Private Event">
                                Private Event
                            </option>
                    </select>

                </div>
                <div>
                    <label htmlFor = "image">Upload Event Picture</label>
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

export default EventForm


