import React, { Component, useEffect, useState, useRef } from "react";
import "../../static/Home.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import {
  Typography, Grid, Paper, CardMedia, Card, CardContent, CardActionArea,
} from "@material-ui/core";
import Timer from "./Timer";
import axios from "axios";

const styles = theme =>({
  root: {
      maxWidth: 1500,
      margin: 25,
    },

  media: {
    height: 350,
    width: 320,
  },
  
  
  mainFrame: {
    backgroundImage: "url(/images/ai.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "none",
    color: "#fff",
    width: "100vw",
    height: "120vh",
    /* opacity: 0.8; */
  },

});

const initialState = {

  conference:{},
  dateTime: "",

};
class Home extends Component {

  constructor(props){
    super(props);
    this.state = initialState;
    this.setDateTime = this.setDateTime.bind(this);
  }

  setDateTime(fullDate){
    // console.log(fullDate)

    var arr = fullDate.split('-',3);
    var year = arr[0];
    var month = Number(arr[1]) - 1;
    var date = arr[2];

    const date1 = new Date(Date.UTC(year, month, date));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date2 = date1.toLocaleDateString(undefined, options);

    const fDate = date2  +" 08:00:00";

    // console.log(fDate);

    this.setState({
      dateTime: fDate,
    })

  }

  async componentDidMount(){

    await axios.get('/api/conferences/active')
      .then(res => {
        //console.log(res)

        this.setDateTime(res.data.conference.startDate);
        
        this.setState({
          conference: res.data.conference,
        })
      })
      .catch(error => {
        console.log(error.message)
      })

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
          <section className={classes.mainFrame}>
          <h1 className="main-header">Welcome to ICAF</h1>
          <p className="main-para">
            International Conference on Application Frameworks 2021 (ICAF 2021) is the seventh international conference organized by the SLIIT.ICAF solicits research papers describing significant and innovative research contributions in all disciplines of engineering
          </p>
        </section>

        <section className="about">
          <h3 className="custom_heading">About Our Conference</h3>
          <h2 className="conference-title">
            {this.state.conference.title}
            {/* 17th International Conference on Advancements in AI and Machine
            Learning 2021 */}
          </h2>
          <p className="custom-para1">
            { this.state.conference.description }
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum. Contrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia,
            looked up one of the more obscure Latin words, consectetur, from a
            Lorem Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem Ipsum */}
          </p>
          {/* <p className="custom-para2">
            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
            Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
            This book is a treatise on the theory of ethics, very popular during
            the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </p> */}
        </section>

        {/* Timer */}
        { this.state.dateTime &&
           <Timer confTime={this.state.dateTime}/>
        }

        <section className="KeyNote">
          <h1 className="keynote-header">Key Note Speakers</h1>
          <center>
            <section className="cards">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={"images/person1.jpg"} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Mark Zuckerberg
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Founder Of Facebook ok like readable English. Many desktop
                      publishing packages and web page editors
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={"images/person2.jpg"} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Elon Musk
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Founder of Tesla And SpaceX es, but also the leap into
                      electronic typesetting, remaining essentially unchanged
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={"images/person3.jpg"} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Richard Devidson
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Founder Of Paypal is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </section>
          </center>
        </section>
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default withStyles(styles)(Home);