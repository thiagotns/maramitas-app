import React, { useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Container, Grid, Paper, Box, Modal, Stack, Fab, TextField } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import MenuModal from './MenuModal';

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 10 },
    { field: 'type', headerName: 'Type', flex: 4 },
    { field: 'options_name', headerName: 'Options', flex: 4 },
    {
        field: 'actions',
        type: 'actions',
        flex: 2,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={ () => {console.log("Edit: " + params.row.id)}}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={ () => {console.log("Delete: " + params.row.id)}}
            />,
        ],
      }
];


function MenuForm(){

    const { id } = useParams();
    const location = useLocation();
    const [menu, setMenu] = React.useState({});
    const [newItem, setNewItem] = React.useState({});
    const [avaliableOptions, setAvaliableOptions] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(location.state && location.state.message);

    const handleCloseModal = () => {
        console.log("Close Modal");
        console.log("New Item");
        console.log(newItem);
        setOpenModal(false)
    };

    useEffect(() => {

        if(!id) return;

        fetch(`/api/menu/${id}`)
            .then(response => response.json())
            .then(data => {
                setMenu(data);
                console.log(data);

                setAvaliableOptions(data.avaliable_options);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        

    }, [id]);

    const handleAddItemButtonClick = () => {
        
        setOpenModal(true);

    }

    const handleSaveButtonClick = () => {

        console.log("Save new Item");
        console.log(newItem);

    }

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box sx={{display: openAlert ? 'block' : 'none'}}>
                    <Alert icon={<CheckIcon />} severity="success"  onClose={() => {setOpenAlert(false);}}>
                        {location.state.message}
                    </Alert>
                </Box>
                <Paper sx={{padding: 2, marginTop: 1}}>
                    <Typography variant="h6" component="h2" sx={{ flexGrow: 1, paddingLeft: 1 }}>
                        Menu Items
                    </Typography>
                    <Container sx={{padding:2}} >
                        <DatePicker 
                            label="Start Date"
                            value={dayjs(menu.start_date)}
                            disabled
                        />
                        <DatePicker 
                            label="End Date"
                            value={dayjs(menu.end_date)}
                            sx={{marginLeft: 2}}
                            disabled
                        />
                        <Button 
                            startIcon={<AddIcon />} 
                            sx={{ 
                                display: { xs: 'none', md: 'flex' },
                                marginTop: 2,
                                float: 'right',
                            }}
                            onClick={handleAddItemButtonClick}
                        >
                            Add Item
                        </Button>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
                <Paper>
                    <DataGrid sx={{paddingX: 2}}
                        rows={menu.items || []}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 15]}
                    />
                </Paper>
            </Grid>
        </Grid>
        <Fab 
            color="primary" aria-label="add" 
            sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', bottom: 16, right: 16}}
            onClick={handleAddItemButtonClick}
        >
          <AddIcon />
        </Fab>
        <MenuModal 
            menu={menu}
            setMenu={setMenu}
            newItem={newItem}
            setNewItem={setNewItem}
            open={openModal} 
            handleCloseModal={handleCloseModal} 
            avaliableOptions={avaliableOptions}
        />
        </>
    );
}

export default MenuForm;