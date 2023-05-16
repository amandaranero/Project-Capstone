import {useFormik} from 'formik'
import {useState} from 'react'
import * as yup from 'yup'

function Profile(){
    //  add loading to let user know that the image is loading
    const [loading, setLoading] = useState(false)

    //POST REQUEST
    function newProfile(){
        const formik = useFormik({
            initialValues:{
                username:"",
                name: '',
                bio: '',
                pic: ''
            }, 
            validationSchema: formSchema,
            onSubmit: async(values, helpers)=>{
                const formData = new FormData()
                for (let value in values){
                    formData.append(value, value[value]);
                }
                setLoading(true)
                const resp = await fetch('/users', {
                    method: 'POST',
                    body: formData,
                }) 
                if (resp.ok){
                    const data = await resp.json()
                    setLoading(false)
                    console.log("passed")
                    helpers.resetForm()
                }else{
                    setLoading(false)
                    console.log('failed')
                }
            },  
        })
    }

    return (
        <div>
            
        </div>

    )

}

export default Profile 