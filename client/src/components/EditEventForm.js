import {useFormik} from 'formik'
import * as yup from 'yup'
import {useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Event from './Event'
import { userEventContext } from '../UserEventProvider';
import TextField from '@mui/material/TextField';
import { Select, InputLabel, MenuItem, FormControl, Button } from "@mui/material"



function EditEventForm(){
    const [userEvent, setUserEvent] = useContext(userEventContext)
    const [loading, setLoading] = useState(false)
    const [event, setEvent] = useState({})

    let {id} = useParams()

    const navigate = useNavigate()

    const handleYourEvents = () =>{
        navigate('/userevents')
    }

    const handleDelete = () =>{
        fetch(`/userevents/${id}`,{
            method:'DELETE'
          }).then((resp)=>{
            if(resp.ok){
              resp.json()
              .then((userEventData)=>{
                setUserEvent(userEventData)
                navigate('/userevents')
              })
            }
    
          })
    }
   

    const formSchema = yup.object().shape({
        name: yup.string(),
        description: yup.string(),
        date: yup.string(),
        time: yup.string(),
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
            console.log("hi")
            const formData = new FormData()
            for (let value in values){
                formData.append(value, values[value])
            }
            setLoading(true)
            const resp = await fetch(`/userevents/${id}`, {
                method: 'PATCH',
                body: formData,
            })
            if (resp.ok){
                const eventData = await resp.json()
                setLoading(false)
                console.log(eventData)
                setUserEvent(eventData)
                navigate('/userevents')
                helpers.resetForm()
            } else{
                setLoading(false)
                console.log('failed')
            }
        }
    })

    

    return(
        <div>
            <Button onClick={handleYourEvents}>Your Events</Button>
            <Event/>
            <h1>Edit Event</h1>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div>
                <TextField
                    label="name"
                    id="name"
                    name="name"
                    variant="standard"
                    type = "text"
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}  
                    value= {formik.values.name} 
                    /> {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div> ) :null}   
                </div>
                <div>
                    
                <TextField
                        label="description"
                        id="description"
                        name="description"
                        variant="standard"
                        type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.description} 
                        /> {formik.touched.description && formik.errors.description ? (
                            <div>{formik.errors.description}</div> ) :null}     
                </div>
                <div>
                    
                <TextField
                        label="date"
                        id="date"
                        name="date"
                        variant="standard"
                        type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.date}   
                        /> {formik.touched.date && formik.errors.date ? (
                            <div>{formik.errors.date}</div> ) :null}     
                </div>
                <div>
                <TextField
                        label = "time"
                        id="time"
                        name="time"
                        variant="standard"
                        type = "text"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}  
                        value= {formik.values.time}   
                        /> {formik.touched.time && formik.errors.time ? (
                            <div>{formik.errors.time}</div> ) :null}     
                </div>
                <div>
                    
                <TextField      
                        select
                        label="Event Type"
                        name="event_type"
                        onChange = {formik.handleChange}
                        value= {formik.values.value}
                        onBlur={formik.handleBlur}
                        >
                            <MenuItem key={"public"} value={"public"} >
                                Public Event
                            </MenuItem>
                            <MenuItem key={"private"} value={"private"}>
                                Private Event
                            </MenuItem>
                </TextField>

                </div>
                <div>
                <Button
                    variant="contained"
                    component="label"
                    >   
                    {loading ? <p>Your photo is uploading</p>: null}  
                <TextField
                        id="image"
                        name="image"
                        type = "file"
                        hidden
                        variant="standard"
                        onChange={(e)=> formik.setFieldValue('image', e.currentTarget.files[0]
                        )}
                        /> 
                </Button>
                        <button type='submit'>Submit</button>  
                </div>
            </form>
            <Button onClick={handleDelete}>Delete Event</Button>
        </div>
    )
    }

export default EditEventForm