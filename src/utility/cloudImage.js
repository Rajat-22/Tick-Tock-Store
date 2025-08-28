export const uploadImageCloudinary = async (file) =>{
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset','TickTock')

    try{
   const response = await fetch('https://api.cloudinary.com/v1_1/dnlsrqp3v/image/upload', {
    method: 'POST',
    body: formData
   })

   if(!response.ok){
    throw new Error('Failed to upload image')
   }

   const data = await response.json()
   return data.secure_url

    }catch(err){
        console.log(err)
        throw err
    }
}