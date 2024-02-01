import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Menu() {
    return (
        <>
        <h3 className="p-2">
            Menu
            <Button variant="dark" size="sm" className="ms-2">New</Button>
        </h3>
        <Table hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>2024-01-29</td>
                    <td>2024-01-31</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>2024-01-29</td>
                    <td>2024-01-31</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>2024-01-29</td>
                    <td>2024-01-31</td>
                </tr>
            </tbody>
        </Table>
        </>
    );
}

export default Menu;