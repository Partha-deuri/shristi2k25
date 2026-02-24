import React, { useEffect, useState } from 'react';

const Home = () => {
    const targetDate = new Date('2025-04-12T00:00:00Z');
    const [remainingTime, setRemainingTime] = useState(getRemainingTime());

    function getRemainingTime() {
        const now = new Date();
        const difference = targetDate - now;
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        } else {
            clearInterval(interval);
            return null;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            {remainingTime ? (
                <div>
                    <span>{remainingTime.days} Days </span>
                    <span>{remainingTime.hours} Hours </span>
                    <span>{remainingTime.minutes} Minutes </span>
                    <span>{remainingTime.seconds} Seconds</span>
                </div>
            ) : (
                <div>Thank you for visiting, the event has already ended on 2025-04-12</div>
            )}
        </div>
    );
};

export default Home;