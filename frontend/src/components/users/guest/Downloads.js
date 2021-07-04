import React, { Component } from 'react'
import {
    Grid, Typography, Card, CardContent, Button,Snackbar, CardMedia, Tooltip,
}
from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import { attachmentURL } from '../../../utils/Constants';

const styles = theme =>({

    detailsCard:{
        margin: 10,
        padding: 20,
        backgroundColor: '#FBFBFB',
    },
    detailsRow:{
        marginBottom: 10,
    }

});

const initialState = {

    loading: false,
    conference: {},
    message: '',
    variant: '',
    id:'',
    materials: [],
    snackbar: false,

};
class Downloads extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.openAttachment = this.openAttachment.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);

    }

    closeSnackBar = (event, response) => {
        this.setState({
            snackbar: false,
        })
    }
    
    openAttachment(attachment){
        window.open(attachmentURL+attachment , '_blank');
    }

    async componentDidMount(){

        var conferenceOne;
        var messageRes = '';
        var variantRes = '';
        var materialsArr = [];
        var cID = null;
        var snackbarRes = true;

        //get data from db
        await axios.get('/api/conferences/active')
        .then(res => {
            // console.log(res);
            if(res.data.conference != null){
                if(res.data.success){
                    snackbarRes = false;
                    conferenceOne = res.data.conference;
                    cID = conferenceOne._id;
                }
                else{
                    messageRes = res.data.message;
                    variantRes = "error";
                }
            }
            else{
                messageRes = res.data.message;
                variantRes = "error";
            }
        })
        .catch(error => {
            console.log("Error:",error)
            variantRes = "error";
            messageRes = "Error";
        })

        if(cID != null){
            //get materials from db
            await axios.get('/api/materials/conference/'+cID)
            .then(res => {
                console.log(res);
                if(res.data.materials != null){
                    if(res.data.success){
                        snackbarRes = false;
                        materialsArr = res.data.materials;
                    }
                    else{
                        messageRes = res.data.message;
                        variantRes = "error";
                    }
                }
                else{
                    messageRes = res.data.message;
                    variantRes = "error";
                }
            })
            .catch(error => {
                console.log("Error:",error)
                variantRes = "error";
                messageRes = "Error";
            })
        }

        this.setState({
            message: messageRes,
            conference: conferenceOne,
            variant: variantRes,
            snackbar: snackbarRes,
            id: cID,
            materials: materialsArr,
        })

        // console.log(this.state);

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Grid container alignItems="center" justify="center" direction="column">

                    { this.state.conference ? 
                    <Grid item xs={12} md={12}>
                        <Card className={classes.detailsCard}>
                            <CardContent>
                                <Typography variant="h4" >CONFERENCE :
                                    {( this.state.conference.title+ "").toUpperCase() }</Typography>
                                
                                <div>
                                    <hr />
                                    <Typography variant="h5" className={classes.detailsRow}>
                                        <b>Materials</b>
                                    </Typography>

                                    { 
                                        this.state.materials.length > 0 ?

                                        this.state.materials.map(item => (
                                            
                                            <Card className="my-2" key={item._id}>
                                                <CardContent>
                                                    <Typography variant="h5" className="text-center">
                                                        <b>Type: {item.type}</b>
                                                    </Typography>

                                                    <Typography variant="h6">
                                                        Description: {item.description}
                                                    </Typography>

                                                    <br />
                                                    <Tooltip title="Click To View" arrow>
                                                        <CardMedia
                                                            component="img"
                                                            image={"/images/fileIcon1.png"}
                                                            style={{ height: '100px' , width: '100px'}}
                                                            onClick={ () => this.openAttachment(item.attachment) }
                                                        />
                                                    </Tooltip>

                                                </CardContent>
                                            </Card>
                                        ))

                                        :
                                        <Alert severity="info">
                                            <b>No Materials Found</b>
                                        </Alert>
                                    }


                                </div>
                            </CardContent>                            
                        </Card>
                    </Grid>
                    :
                    <Grid item xs={12} md={12}>
                        <Alert severity="Error">No Active conferences. Please Active a conference.</Alert>
                    </Grid>
                    }
                    
                    { this.state.message != '' &&
                        <Snackbar open={this.state.snackbar}  autoHideDuration={2500} onClose={this.closeSnackBar} name="snackBar">
                            <Alert severity={this.state.variant} onClose={this.closeSnackBar} >{this.state.message}</Alert>
                        </Snackbar>
                    }

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Downloads);

