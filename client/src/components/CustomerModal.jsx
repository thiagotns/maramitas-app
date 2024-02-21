import React, { useEffect } from "react";
import { Button, Box, Modal, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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

function CustomerModal({customerList, setCustomerList, editCustomer, setEditCustomer, areaList, open, setOpen}){

    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [area, setArea] = React.useState(-1);

    const [nameError, setNameError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        if(editCustomer?.id){
            setName(editCustomer.name);
            setPhone(editCustomer.phone);
            setAddress(editCustomer.address);
            setArea(editCustomer.area?.id ? editCustomer.area.id : -1);
        }

    }, [editCustomer]);
    
    const handleCloseModal = () => {
        setName("");
        setPhone("");
        setAddress("");
        setArea(-1);

        setNameError(false);
        setPhoneError(false);

        setEditCustomer({});
    
        setOpen(false);
    };

    const handleSaveButtonClick = () => {

        let error = false;

        if(name.trim() === ""){
            setNameError(true);
            error = true;
        }

        if(phone.trim() === ""){
            setPhoneError(true);
            error = true;
        }

        if(error){
            return;
        }

        let customer = {
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            area: area === -1 ? null : area
        }

        let method = 'POST';
        let editSufix = '';

        if(editCustomer.id){
            customer.id = editCustomer.id;
            method = 'PUT';
            editSufix = `${editCustomer.id}/`;
        }

        console.log("customer", customer);
        
        axiosPrivate({
            method: method,
            url: `/api/customer/${editSufix}`,
            data: customer
        })
        .then(response => {
            
            console.log('Success.');
            console.log(response.data);

            let areaUpdated = areaList.find(area => area.id === response.data.area);
            response.data.area = areaUpdated;

            console.log("areaUpdated", areaUpdated);

            if(editCustomer.id){
                setCustomerList(customerList.map(item => item.id === response.data.id ? response.data : item));
            } else {
                setCustomerList([...customerList, response.data]);
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
                    New Customer
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
                        label="Phone" 
                        variant="outlined" 
                        error={phoneError}
                        value={phone}
                        onChange={(event) => {
                            setPhone(event.target.value);
                            setPhoneError(false);
                        }}
                        inputProps={{ maxLength: 11 }}
                        required
                    />

                    <TextField 
                        label="Address" 
                        value={address}
                        variant="outlined" 
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}
                        multiline minRows={2} maxRows={4}/>

                    <FormControl fullWidth>
                        <InputLabel id="area-label">Area</InputLabel>
                        <Select
                            labelId="area-label"
                            value={area}
                            label="Age"
                            onChange={(event) => {
                                setArea(event.target.value);
                                console.log("selected area: ", event.target.value);
                            }}
                        >
                            <MenuItem  key={-1} value={-1}><em>None</em></MenuItem>
                            
                            {areaList.map( (area, index) => {
                                return <MenuItem key={index} value={area.id}>{area.name}</MenuItem>
                            })}
                            
                        </Select>
                    </FormControl>
                    
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button color="primary" onClick={handleCloseModal} sx={{marginRight: 1}}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>Save</Button>
                    </Box>
                </Stack>
            </Box>
        </Modal>
    );
}

export default CustomerModal;