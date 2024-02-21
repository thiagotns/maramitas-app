import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Button, Typography, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {axiosPrivate} from '../api/axios';
import CustomerModal from "./CustomerModal";

function Customer() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { field: 'address', headerName: 'Adress', width: 200 },
        {
            field: 'actions',
            type: 'actions',
            flex: 2,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={ () => {handleEditButtonClick(params.row)}}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={ () => {handleDeleteGridButtonClick(params.row)}}
                />,
            ],
          }
      ];

    const [customerList, setCustomerList] = React.useState([]);
    const [areaList, setAreaList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const [editCustomer, setEditCustomer] = React.useState({});
    const [deleteCustomer, setDeleteCustomer] = React.useState({});
    
    const handleOpen = () => setOpen(true);

    useEffect(() => {

        axiosPrivate.get('/api/customer/')
            .then(response => {
                console.log("customerList", response.data);
                setCustomerList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axiosPrivate.get('/api/area/')
            .then(response => {
                setAreaList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, []);


    const handleEditButtonClick = (row) => {
        
        setEditCustomer(row);
        setOpen(true);
    
    }

    const handleDeleteGridButtonClick = (row) => {
        setDeleteCustomer(row);
        setOpenDialog(true);
    };

    const handleDeleteDialogClick = () => {
        
        axiosPrivate.delete(`/api/customer/${deleteCustomer.id}`)
        .then(response => {
            console.log('Success.');
            console.log(response.data);
            setCustomerList(customerList.filter(item => item.id !== deleteCustomer.id));
            setOpenDialog(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    };

    const handleCreateButtonClick = () => {
        handleOpen();
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
        <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 1
        }}>
            <Typography variant="h6" component="h2" sx={{ flexGrow: 1, paddingLeft: 1 }}>
                Customer
            </Typography>
            <Button 
                startIcon={<AddIcon />} 
                sx={{ display: { xs: 'none', md: 'flex' } }}
                onClick={handleCreateButtonClick}
            >
                Create
            </Button>
        </Box>
        <CustomerModal
            customerList={customerList}
            setCustomerList={setCustomerList}
            editCustomer={editCustomer}
            setEditCustomer={setEditCustomer}
            areaList={areaList}
            open={open}
            setOpen={setOpen}
        />

        <DataGrid
            rows={customerList}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want delete "{deleteCustomer.name}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} autoFocus>Cancel</Button>
                <Button onClick={handleDeleteDialogClick} variant="outlined" 
                    startIcon={<DeleteIcon />} 
                    color="error"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
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

export default Customer;