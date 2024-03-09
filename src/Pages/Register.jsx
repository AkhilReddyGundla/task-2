import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";
import userDetailsChecker from "../Components/userDetailsChecker";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../api";

export default function Register(){
    const [userDetails,setUserDetails] = useState({
        email : null,
        password : null,
    });
    const navigate = useNavigate()


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const result = userDetailsChecker(userDetails)
        if(result){
            const response = await fetchRegister(userDetails);
            if(response){
                const data = response.data;
                const userId = data.id;
                localStorage.setItem("userId",userId)
                navigate("/login") 
            }
        }else{
            alert("Check Your details");
        }
    }
    const token = localStorage.getItem("token")
    return(
        <Box sx={{marginTop:"1rem", border: "1"}}>
            <form onSubmit={handleSubmit}>
                <Box sx={{display:"flex", 
                            flexDirection:"column",
                            justifyContent : "center",
                            alignItems : "center",
                            width : "full",
                            gap : "1rem"
                        }}>

                    <Typography variant="h2">Register</Typography>

                    <Typography size = "subtitle1">Enter your information to create an account</Typography> 

                    <TextField 
                        sx={{width: "25%"}} 
                        placeholder="Email" 
                        type="email"
                        autoComplete="email"
                        onChange={(e)=>setUserDetails({...userDetails, email : e.target.value})}/>

                    <TextField 
                        sx={{width: "25%"}} 
                        placeholder="Password" 
                        type="password"
                        autoComplete="password"
                        onChange={(e)=>setUserDetails({...userDetails, password : e.target.value})}/>

                    <Button variant="outlined" type="submit" sx={{width: "25%"}}>Submit</Button>     
                </Box>
            </form>
        </Box>
    )
}