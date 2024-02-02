import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startDate', headerName: 'Star Date', width: 130 },
    { field: 'endDate', headerName: 'End name', width: 130 }
  ];

function Menu() {

    const navigate = useNavigate();
    const [menuList, setMenuList] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/menu')
            .then(response => response.json())
            .then(data => {
                setMenuList(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleTableRowClick = (row) => {
        navigate(`/menu/${row.id}`);
    }

    const handleCreateButtonClick = (row) => {
        navigate('/menu/create');
    }

    return (
        <>
        <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 1
        }}>
            <Typography variant="h6" component="h2" sx={{ flexGrow: 1, paddingLeft: 1 }}>
                Menu
            </Typography>
            <Button 
                startIcon={<AddIcon />} 
                sx={{ display: { xs: 'none', md: 'flex' } }}
                onClick={handleCreateButtonClick}
            >
                Create
            </Button>
        </Box>
        <DataGrid
            rows={menuList}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            onRowClick={handleTableRowClick}
        />
        <Fab 
            color="primary" aria-label="add" 
            sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', bottom: 16, right: 16}}
            onClick={handleCreateButtonClick}
        >
          <AddIcon />
        </Fab>
        </>
    );
}

export default Menu;