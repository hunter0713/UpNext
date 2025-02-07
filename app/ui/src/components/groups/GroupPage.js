import React, { Component } from 'react';
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from '../common/useForm'
import { DialogForm } from '../common/DialogForm'
import { useLocation } from "react-router-dom";
import { FormControl,Tooltip, InputLabel,Box,List, Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Typography, Input,CardMedia,CardContent, FormHelperText, TextField, Tabs, Tab, Card, CardHeader, Avatar,IconButton,CardActions,FavoriteButton,Collapse} from '@material-ui/core';
import {MoreVertIcon} from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
var owner = true;
var events = [["Hunter","Event Name","location","time","ImgLocation(Optional)","This is the description of the event and will be how people descibe the events themselves."]];
const useStyles = makeStyles((theme) => ({
	          root: {
			display: 'flex',
			flexDirection: 'row',	
			flexWrap: 'wrap',

	          },
	          paper: {
			 textAlign: 'center',
			 marginTop: 8,
			 position: 'relative',
			 minWidth: 50,
			 minHeight: 50,
			 width: 'max-content',
			 color: 'white',
			 height: '40%',
			 backgroundColor: '#3CB371',
		  },
	          groupNames: {
			      position: 'absolute',
			      top: '50%',
			      left: '50%',
			      transform: 'translate(-50%, -50%)',
			      backgroundColor: 'transparent',
		 },
	         messageBoard: {
			       backgroundColor: 'gray',
			       display: 'flex',
			       color: 'black',
			       height: 400,
			       position: 'relative',
			       flexDirection: 'column',
			       justifyContent: 'flex-end',
			      overflow: 'auto',
		},
		messageForm: {
			     display: 'flex',
			     alignItems:'stretch' ,
			     backgroundColor: '#3CB371',
			     fontSize: 'xx-large',
			     flexDirection: 'column',
			    
			     

		},
		message: {
			backgroundColor: 'white',
			marginTop: 8,
			marginBottom: 8,
			minHeight: 50,
			color: 'black',
			marginLeft: 8,
			marginRight: 8,
	        },
		messageText: {
		        
			marginLeft: 16,
		},
		card: {
		width: 345,
		marginBottom: 16,
		marginRight: 16,
		marginLeft: 16,
		marginTop: 16,
		},
		avatar: {
		backgroundColor: 'red',
		},
		eventBoard: {
		 
			                               display: 'flex',
			                               color: 'black',                         
			                               position: 'relative',
			                               flexDirection: 'row',
						       flexWrap: 'wrap',
						      
		},
		createPostButton: {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
				marginTop: 16,
		},
}));
function TabPanel(props) {
	  const { children, value, index, ...other } = props;

	  return (
		      <div
		        role="tabpanel"
		        hidden={value !== index}
		        id={`wrapped-tabpanel-${index}`}
		        aria-labelledby={`wrapped-tab-${index}`}
		        {...other}
		      >
		        {value === index && (
				        <Box p={3}>
				          <Typography>{children}</Typography>
				        </Box>
				      )}
		      </div>
		    );
}
export default function GroupPage(props) {
	const location = useLocation();
	const [eventWindow, setEventWindow] = useState(false);
	const [infoWindow, setInfoWindow] = useState(false);
	const [value, setValue] = useState('one');
	const name = location.state.detail;
	function changeBackground(e) {
           e.target.style.opacity = '0.5';
	}
	function changeBack(e){
          e.target.style.opacity = '1';
	}
	  const handleChange = (event, newValue) => {
		      setValue(newValue);
		    };
	const history = useHistory();
	const goBack = () => history.push('groups');
	        const classes = useStyles()
	        return (
			        <div>
			          <div>
			            <Paper onClick={goBack}onMouseOver={changeBackground} onMouseOut={changeBack} className={classes.paper}>
			               <div className={classes.groupNames}> Back </div>
			            </Paper>
			         </div>
				<div className={classes.root}>
				  <h1>{name}</h1>
				<Tooltip title="group description" placement="bottom">
				<IconButton onClick={() => { setInfoWindow(true); }}>
			          <InfoIcon />
			        </IconButton>
				</Tooltip>
			       </div>
				<Dialog open={infoWindow} onClose={() => { setInfoWindow(false); }} aria-labelledby="form-dialog-title">
			                                        <DialogTitle id="form-dialog-title">{name}</DialogTitle>
			                                        <DialogContent>
			                                          <DialogContentText>
									This is a description of the group including what they do and possibly when they meet if they have weekly meetings
			                                          </DialogContentText>
			                                        </DialogContent>
								<DialogActions>
			                                          <Button onClick={() => { setInfoWindow(false); }} color="primary">
			                                            Close
			                                          </Button>
			                                        </DialogActions>
			                                      </Dialog>
			<div className={classes.eventBoard}>
				{events.map(eventt => (
					                                        
				<Card className={classes.card}>
			      <CardHeader
			        avatar={
					          <Avatar className={classes.avatar}>
						{eventt[0][0]}
					          </Avatar>
					        }
			        title={eventt[1]}
			        subheader={eventt[3]}
			      />
			
			      <CardContent>
			        <Typography display='block' variant="subtitle1" color="textSecondary" component="p">
			         	Location: {eventt[2]}
					
			        </Typography>
				<Typography display='block' variant="subtitle1" color="textPrimary" component="p">
					{eventt[5]}
				</Typography>
			      </CardContent>
				</Card>
				))}
			</div>
			{owner == true ? (
				         <div className={classes.createPostButton}>
				         	<Button variant="outlined" color="#3CB371" onClick={() => { setEventWindow(true); }}>
				                	Create Event
				                </Button>
						<Dialog open={eventWindow} onClose={() => { setEventWindow(false); }} aria-labelledby="form-dialog-title">
				        <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
				        <DialogContent>
				          <DialogContentText>
				         
				          </DialogContentText>
				          <TextField
				            autoFocus
				            margin="dense"
				            id="eventName"
				            label="Event Name"
				            type="email"
				            fullWidth
				          />
					  <TextField
				            autoFocus
				            margin="dense"
				            id="eventName"
				            label="Event Location"
				            type="email"
				            fullWidth
				                                          />
					  <TextField
					  autoFocus
				   	   id="datetime-local"
					   margin="dense"
				    	   label="Event Time"
				           type="datetime-local"
				    	   defaultValue="2021-01-24T10:30"
				    	  
				    	   InputLabelProps={{
					          shrink: true,
						        }}
					  fullWidth
				 	  />
					<TextField
				          id="filled-multiline-static"
				          label="Event Description"
				          multiline
				          rows={4}
					  margin = "dense" 
				          variant="filled"
					  fullWidth
					  autoFocus
				        />
				        </DialogContent>
				        <DialogActions>
				          <Button onClick={() => { setEventWindow(false); }} color="primary">
				            Cancel
				          </Button>
				          <Button onClick={() => { setEventWindow(false); }} color="primary">
				            Post
				          </Button>
				        </DialogActions>
				      </Dialog>
				        </div>
				                                  ) : null}
			
				</div>
		      );

}
