import React from 'react';
import {Outlet,Link} from 'react-router-dom';
function User(props){
    //V5版本中props {location,children,history}
    //V6版本中props就是空对象
    return (
        <div>
            <ul>
                <li><Link to="/user/list">用户列表</Link></li>
                <li><Link to="/user/add">添加用户</Link></li>
            </ul>
            <p>User</p>
            <Outlet/>
        </div>
    )
}
export default User;