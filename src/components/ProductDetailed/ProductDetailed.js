import React from 'react';
import classes from './ProductDetailed.module.css';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon  from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductDiscountedPrice from "../ProductDiscountedPrice/ProductDiscountedPrice";
import ProductColor from "../ProductColor/ProductColor";
import ProductSize from "../ProductSize/ProductSize";


const ProductDetailed = props => {
    console.log(props.sizes)
    return (<Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <div className={classes.ProductDetailed}>
                <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                    <IconButton aria-label="Close" className={classes.closeButton} onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                    {props.product.name}
                </DialogTitle>
                <DialogContent className={classes.DialogContent}>
                    <div className={classes.imageBlock}>
                        <img src={`https://backendapi.turing.com/images/products/${props.product.thumbnail}`}  alt={props.product.name}/>
                    </div>
                    <div className={classes.contentBlock}>
                        {
                            props.product.discounted_price === '0.00'
                                ? <ProductDiscountedPrice
                                    price={props.product.price}
                                    />
                                : <div className={classes.Prices}>
                                    <ProductPrice
                                        price={props.product.price}
                                    />
                                    <ProductDiscountedPrice
                                        price={props.product.discounted_price}
                                    />
                                  </div>
                        }
                        <Typography >
                            {props.product.description}
                        </Typography>
                        <div className={classes.ColorsBlock}>
                            <h3>Color</h3>
                            <div className={classes.Colors}>
                                {
                                    props.colors
                                        ? props.colors.map( (color, index)=>{
                                            return (
                                                <ProductColor
                                                    color={color.attribute_value}
                                                    key={index}
                                                />
                                            )
                                        })
                                        : null
                                }
                            </div>
                        </div>
                        <div className={classes.SizesBlock}>
                            <h3>Size</h3>
                            <div className={classes.Sizes}>
                                {
                                    props.sizes
                                        ? props.sizes.map( (size, index)=>{
                                            console.log(size.attribute_value)
                                            return (
                                                <ProductSize
                                                    size={size.attribute_value}
                                                    key={index}
                                                />
                                            )
                                        })
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </DialogContent>

              </div>
            </Dialog>

    )};

export default ProductDetailed