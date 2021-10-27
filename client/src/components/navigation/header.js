import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SideDrawer from './sidenavigation';

import { clearNotification } from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../../utils/tools';
import { appLayout } from '../../store/actions/site_action';
import { signOut } from '../../store/actions/users_actions';

const Header = (props) => {
    const [layout,setLayout]=useState('')
    const notification = useSelector(state => state.notification)
    const users=useSelector(state=> state.users);
    const dispatch = useDispatch()

    const signOutUser = () => {
        dispatch(signOut())
        props.history.push('/');
    }

    useEffect(() => {
        let pathArray = props.location.pathname.split('/');
        if(pathArray[1]==='dashboard'){
            setLayout('dash_layout');
            dispatch(appLayout('dash_layout'))
        }else{
            setLayout('')
            dispatch(appLayout(''))
        }
    }, [props.location.pathname, dispatch])

    useEffect(() => {
        if (notification && notification.error) {
            const msg = notification.msg ? notification.msg : 'Error'
            showToast('ERROR', msg)
            dispatch(clearNotification())
        }
        if (notification && notification.success) {
            const msg = notification.msg ? notification.msg : 'Done'
            showToast('SUCCESS', msg)
            dispatch(clearNotification())
        }
    }, [notification, dispatch])
    return (

        <>
            <nav className={`navbar fixed-top ${layout}`}>
                <Link style={{ fontFamily: 'Fredoka one' }} to="/"
                    className="navbar-brand d-flex align-items-center"
                >
                    FlickBase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser} />
            </nav>
        </>
    )
}
export default withRouter(Header);