import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
    getOrderLogs,
} from "../../actions/admin";

export default props => {
    const admin = useSelector(state => state.admin)

    const [logs, setLogs] = useState([])
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getOrderLogs())
    }, []);

    useEffect(() => {
        setLogs(admin.logs)
    }, [admin])

    return <>
        Logs
    </>
}
