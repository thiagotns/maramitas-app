import { useParams } from 'react-router-dom';

function MenuForm(){

    const { id } = useParams();

    return (
        <div>
            <h2>Menu Form</h2>
            <p>Menu ID: {id}</p>
        </div>
    );
}

export default MenuForm;