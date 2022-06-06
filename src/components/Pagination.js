import React from "react"
import {Container} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "../css/pagination.css"

const Pagination = props => {

    //numbers of pages
    const pages = [];

    for(let i = 1; i <= Math.ceil(props.products.data.length / props.productsPerPage); i++){
        pages.push(i);
    }

    return(
        <Container maxWidth="sm">
            <ul className="pagination justify-content-center ">
                <li className={`page-item prev ${props.currentPage === 1 ? 'disabled' : ''}`}>
                    <a onClick={() => props.paginate(props.currentPage - 1)} className="page-link" href="!#">
                        <ArrowBackIosIcon fontSize="small"/>
                    </a>
                </li>

                {pages.map(number => (
                    <li key={number} className={`page-item ${props.currentPage === number ? 'active' : null}`}>
                        <a onClick={() => props.paginate(number)} hef="!#" className="page-link rounded-circle">
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`page-item next ${props.currentPage === pages.length ? 'disabled' : ''}`}>
                    <a onClick={() => props.paginate(props.currentPage + 1)} className="page-link" href="!#">
                        <ArrowForwardIosIcon fontSize="small"/>
                    </a>
                </li>
            </ul>
        </Container>
    )
}

export default Pagination;
