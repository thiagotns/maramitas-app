import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Grid, Paper, Box, Fab, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useTranslation } from 'react-i18next';

function Orders() {

    const { t } = useTranslation();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'customer', headerName: t('order.customer.name'), width: 200,
            valueFormatter: params => 
                params?.value?.name
        },
        { field: 'created_at', headerName: t('order.createdAt'), width: 130, 
            valueFormatter: params => 
              dayjs(params?.value).format('DD/MM/YYYY')
        },
        { field: 'shipping_method', headerName: t('order.shippingMethod'), width: 80,
            valueFormatter: params => 
                t(`order.${params?.value}`)
        },
        { field: 'total', headerName: t('order.total'), width: 80 },
        { field: 'payment_status', headerName: t('order.paymentStatus'), width: 130, 
            valueFormatter: params => 
                t(`order.statusValue.${params?.value}`)
        },
        { field: 'status', headerName: t('order.status'), width: 130 , 
            valueFormatter: params => 
                t(`order.statusValue.${params?.value}`)
        }
    ];

    const axiosPrivate = useAxiosPrivate();

    const [menuList, setMenuList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedMenuPosition, setSelectedMenuPosition] = useState(0);

    useEffect(() => {

        axiosPrivate.get('/api/menu/')
            .then(response => {
                setMenuList(response.data);
                setSelectedMenu(response.data[0]);
            })
            .catch(error => {
                console.error("error", error);
            });

    }, []);

    useEffect(() => {

        if (selectedMenu === null || selectedMenu === undefined) {
            return;
        }

        console.log("selectedMenu", selectedMenu);

        axiosPrivate.get(`/api/menu/${selectedMenu.id}/orders/`)
            .then(response => {
                console.log("response", response.data);
                setOrderList(response.data);
            })
            .catch(error => {
                console.error("error", error);
            });

    }, [selectedMenu]);

    const handlePreviosMenuClick = () => {
        if (selectedMenuPosition >= menuList.length) {
            console.log("end of the array");
            return;
        }

        setSelectedMenu(menuList[selectedMenuPosition + 1]);
        setSelectedMenuPosition((prev) => prev + 1);
    }

    const handleNextMenuClick = () => {

        if (selectedMenuPosition <= 0) {
            console.log("start of the array");
            return;
        }

        setSelectedMenu(menuList[selectedMenuPosition - 1]);
        setSelectedMenuPosition((prev) => prev - 1);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton onClick={handlePreviosMenuClick} >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Paper sx={{padding: 2, marginX: 2, width: "100%", textAlign: "center" }}>
                        <Typography variant="h5" component="h2" sx={{ flexGrow: 1, paddingLeft: 1 }}>
                            {t("order.menuHeader")}
                            {": "}
                            {dayjs(selectedMenu?.start_date).format('DD/MM/YYYY')}
                            {" " + t("order.toMenu") + " "}
                            {dayjs(selectedMenu?.end_date).format('DD/MM/YYYY')}
                        </Typography>
                    </Paper>
                    <IconButton onClick={handleNextMenuClick} >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Grid>
            <Grid item xs={12} md={12}>
                <Paper>
                    <DataGrid sx={{paddingX: 2}}
                        rows={orderList || []}
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
    );
}

export default Orders;