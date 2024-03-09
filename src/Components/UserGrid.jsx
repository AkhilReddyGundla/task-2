import { Button, Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import GridController from './GridController';
import UserDetails from './UserDetails';
import { fetchAllUsers } from '../api';


export default function UserGrid() {

    const currentPage = useSelector((state) => state.gridInfo.currentPage) || localStorage.getItem("currentPage"); //getting currentPage from 
    
    const [rowData, setRowData] = useState([]); // creating state for rows in the grid
    const [selectedRowData, setSelectedRowData] = useState(null);//selecting state for only one row
    const [viewButtonOnClick, setViewButtonOnClick] = useState(false); //state for view button



    useMemo(async() => {
        const response = await fetchAllUsers(currentPage);
        setRowData(response.data.data);
        localStorage.setItem("currentPage",response.data.page)
    }, [currentPage]);

    //defining columns for grid
    const columnDefs = useMemo(() => [
        { headerName: "Id", field: "id" },
        { headerName: "First Name", field: "first_name" },
        { headerName: "Last Name", field: "last_name" },
        { headerName: "Email", field: 'email', sortable: false },
        {
            headerName: "Actions",
            field: 'id',
            cellRenderer: (params) => (
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Button variant="outlined" color="primary" onClick={() => handleViewButton(params.data)}>View</Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteButton(params.value)}>Delete</Button>
                </Box>
            ),
            sortable : false,
        },
    ], []);


    //some default properties of coloum
    const defaultColDef = useMemo(() => ({
        filter: true,
        sortable: true,
        flex: 1,
        floatingFilter: true,
        autoHeight: true,
        wrapText: true,
    }), []);


    //handling button click
    const handleViewButton = (data) => {
        setSelectedRowData(data);
        setViewButtonOnClick(true);
    };


    //handling delete button
    const handleDeleteButton = async (id) => {
        const confirm = window.confirm(`Are you sure you want to delete this user ${id}`);
        if (confirm) {
            try {
                await axios.delete(`https://reqres.in/api/users/${id}`);
                setRowData(prevData => prevData.filter(user => user.id !== id));// removing row from grid
            } catch (error) {
                alert("Please refresh the page and try again")
                console.log(error);
            }
        }
    };


    //handling view button
    if (viewButtonOnClick) {
        const userInformation = selectedRowData;
        return <UserDetails userInformation={userInformation} closeWindow={setViewButtonOnClick} />;
    }

    return (
        <Box className="ag-theme-quartz">
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                domLayout='autoHeight'
                defaultColDef={defaultColDef}
                rowSelection='single'
            />
            <br /><br />
            <GridController />
        </Box>
    );
}
