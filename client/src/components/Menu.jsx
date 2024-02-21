import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Fab, Modal, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'start_date', headerName: 'Start Date', width: 130 },
    { field: 'end_date', headerName: 'End Date', width: 130 }
  ];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Menu() {

    let newMenu = {
        start_date: new Date(),
        end_date: new Date()
    };

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const [menuList, setMenuList] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {

        axiosPrivate.get('/api/menu/')
            .then(response => {
                console.log("response", response);
                setMenuList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        
    }, []);

    const handleTableRowClick = (row) => {
        navigate(`/menu/${row.id}`);
    }

    const handleCreateButtonClick = () => {
        newMenu = {
            start_date: new Date(),
            end_date: new Date()
        }
        handleOpen();
    }

    const handleSaveButtonClick = () => {
        const formatedMenu = {
            start_date: dayjs(newMenu.start_date).format('YYYY-MM-DD'),
            end_date: dayjs(newMenu.end_date).format('YYYY-MM-DD')
        }

        fetch('/api/menu/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formatedMenu)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate(`/menu/${data.id}`, {state: {id: data.id, message: 'Successfully created!'}});
            handleClose();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: 2}}>
                    Create Menu
                </Typography>
                <Stack spacing={2}>
                    <DatePicker label="Start Date" value={dayjs(newMenu.start_date)}/>
                    <DatePicker label="End Date" value={dayjs(newMenu.end_date)}/>
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button color="primary" onClick={handleClose} sx={{marginRight: 1}}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>Save</Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
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