import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

function MenuForm(){

    const { id } = useParams();

    const [menu, setMenu] = React.useState({});

    
    useEffect(() => {

        if(!id) return;

        fetch(`/api/menu/${id}`)
            .then(response => response.json())
            .then(data => {
                setMenu(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, [id]);

    return (
        <div>
            <h2>Menu Form</h2>
            <form>
                <div>
                    <label>ID</label>
                    <input type="text" value={menu.id} disabled />
                </div>
                <div>
                    <label>Start Date</label>
                    <input type="date" value={menu.start_date} />
                </div>
                <div>
                    <label>End Date</label>
                    <input type="date" value={menu.end_date} />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default MenuForm;