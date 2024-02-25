import React, { useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Grid, Paper, Box, Fab, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import MenuModal from './MenuModal';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useTranslation } from 'react-i18next';

function MenuForm(){

    const { t } = useTranslation();

    const { id } = useParams();
    const location = useLocation();
    const [menu, setMenu] = React.useState({});
    const [editItem, setEditItem] = React.useState({});
    const [deleteItem, setDeleteItem] = React.useState({}); 
    const [avaliableOptions, setAvaliableOptions] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false/*location.state && location.state.message*/);
    const [openDialog, setOpenDialog] = React.useState(false);

    const axiosPrivate = useAxiosPrivate();

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: t('menu.items.name'), flex: 10 },
        { field: 'type', headerName: t('menu.items.type'), flex: 4 },
        { field: 'options_name', headerName: t('menu.items.options'), flex: 4 },
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
    

    const handleEditButtonClick = (row) => {
        
        let optionsIds = row.options.map(option => option.id || option);
        row.options = optionsIds;

        setEditItem(row);
        setOpenModal(true);
    
    }
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddItemButtonClick = () => {   
        setOpenModal(true);
    }

    const handleDownloadButtonClick = () => {
        console.log("length", menu.items?.length > 0 );
        
        axiosPrivate.get(`/public/menu/?id=${id}`, {
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            const today = new Date().toJSON().slice(0,10) 

            link.href = url;
            link.setAttribute('download', `maramitas${today}.jpg`); 
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        }).catch(error => {
            console.error('There was an error!', error);
        });

    }

    const handleDeleteGridButtonClick = (row) => {
        setDeleteItem(row);
        setOpenDialog(true);
    };

    const handleDeleteGridClick = () => {
        
        axiosPrivate.delete(`/api/menu-item/${deleteItem.id}`)
        .then(response => {
            console.log('Success.');
            console.log(response.data);
            setMenu({...menu, items: menu.items.filter(item => item.id !== deleteItem.id)});
            setOpenDialog(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    };


    useEffect(() => {

        if(!id) return;

        axiosPrivate.get(`/api/menu/${id}`)
            .then(response => {
                setMenu(response.data);
                setAvaliableOptions(response.data.avaliable_options);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        

    }, [id]);

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box sx={{display: openAlert ? 'block' : 'none'}}>
                    <Alert icon={<CheckIcon />} severity="success"  onClose={() => {setOpenAlert(false);}}>
                        Message here!
                    </Alert>
                </Box>
                <Paper sx={{padding: 2, marginTop: 1}}>
                    <Typography variant="h6" component="h2" sx={{ flexGrow: 1, paddingLeft: 1 }}>
                        {t('menu.items.header')}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <DatePicker 
                                label={t("menu.startDate")}
                                value={dayjs(menu.start_date)}
                                disabled
                            />
                            <DatePicker 
                                label={t("menu.endDate")}
                                value={dayjs(menu.end_date)}
                                sx={{marginLeft: 2}}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button 
                                variant="outlined"
                                startIcon={<AddIcon />} 
                                sx={{ 
                                    display: { xs: 'none', md: 'flex' },
                                    marginTop: 2,
                                    marginLeft: 2,
                                    float: 'right',
                                }}
                                onClick={handleAddItemButtonClick}
                            >
                                {t('menu.items.buttonAddItem')}
                            </Button>
                            <Button 
                                    startIcon={<FileDownloadIcon />} 
                                    sx={{ 
                                        display: (menu.items?.length > 0) ? { xs: 'none', md: 'flex' } : "none",
                                        marginTop: 2,
                                        float: 'right',
                                    }}
                                    onClick={handleDownloadButtonClick}
                                >
                                    Download
                            </Button>
                        </Grid>
                    </Grid>
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
            editItem={editItem}
            setEditItem={setEditItem}
            open={openModal} 
            setOpen={setOpenModal}
            avaliableOptions={avaliableOptions}
        />
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle>{t('menu.items.deleteDialogHeader')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('menu.items.deleteDialogMessage')} "{deleteItem.name}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} autoFocus>Cancel</Button>
                <Button onClick={handleDeleteGridClick} variant="outlined" 
                    startIcon={<DeleteIcon />} 
                    color="error"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default MenuForm;