import { useEffect, useState, useRef } from "react";
import { Grid, Autocomplete, TextField, Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import CustomerModal from "./CustomerModal";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useTranslation } from 'react-i18next';

function OrdersForm() {

    const { t } = useTranslation();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const menuRef = useRef(null);

    const [customersList, setCustomersList] = useState([]);
    const [customerAreaList, setCustomerAreaList] = useState([]);
    const [openCustomerModal, setOpenCustomerModal] = useState(false);

    useEffect(() => {

        if (location.state) {
            menuRef.current = location.state;
        }

    }, [location.state]);

    useEffect(() => {  
            
        axiosPrivate.get('/api/customer/')
            .then(response => {
                const tempList = response.data.map((obj) => ({id: obj.id, label: obj.name}));
                setCustomersList(tempList);
            })
            .catch(error => {
                console.error("error", error);
            });

        axiosPrivate.get('/api/area/')
            .then(response => {
                setCustomerAreaList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    
    }, [axiosPrivate]);

    const handleNewCustomerButtonClick = () => {
        setOpenCustomerModal(true);
    }

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Autocomplete
                        sx={{ width: "100%" }}
                        options={customersList}
                        renderInput={(params) => <TextField {...params} label={t("order.customer.customer")} />}
                    />
                    <Button variant="contained" color="primary" sx={{marginLeft: 2, height: "100%"}}
                        onClick={handleNewCustomerButtonClick}
                    >
                        <AddIcon />
                    </Button>
                </Box>
            </Grid>
        </Grid>
        <CustomerModal
            customerList={null}
            setCustomerList={null}
            editCustomer={null}
            setEditCustomer={null}
            areaList={customerAreaList}
            open={openCustomerModal}
            setOpen={setOpenCustomerModal}
        />
        </>
    );
}

export default OrdersForm;