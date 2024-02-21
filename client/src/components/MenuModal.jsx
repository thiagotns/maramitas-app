import React, { useEffect } from "react";
import { Button, Box, Modal, Stack, TextField } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

const MenuTypeEnum = {
    TRADICIONAL: "Tradicional",
    PREMIUM: "Premium"
}

function ModalForm({menu, setMenu, editItem, setEditItem, open, setOpen, avaliableOptions}){

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [menuType, setMenuType] = React.useState(MenuTypeEnum.TRADICIONAL);
    const [menuOptions, setMenuOptions] = React.useState([]);

    const [nameError, setNameError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [menuOptionsError, setMenuOptionsError] = React.useState(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        if(editItem.id){
            setName(editItem.name);
            setDescription(editItem.description);
            setMenuType(editItem.type);
            setMenuOptions(editItem.options);
        }

    }, [editItem]);
    
    const optionsToSelect = avaliableOptions.map((option) => {

        return (
            <ToggleButton key={option.id} value={option.id} sx={{flex: "1 1 0px;"}}>
               <Stack>
                   <Typography variant="body2">{option.name}</Typography>
                   <Typography variant="caption">{option.price}</Typography>
               </Stack>
            </ToggleButton>
        )
    });

    const handleCloseModal = () => {
        setName("");
        setDescription("");
        setMenuType(MenuTypeEnum.TRADICIONAL);
        setMenuOptions([]);
        setNameError(false);
        setDescriptionError(false);
        setMenuOptionsError(false);
        setEditItem({});

        setOpen(false);
    };

    const handleMenuType = (event, newMenuType) => {
        setMenuType(newMenuType);
    }

    const handleMenuOptions = (event, newMenuOptions) => {
        setMenuOptions(newMenuOptions);
        setMenuOptionsError(false);
    }

    const handleSaveButtonClick = () => {

        let error = false;

        if(name.trim() === ""){
            setNameError(true);
            error = true;
        }

        if(description.trim() === ""){
            setDescriptionError(true);
            error = true;
        }

        if(menuOptions.length === 0){
            setMenuOptionsError(true);
            error = true;
        }

        if(error){
            return;
        }

        let item = {
            name: name.trim(),
            description: description.trim(),
            type: menuType,
            options: menuOptions,
            menu: menu.id
        }

        let method = 'POST';
        let editSufix = '';

        if(editItem.id){
            item.id = editItem.id;
            method = 'PUT';
            editSufix = `${editItem.id}/`;
        }
        
        axiosPrivate({
            method: method,
            url: `/api/menu-item/${editSufix}`,
            data: item
        })
        .then(response => {
            
            console.log('Success.');
            console.log(response.data);

            response.data.options_name = response.data.options.map(element => { 
                return avaliableOptions.find(option => option.id === element).name; 
            }).join(", ");

            if(editItem.id){
                setMenu({...menu, items: menu.items.map(item => item.id === response.data.id ? response.data : item)});
            } else {
                setMenu({...menu, items: [...menu.items, response.data]});
            }

            handleCloseModal();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: 2}}>
                    New Menu Item
                </Typography>
                <Stack spacing={2}>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        error={nameError}
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setNameError(false);
                        }}
                        required
                    />
                    <TextField 
                        label="Description" 
                        variant="outlined" 
                        value={description}
                        error={descriptionError}
                        onChange={(event) => {
                            setDescription(event.target.value);
                            setDescriptionError(false);
                        }}
                        required
                        multiline minRows={2} maxRows={4}/>
                    
                    <ToggleButtonGroup 
                        color="primary"
                        value={menuType}
                        onChange={handleMenuType}
                        sx={{marginBottom: 2}}
                        exclusive
                    >
                        <ToggleButton value={MenuTypeEnum.TRADICIONAL} sx={{flex: "1 1 0px;"}}>
                            <Typography variant="body2">Tradicional</Typography>
                        </ToggleButton>

                        <ToggleButton value={MenuTypeEnum.PREMIUM} sx={{flex: "1 1 0px;"}}>
                            <Typography variant="body2">Premium</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup 
                        color="primary"
                        value={menuOptions} 
                        onChange={handleMenuOptions}
                        required
                    >
                        {optionsToSelect}
                    </ToggleButtonGroup>
                    <Typography variant="caption" color="error" sx={{display: menuOptionsError ? "block" : "none"}}>
                        Please select at least one option
                    </Typography>

                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button color="primary" onClick={handleCloseModal} sx={{marginRight: 1}}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>Save</Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
}

export default ModalForm;