// import { useSelector } from 'react-redux';
import axios from 'axios';

const token = localStorage.getItem("token");  // getting token from redux state
const userId = localStorage.getItem("userId");
// const currentPage = useSelector((state) => state.gridInfo.currentPage); //getting currentPage from 


export const fetchAllUsers = async (currentPage)=>{
    const url = `https://reqres.in/api/users?page=${currentPage}`;
    const headers = { token, userId };
    try {
        const response = await axios.get(url, { headers });
        localStorage.setItem("TotalGridPages",response.data.total_pages)
        return response
    } catch (error) {
        alert("Something went wrong")
        console.log(error);

    }
    return -1;
}



export const fetchLogin = async(userDetails)=>{
    const url = `https://reqres.in/api/login`
    try{
        const response = await axios.post(url,userDetails);
        return response
    }catch(err){
        alert("Please use default email as eve.holt@reqres.in");
    }
    return 0;
}



export const fetchRegister = async(userDetails)=>{
    const url = `https://reqres.in/api/register`
    try{
        const response = await axios.post(url,userDetails);
        return response
    }catch(err){
        alert("Please use default email as eve.holt@reqres.in");
    }
    return 0;
}