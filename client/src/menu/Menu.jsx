import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'startDate', headerName: 'Star Date', width: 130 },
    { field: 'endDate', headerName: 'End name', width: 130 }
  ];
  
  const rows = [
    { id: 1, startDate: 'Snow', endDate: 'Jon' },
    { id: 2, startDate: 'Lannister', endDate: 'Cersei' },
    { id: 3, startDate: 'Lannister', endDate: 'Jaime' },
    { id: 4, startDate: 'Stark', endDate: 'Arya' },
    { id: 5, startDate: 'Targaryen', endDate: 'Daenerys' },
    { id: 6, startDate: 'Melisandre', endDate: null },
    { id: 7, startDate: 'Clifford', endDate: 'Ferrara' },
    { id: 8, startDate: 'Frances', endDate: 'Rossini' },
    { id: 9, startDate: 'Roxie', endDate: 'Harvey' },
  ];

function Menu() {

    const navigate = useNavigate();

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
            rows={rows}
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