import React, { useEffect, useCallback, useState } from 'react';
import { Alert } from 'react-bootstrap';
import NotificationIcon from '../../assets/img/notif-bell.svg';
import moment from 'moment-timezone';
export const NotificationBanner = () => {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();

        var d = new Date(); 
        const today = moment.utc(d).tz("America/New_York").format();
        let datetime = d.setHours(17, 30, 0);
        datetime = moment.tz(datetime, "America/New_York").format();
        let difference = +new Date(datetime) - +new Date(today);

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }
    const [show, setShow] = useState(true);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
    return (
        <>
            <Alert className="notificationBanner" onClose={() => setShow(false)} >
                <div className="d-flex align-items-center">
                    <img className="bannerIcon" src={NotificationIcon} />
                    <div className="banner-text">
                        {timerComponents.length > 0 ?
                            <span>Place your order by 5:30 PM EST for guaranteed overnight shipping! {timerComponents}</span>
                            :
                            <span>Order will ship the following business day</span>
                        }
                    </div>
                </div>

            </Alert>
        </>
    )
}