import { faSearch, faUser } 									from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } 										from '@fortawesome/react-fontawesome'
import Typography 												from '@mui/material/Typography'
import Container 												from '@mui/material/Container'
import Box 														from '@mui/material/Box'
import { Card, CardActionArea, CardContent, CardMedia, Grid } 	from '@mui/material'
import { Col, Input, InputGroup, InputGroupText, Row, Button } 	from 'reactstrap'
import {Howl, Howler} 											from 'howler'
import React, { useEffect, useState } 							from 'react'
import axios 													from 'axios'

import logo 		from '../resource/foxbel-music-icon@2x.png'
import arrow 		from '../resource/arrow.jpg'
import Footer 		from './footer'
import '../styles/navbar.css'

const App = () => {
	const	[music, setMusic]		= useState(null),
			[id, setId]				= useState(''),
			[identify, setIdentify] = useState(''),
			[search, setSearch]		= useState([]),
			[mylist, setMylist] 	= useState([]),
			musicPlay = (url) => {
				const sing = new Howl({
					src: [url, 'sound.mp3']
				})
				Howler.stop()
				sing.play()
				setIdentify(sing)
			},
			searchApi = () => {
				if(search.length > 0){
					axios.request({
						method: 'GET',
						url: process.env.REACT_APP_API,
						params: {q: search},
						headers: {
							'X-RapidAPI-Host': process.env.REACT_APP_HOST,
							'X-RapidAPI-Key': process.env.REACT_APP_KEY
						}
					}).then((response) => {
						setMylist(response.data.data)
					}).catch(() => {
						setMylist([])
					})
				}
			}

	useEffect(() => {
		search.length > 0 ? (
			axios.request({
				method: 'GET',
				url: process.env.REACT_APP_API,
				params: {q: search},
				headers: {
					'X-RapidAPI-Host': process.env.REACT_APP_HOST,
					'X-RapidAPI-Key': process.env.REACT_APP_KEY
				}
			}).then((response) => {
				setMylist(response.data.data)
			}).catch(() => {
				setMylist([])
			})
		) : setMylist([])
	}, [search])

	return(
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
				>
					<div id="viewport">
						<div id="sidebar" style={{zIndex: -99}}>
							<header style={{margin: '30px'}}>
								<img src={logo} alt="logo" width={60}/>
								<span style={{color : "#e45e5e"}}>Foxbel Music</span>
							</header>
							<Container>						
								<Row xs="1" style={{color: 'white'}}>
									<Col>
										<h4>Mi Libreria</h4>
									</Col>
									<Col>
										<span>Artistas</span>
									</Col>
									<Col>
										<span>Album</span>
									</Col>
									<Col>
										<span>Canciones</span>
									</Col>
									<Col>
										<span>Estaciones</span>
									</Col>
								</Row>
								<br/>
								<Row xs="1" style={{color: 'white'}}>
									<Col>
										<h4>Playlist</h4>
									</Col>
									<Col>
										<span>Metal</span>
									</Col>
									<Col>
										<span>Para bailar</span>
									</Col>
									<Col>
										<span>Rock 90s</span>
									</Col>
									<Col>
										<span>Baladas</span>
									</Col>
								</Row>
							</Container>
						</div>
					</div>
					<div id="viewport">
						<div id="content">
						<Container style={{marginTop: '50px'}}>
							<Row xs="2">
								<Col>
								<InputGroup>
									<Input
										type="search" style={{borderRadius: '50px 0px 0px 50px'}}
										placeholder="Buscar"
										onChange={(e) => setSearch(e.target.value)}
									/>
									<InputGroupText style={{borderRadius: '0px 50px 50px 0px', background: 'white' }}>
										<FontAwesomeIcon icon={ faSearch } style={{fontSize: '20px', color: 'gray', cursor: 'pointer'}} onClick={() => searchApi()}/>
									</InputGroupText>
								</InputGroup>
									
								</Col>
								<Col style={{textAlign: 'right'}}>
									<FontAwesomeIcon icon={ faUser } style={{fontSize: '16px', color: '#e96a6a'}} /> &nbsp;
									<span>Carlos A.</span>
								</Col>
							</Row>
						</Container>
							<Container component="main" sx={{ mt: 4, mb: 12 }}>
								{
									mylist.length > 0 ?(
										<Row>
											<Col md={3} style={{paddingRight: 0}}>
												<img
													alt={mylist.length > 0 ? mylist[0].title : ''}
													src={mylist.length > 0 ? mylist[0].artist.picture : ''}
													width="100%"
													height="100%"
												/>
											</Col>
											<Col md={9} style={{background: '#c38989', border: 'none', borderRadius: '5px',}}>
												<div style={{margin: '4%'}}>
													<Col>
														<strong style={{fontSize: '30px', color: '#fff'}}>{mylist.length > 0 ? mylist[0].title : ''}</strong>
													</Col>
													<Col>
														<span style={{fontSize: '15px', color: '#fff'}}>Lo Mejor de {mylist.length > 0 ? mylist[0].artist.name : ''}</span> &nbsp;&nbsp; 
														<label style={{ fontSize: '14px', color: '#773636'}}>{mylist.length > 0 ? mylist[0].rank : ''} Seguidores</label>
													</Col>
													<Col>
														<span style={{fontSize: '13px', color: '#fff'}}>{mylist.length > 0 ? mylist[0].album.title : ''}</span>
													</Col>
													<Col style={{marginTop: '30px'}}>
														<Button style={{background: '#e86060', border: 'none', borderRadius: '50px'}} onClick={() => musicPlay(mylist[0].preview)}>Reproducir</Button>
													</Col>
												</div>
											</Col>
										</Row>
									) : (<></>)
								}
								<br/>
								{
									mylist.length <= 0 ? (
										<>
											<Row>
												<Col md={3}>
													<h5>Busque su Canción Favorita</h5>	
												</Col>
												<Col md={2} style={{marginTop: '-30px'}}>
													<img
														alt={'arrow'}
														src={arrow}
														width="50px"
														height="60px"
													/>
												</Col>
											</Row>
										</>
									) : (<h3 style={{color: '#e86060'}}>Resultados</h3>)
								}
								<Grid container spacing={5}>
									{
										mylist.map((o, k) => {
											return(
												<Grid item xs={3}  key={k}>
													<Card sx={{ maxWidth: 200 }}>
														<CardActionArea>
															<CardMedia
																component="img"
																image={o.artist.picture}
																alt="green iguana"
																onClick={() => {musicPlay(o.preview); setMusic(o); setId(k)}}
															/>
															<CardContent>
															<Typography gutterBottom component="div" variant="body2">
																{(o.title.length > 25 ? (o.title).substring(0,20) + '...' : o.title)}
															</Typography>
															<Typography variant="body2" color="text.secondary">
																{o.artist.name}
															</Typography>
															</CardContent>
														</CardActionArea>
													</Card>
												</Grid>
											)
										})
									}
								</Grid>
							</Container>
						</div>
					</div>					
				<Footer music={music} mylist={mylist} setMusic={setMusic} id={id} setId={setId} setIdentify={setIdentify} identify={identify}/>
			</Box>
		</>
  	)
}

export default App
