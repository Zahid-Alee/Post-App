import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

export function Auth(Component) {

    return (
        localStorage.getItem('token') ?
            <Component />
            :
            <Navigate to={'/login'} />
    )
}

