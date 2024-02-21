import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Fab, Modal, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";

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

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const [menuList, setMenuList] = useState([]);
    const [open, setOpen] = useState(false);

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
        setStartDate(dayjs());
        setEndDate(dayjs());

        handleOpen();
    }

    const handleSaveButtonClick = () => {
        const formatedMenu = {
            start_date: dayjs(startDate).format('YYYY-MM-DD'),
            end_date: dayjs(endDate).format('YYYY-MM-DD')
        }

        axiosPrivate.post('/api/menu/', formatedMenu)
        .then(response => {
            console.log('Success:', response.data);
            navigate(`/menu/${response.data.id}`, {state: {id: response.data.id, message: 'Successfully created!'}});
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
                    <DatePicker label="Start Date"
                     value={startDate}
                     onChange={(event) => {
                        console.log("event", event);
                        setStartDate(event)
                    }}
                     />
                    <DatePicker label="End Date" 
                    value={endDate}
                    onChange={(event) => {
                        console.log("event", event);
                        setEndDate(event)
                    }}/>
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