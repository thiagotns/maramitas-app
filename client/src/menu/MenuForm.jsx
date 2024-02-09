import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Container, Grid, Paper, Box } from '@mui/material';
import dayjs from 'dayjs';

function MenuForm(){

    const { id } = useParams();

    const [menu, setMenu] = React.useState({});

    
    useEffect(() => {

        if(!id) return;

        fetch(`/api/menu/${id}`)
            .then(response => response.json())
            .then(data => {
                setMenu(data);
                console.log(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, [id]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Paper>
                    <Container sx={{padding:2}} >
                        <DatePicker 
                            label="Start Date"
                            value={dayjs(menu.start_date)}
                            sx={{mb: 2}}
                        />
                        <DatePicker 
                            label="End Date"
                            value={dayjs(menu.end_date)}
                        />
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                            <Button variant="contained" color="primary"
                                sx={{marginTop: 2}}
                            >Save</Button>
                        </Box>
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper>
                    aqui
                </Paper>
            </Grid>
        </Grid>
    );
}

export default MenuForm;