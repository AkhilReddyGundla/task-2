
import { Box, Typography } from '@mui/material';
import UserGrid from '../Components/UserGrid';
export default function Dashboard(){
    return (
        <>
            <Box sx={{padding : "10px"}}>
                <Typography variant="h3">Dashboard</Typography>
                <UserGrid/>
            </Box>
        </>
    )
}