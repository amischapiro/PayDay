// // xeftevjk
// import React, { useState } from "react";
// import { connect } from "react-redux";


// export function _ImgUpload() {

//     const [IsImgLoading, setIsImageLoading] = useState(false)
//     const [imgUrl, setImageUrl] = useState('')


//     const uploadImg = async (ev) => {
//         setIsImageLoading(true)
//         const CLOUD_NAME = 'diu2bzkko'
//         const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

//         const formData = new FormData();
//         formData.append('file', ev.target.files[0])
//         formData.append('upload_preset', 'xeftevjk');
//         try {
//             const { data } = await axios.post(UPLOAD_URL, formData)
//             const imgUrl = data.url
//             setImageUrl(imgUrl)
//             setIsImageLoading(false)
//             // onSetImg(imgUrl)
//         } catch (err) {
//             console.error(err)
//         }
//     }
// }

export const cloudinaryService = {
    uploadImg
}

function uploadImg(ev) {
    const CLOUD_NAME = 'diu2bzkko'
    const PRESET_NAME = 'xeftevjk'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', PRESET_NAME);

    
    
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)

            return res
        })
        .catch(err => console.error(err))
}
