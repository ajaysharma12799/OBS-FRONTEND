import React from 'react'
import { Link } from 'react-router-dom';

import Base from './../core/Base';
import { isAuthenticated } from './../auth/helper/index';

const adminDashboard = () => {

    const { user: { firstName, lastName, email } } = isAuthenticated();

    const AdminLeftSide = () => (
        <div>
            <div className="card">
                <h4 className="card-header">Admin Navigation Area</h4>
                <ul className="list-group text-left">
                    <li className="list-group-item">
                        <Link to='/admin/create/category' className="nav-link font-weight-bolder">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/categories' className="nav-link font-weight-bolder">Manage Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/create/product' className="nav-link font-weight-bolder">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/products' className="nav-link font-weight-bolder">Manage Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/orders' className="nav-link font-weight-bolder">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        </div>
    )

    const AdminRightSide = () => (
        <div>
            <div className="card">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group text-left font-weight-bolder">
                    <li className="list-group-item">
                        Name : { firstName }  { lastName }
                    </li>
                    <li className="list-group-item">
                        Email : { email }
                    </li>
                    <li className="list-group-item">
                        Note : You are Admin, You Should Not Perform any Operation Which May be Harmful or Produce/Create any Problem to Company, 
                        If You Found Guilty Then Strict Action May be Taken Against You
                    </li>
                </ul>
            </div>
        </div>
    )

    return (
        <Base title='Welcome to AdminDashboard' description='An Amazing Place to Buy Books'>
            <div className="container-fluid row mt-5">
                <div className="col-3">
                    { AdminLeftSide() }
                </div>
                <div className="col-9">
                    { AdminRightSide() }
                </div>
            </div>
        </Base>
    )
}

export default adminDashboard
