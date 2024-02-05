import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,HashRouter,Routes,Route,Link,NavLink} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import UserDetail from './components/UserDetail';
import Profile from './components/Profile';
import Post from './components/Post';
const root = ReactDOM.createRoot(document.getElementById('root'));
const activeStyle = {backgroundColor:'green'};
const activeClassName = 'active';
const activeNavProps = {
	style:({isActive})=>isActive?activeStyle:{},
	className:({isActive})=>isActive?activeClassName:''
}
root.render(
	<BrowserRouter>
		<ul>
			<li><NavLink {...activeNavProps} to="/">首页</NavLink></li>
			<li><NavLink {...activeNavProps} to="/user">用户管理</NavLink></li>
			<li><NavLink {...activeNavProps} to="/profile">个人中心</NavLink></li>
		</ul>
		<Routes>
			<Route path="/home" element={<Home/>}/>
			<Route path="/user" element={<User/>}>
				<Route path="list" element={<UserList/>}/>
				<Route path="add" element={<UserAdd/>}/>
			</Route>
		</Routes>
	</BrowserRouter>
);