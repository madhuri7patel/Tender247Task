

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
    password:"",
    contact:"",
    profilePicture: null,
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

//   const inputHandler = (e) =>{
//       const {name, value} = e.target;
//       setUser({...user, [name]:value});
//   }

  const inputHandler = (e) => {
    if (e.target.name === 'profilePicture') {
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
};

// const submitForm = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.keys(user).forEach((key) => {
//         formDataToSend.append(key, user[key]);
//     });

//     try {
//         const res = await axios.post('http://localhost:8000/api/create', formDataToSend, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         console.log(res.data);
//     } catch (err) {
//         console.error(err);
//     }
// };


  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }



  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">Person name</label>
                <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">UserName</label>
                <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
            </div>

            <div className="inputGroup">
                <label htmlFor="email">ContactInfo</label>
                <input type="number" onChange={inputHandler} id="contact" name="contact" autoComplete='off' placeholder='Contact number' />
            </div>

            <div className="inputGroup">
                <label htmlFor="profile">Profile Picture</label>
                <input type="file" onChange={inputHandler} id="profile" name="profilePicture" accept='image/png,image/jpeg'/>
            </div>




            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            

            <div className="inputGroup">
                <button type="submit">ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add