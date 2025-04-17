import React, { Component } from 'react';
import './AdminPage.css';
import {getUsers} from '../../../actions/users';
import { connect } from "react-redux";

class GetAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        this.props.getUsers();
    }
    render() {
        const {users} = this.props;
        var ind = users.length + 1;
        return (
            <div className='view-all-users collapse'>
                <h1>Усі користувачі</h1>
                {users.length > 0 && users.map((value, index)=>
                <div className='row user-info' key={index}>
                    <div className='col'>
                        <span>{ind=ind-1}</span>
                    </div>
                    <div className='col'>
                        {users.length > 0 && <span>{value.date}</span>}
                    </div>
                    <div className='col'>
                        {users.length > 0 && <span>{value.id}</span>}
                    </div>
                    <div className='col'>
                        {users.length > 0 && <span>{value.email}</span>}
                    </div>
                    <div className='col'>
                        {users.length > 0 && <span>{value.firstName} {value.lastName}</span>}
                    </div>
                    <div className='col'>
                        {users.length > 0 && <span>{value.phoneNumber}</span>}
                    </div>
                    <div className='col'>
                        <div className='row'>
                            {users.length > 0 && <p>{value.region}</p>}
                        </div>
                        <div className='row'>
                            {users.length > 0 && <p>{value.city}</p>}
                        </div>
                        <div className='row'>
                            {users.length > 0 && <p>{value.numberDelivery}</p>}
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
        users: state.users.users
    };
}

export default connect(mapStateToProps, { getUsers })(GetAllUsers);