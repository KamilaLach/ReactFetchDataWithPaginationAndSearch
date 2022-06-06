import './css/App.css';
import React, {Component} from "react"
import Products from "./components/Products"
import Pagination from "./components/Pagination"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBCol} from "mdbreact";
import {Button, SnackbarContent, Stack, TableCell, TableRow} from "@mui/material";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentPage: 1,
            query: ''
        }
    }

    componentDidMount() {
        fetch("https://reqres.in/api/products")
            .then ((response) => {
                if(!response.ok) {
                    this.setState({loading: true})
                }
                return response.json()
            })
            .then (allData => {
                this.setState({ products: allData});
            })
            .catch(err => {
                throw Error(err.message);
            })
    }

    getFilteredProducts = (query, products) => {
        if (!query) {
            return products;
        }
        else if (query > products.length || query <= 0) {
            return (
                <div/>
        )}
        else {
            const product = products.find(product => product.id == this.state.query)
            return product;
        }
    }

    showAllProducts() {
        this.setState({query: ''})
        return this.getFilteredProducts(this.state.query, this.state.products.data)

    }

    render() {
        if (!this.state.products.data) { return; }

        // Display 5 items per page, not 6
        this.state.products.per_page = 2;

        const idOfLastProduct = this.state.currentPage * this.state.products.per_page;
        const idOfFirstProduct = idOfLastProduct - this.state.products.per_page;
        const currentProduct = this.state.products.data.slice(idOfFirstProduct, idOfLastProduct);

        const paginate = (pageNumber) => this.setState({currentPage: pageNumber});

        //searched product with ID which is given in this.state.query
        const filteredProducts = this.getFilteredProducts(this.state.query, this.state.products.data);

        const rowStyle = {
            backgroundColor: filteredProducts.color
        }

        return (
            <div className="App">
                <MDBCol md="6" style={{marginBottom: "60px"}}>
                    <input className="form-control"
                           type="number"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={e => this.setState({query: e.target.value})}

                    />
                </MDBCol>

                {this.state.query === '' ? (
                    <React.Fragment>
                        <Products products={currentProduct} />
                        <Pagination products={this.state.products}
                                    currentPage={this.state.currentPage}
                                    productsPerPage={this.state.products.per_page}
                                    paginate={paginate}
                                    pages={this.state.products.total_pages}
                        />
                    </React.Fragment>

                ) : (this.state.query && this.state.query <= this.state.products.data.length) ? (
                    <React.Fragment>
                        <TableRow style={rowStyle}>
                            <TableCell>
                                {filteredProducts.id}
                            </TableCell>
                            <TableCell>
                                {filteredProducts.name}
                            </TableCell>
                            <TableCell>
                                {filteredProducts.year}
                            </TableCell>
                        </TableRow>
                        <Stack sx={{ maxWidth: 600 }}>
                            <Button variant="outlined"
                                    onClick={() => this.showAllProducts()}
                                    style={{marginTop: "60px"}}
                            >
                                All Products
                            </Button>
                        </Stack>
                    </React.Fragment>

                ) : (this.state.query > this.state.products.data.length || this.state.query < 0) && (
                    <Stack spacing={2} sx={{ maxWidth: 600 }}>
                        <SnackbarContent message="No product" style={{justifyContent: "center"}}/>
                        <Button variant="outlined"
                                onClick={() => this.showAllProducts()}
                                style={{marginTop: "60px"}}
                        >
                            All Products
                        </Button>
                    </Stack>
                )}
            </div>
        );
    }
}

export default App;
