import React from "react"
import {Container, TableCell, TableHead, TableRow} from "@mui/material";

const Products = props => {

    const showProducts = () => {
        return props.products.map((product, id) => {
            const rowStyle = {
                backgroundColor: product.color
            }
            return (
                <TableRow key={id} style={rowStyle}>
                    <TableCell>
                        {product.id}
                    </TableCell>
                    <TableCell>
                        {product.name}
                    </TableCell>
                    <TableCell>
                        {product.year}
                    </TableCell>
                </TableRow>
            )
        })
    }

    const containerStyle = {
        textAlign: '-webkit-center',
        marginTop: '60px',
        marginBottom: '30px'
    };

    return (
        <Container maxWidth="sm" style={containerStyle}>
            <TableHead >
                {showProducts()}
            </TableHead>
        </Container>
    )
}

export default Products;
