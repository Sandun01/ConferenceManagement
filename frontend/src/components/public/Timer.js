import React, { useEffect, useState, useRef } from "react";
import "../../static/Home.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 1500,
    margin: 25,
  },
  media: {
    height: 350,
    width: 320,
  },
  timerContainer : {
    backgroundImage: "url(/images/conference.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "none",
    color: "#fff",
    width: "100vw",
    height: "120vh",
  },
});

const Timer = ({ confTime }) => {
  const classes = useStyles();
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, settimerHours] = useState("00");
  const [timerMinutes, settimerMinutes] = useState("00");
  const [timerSeconds, settimerSeconds] = useState("00");
  
  const conferenceDate = confTime.toString();

  let interval = useRef();

  // console.log(conferenceDate)

  const statTimer = () => {
    const countDownDate = new Date(confTime).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        settimerHours(hours);
        settimerMinutes(minutes);
        settimerSeconds(seconds);
      }
    }, 1000);
  };

  //component Did mount
  useEffect(() => {
    statTimer();
    // return () => {
    //   clearInterval(interval.current);
    // };
  });

  return (
    <div>
        <section className={classes.timerContainer}>
            <section className="timer">
                <div>
                    <span className="mdi mdi-calendar-clock timer-icon"></span>
                    <h2>Countdown Timer</h2>
                    <p>
                    Countdown to really special date. One you couldor would never
                    imagine !
                    </p>
                </div>

                <div>
                    <section>
                        <p>{timerDays}</p>
                        <p>
                            <small>Days</small>
                        </p>
                        </section>
                        <span>:</span>
                    <section>
                        <p>{timerHours}</p>
                        <p>
                            <small>Hours</small>
                        </p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerMinutes}</p>
                        <p>
                            <small>Minutes</small>
                        </p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerSeconds}</p>
                        <p>
                            <small>Seconds</small>
                        </p>
                    </section>
                </div>
            </section>
      </section>

    </div>
  );
};

export default Timer;

