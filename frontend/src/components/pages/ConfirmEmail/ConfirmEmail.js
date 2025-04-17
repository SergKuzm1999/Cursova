import React, { Component } from 'react';
import axios from 'axios';
import { setAlert } from '../../../helpers/setAlert';

class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        document.title = 'Підтвердження Е-Мейла - Clothes4U';
        const location = document.location.search;
        var userId = new URLSearchParams(location).get('userId');
        var code = new URLSearchParams(location).get('code');
        if(code != null){
        code = code.replaceAll("==","%3D%3D");
        code = code.replaceAll(" ","%2B");
        code = code.replaceAll("+","%2B");
        code = code.replaceAll("/","%2F");
        console.log(code);
        axios.get('/api/account/ConfirmEmail?userId=' + userId + '&code='+code)
        .then(res => {
            setAlert({ message: res.data, type: 'success' });
            setTimeout(()=>{
                window.location = '/account/signin';
            },2000);
        },
        (error)=>{
            setAlert({ message: error.response.data, type: 'danger' });
        });
    }
        
    }
    render() {
       
        
        return (
            <div className='container'>
                <h1 className='text-center' style={{fontSize:'16px'}}>Підтвердження Е-Мейла</h1>
            </div>
        );
    }
}
export default ConfirmEmail;