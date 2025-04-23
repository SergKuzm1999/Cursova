import React, { Component } from 'react';
import './Reviews.css';
import { getReviews } from '../../../actions/reviews';
import { connect } from "react-redux";

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        document.title = 'Відгуки - Clothes4U';
        this.props.getReviews();
    }
    render() {
        let { reviews } = this.props;
        
        console.log(reviews.reviews);
        return (
            <div className='container reviews-page'>
                <h1>Відгуки</h1>
                {reviews && reviews.reviews && reviews.reviews.map((value, index) =>
                    <div className='review' key={index}>
                        <div className='row'>
                            <div className='col-1 col-sm-1 col-lg-1'>
                                <i className="fa fa-user"></i>
                            </div>
                            <div className='col-11 col-sm-11 col-lg-11'>
                                <div className='row'>
                                    <div className='col'>
                                        <p className='date'>{value.date}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <p className='name'><b>{value.user_name}</b></p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <p className='text'>{value.text}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-3 col-6 col-sm-6 col-md-4'>
                                        {<img src={value.product.images[0]} alt='product-img'></img>}
                                    </div>
                                    <div className='col-lg-9 col-6 col-sm-6 col-md-8'>
                                        {<a className='product'
                                            href={'/catalog/' + value.product.gender + '/' + value.product.subcategory +
                                                '/' + value.product.brand + '/p' + value.product.id}>{value.product.name}</a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews.reviews
    };
}
export default connect(mapStateToProps, { getReviews })(Reviews)
