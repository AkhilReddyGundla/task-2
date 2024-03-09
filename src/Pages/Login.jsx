import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userDetailsChecker from "../Components/userDetailsChecker";
import { useDispatch } from 'react-redux';
import { manageToken } from "../redux/slices/authSlice";
import { fetchLogin } from "../api";

export default function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userDetails,setUserDetails] = useState({
        email : null,
        password : null,
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const result = userDetailsChecker(userDetails)
        if(result){
            const response = await fetchLogin(userDetails);
            if(response){
                const data = response.data;
                const token = data.token;
                dispatch(manageToken(token))
                navigate("/Dashboard") 
            }
        }else{
            alert("Check Your details");
        }
    }

    return (
        <Box sx={{marginTop:"1rem", border: "1"}}>
        <form>
            <Box sx={{display:"flex", 
                        flexDirection:"column",
                        justifyContent : "center",
                        alignItems : "center",
                        width : "full",
                        gap : "1rem"
                    }}>

                <Typography variant="h2">Login</Typography>

                <Typography size = "subtitle1">Enter your credentials to access your account</Typography> 

                <TextField
                    required 
                    sx={{width: "25%"}} 
                    placeholder="Email" 
                    type="email"
                    autoComplete="email"
                    onChange={(e)=>setUserDetails({...userDetails,email : e.target.value})}/>

                <TextField 
                    required
                    sx={{width: "25%"}} 
                    placeholder="Password" 
                    type="password"
                    autoComplete="password"
                    onChange={(e)=>setUserDetails({...userDetails,password : e.target.value})}/>

                <Button variant="outlined" type="submit" sx={{width: "25%"}} onClick={handleSubmit}>Submit</Button>     
            </Box>
        </form>
    </Box>
    )
}