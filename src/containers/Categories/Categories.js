import React from 'react';
import classes from './Categories.module.css';
import Filters from '../../components/Filters/Filters';
import Product from '../../components/Product/Products';
import axios from "axios";
// import {getCategories} from "../../actions/categories";
import {getGoods} from "../../actions/goods";
import {connect} from "react-redux";
import ProductDetailed from "../../components/ProductDetailed/ProductDetailed";
import Dialog from '@material-ui/core/Dialog';


class Categories extends React.Component {

    state = {
        attributesProduct: null,
        currentProduct: null
    };

    handleClose = () => {
        this.setState({ currentProduct: null });
    };

    componentDidMount() {
        const {getGoods} = this.props;
        axios.get('https://backendapi.turing.com/products/').then(({data}) => {
            getGoods(data)
        });
    }

    handleClickProduct = evt => {
        axios.get(`https://backendapi.turing.com/attributes/inProduct/${evt.currentTarget.id}`).then(({data}) => {
            this.setState({attributesProduct: data})
        });

        const currentProduct = this.props.goods.rows.find(product => {
            return product.product_id == evt.currentTarget.id;
        })

        this.setState({currentProduct: currentProduct});
    };

    getColors = (attributes) => {
        if(attributes){
            return attributes.filter(attribute =>{
                // console.log(attribute)
                return attribute.attribute_name === 'Color'
            })
        }
    }
    getSizes = (attributes) => {
        if(attributes){
            return attributes.filter(attribute =>{
                return attribute.attribute_name === 'Size'
            })
        }
    }

    render() {

        return (
            <div className={classes.Categories}>
                <Filters/>
                <div className={classes.ProductList}>
                    {
                        this.props.isLoading
                            ? 'loading'
                            : this.props.goods.rows.map(product => {
                                return (
                                    <Product
                                        product={product}
                                        key={product.product_id}
                                        onClickProduct={this.handleClickProduct}
                                    />
                                )

                              })

                    }
                    {
                        this.state.currentProduct === null
                            ? ''
                            : <ProductDetailed
                                    open={this.state.currentProduct !== null}
                                    onClose={this.handleClose}
                                    product = {this.state.currentProduct}
                                    colors = {this.getColors(this.state.attributesProduct)}
                                    sizes = {this.getSizes(this.state.attributesProduct)}
                                />

                    }
                </div>
            </div>
        );
    }

};

const mapStateToProps = ({goods}) => {
    return {
        goods: goods.goods,
        isLoading: goods.isLoading
    }
};
const mapDispatchToProps = dispatch => {
    return {getGoods: goods => dispatch(getGoods(goods))}
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);

