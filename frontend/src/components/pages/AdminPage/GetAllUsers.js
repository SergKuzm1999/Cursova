import React, { Component } from 'react';
import './AdminPage.css';
import { getUsers } from '../../../actions/users';
import { connect } from "react-redux";

class GetAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.getUsers();
    }
    render() {
        const { users } = this.props;
        var ind = users.length + 1;
        return (
            <div className='view-all-users collapse'>
                <h1>Усі користувачі</h1>
                <div className='row user-info'>
                    <div className='col-1'><span>ID</span></div>
                    <div className='col-2'><span>DATE</span></div>
                    <div className='col-3'><span>EMAIL</span></div>
                    <div className='col'><span>NAME</span></div>
                    <div className='col'><span>ROLE</span></div>
                    <div className='col'><span>IS CONFIRMED</span></div>
                    <div className='col'><span>CODE CONFIRM EMAIL</span></div>
                </div>
                {users && users.map((value, index) =>
                    <div className='row user-info' key={index}>
                        <div className='col-1'>
                            {users && <span>{value.id}</span>}
                        </div>
                        <div className='col-2'>
                            {users && <span>{value.date}</span>}
                        </div>

                        <div className='col-3'>
                            {users && <span>{value.email}</span>}
                        </div>
                        <div className='col'>
                            {users && <span>{value.first_name} {value.last_name}</span>}
                        </div>
                        <div className='col'>
                            {users && <span>{value.role}</span>}
                        </div>
                        <div className='col'>
                            {users && (
                                <span>{value.is_Confirmed ? 'Підтверджено' : 'Не підтверджено'}</span>
                            )}
                        </div>
                        <div className='col'>
                            {users && <span>{value.code_confirm_email}</span>}
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