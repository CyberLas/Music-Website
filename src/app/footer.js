import { faBackwardStep, faCirclePlay, faForwardStep, faPauseCircle, faVolumeMute, faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } 											from '@fortawesome/react-fontawesome'
import { Slider }													from '@mui/material'
import { Col, Row } 												from 'reactstrap'
import { Howl, Howler }												from 'howler'
import React, { useEffect, useState } 														from 'react'

const Footer = ({music, mylist, setMusic, id, setId, setIdentify, identify}) => {
	const 	[mute, setMute] = useState(false),
			[pause, setPause] = useState(false),
			onpress = (option) => {
				switch(option){
					case 0:
						if(id !== 0){
							setMusic(mylist[id - 1])
							const sing = new Howl({
								src: [mylist[id - 1].preview, 'sound.mp3']
							})
							setId(id - 1)
							Howler.stop()
							sing.play()
							setIdentify(sing)
						}
					break;
					case 1:
						setPause(!pause)
						if(!pause === true){
							identify.pause()
						}else{
							identify.play()
						}
					break;
					case 2:
						{
							setMusic(mylist[id + 1])
							const sing = new Howl({
								src: [mylist[id + 1].preview, 'sound.mp3']
							})
							setId(id + 1)
							Howler.stop()
							sing.play()
							setIdentify(sing)
						}
					break;
					default:
						break;
				}
			}
	useEffect(()=>{
		if(mute){
			Howler.volume(0)
		}else{
			Howler.volume(0.7)
		}
	}, [mute])
	return(
		<>
			<footer style={{position: 'fixed', bottom: 0, width: '100%', left:0, background: '#eb5757'}}>
				<Row style={{color: 'white'}}>
					<Col md={1}>
						{
							music ? (
								<img
									alt={music ? music.title : ''}
									src={music ? music.artist.picture : ''}
									width="100%"
									height="100px"
								/>
							):(<></>)
						}
					</Col>
					<Col md={4}>
						<div style={{margin: '4%'}}>
							<strong style={{fontSize: '13px'}}>{music ? music.title : ''}</strong>
							<br/>
							<span style={{fontSize: '13px'}}>{music ? music.artist.name : ''} - {music ? music.album.title : ''}</span>
						</div>
					</Col>
					<Col md={1}>
						<div style={{margin: '20%'}}>
							<FontAwesomeIcon icon={ faBackwardStep } style={{fontSize: '40px', color: 'white'}} onClick={() => onpress(0) }/>
						</div>
					</Col>
					<Col md={1}>
						<div style={{margin: '20%'}}>
							<FontAwesomeIcon icon={ pause ? faPauseCircle : faCirclePlay } style={{fontSize: '40px', color: 'white'}} onClick={() => onpress(1) }/>
						</div>
					</Col>
					<Col md={1}>
						<div style={{margin: '20%'}}>
							<FontAwesomeIcon icon={ faForwardStep } style={{fontSize: '40px', color: 'white'}} onClick={() => onpress(2) }/>
						</div>
					</Col>
					<Col md={2}>{''}</Col>
					<Col md={1}>
						<div style={{margin: '20%'}}>
							<Slider defaultValue={100} onChange={(e) => Howler.volume(e.target.value/100)} aria-label="Default" valueLabelDisplay="auto" style={{color: "#fff"}} />
						</div>
					</Col>
					<Col md={1}>
						<div style={{margin: '20%'}}>
							<FontAwesomeIcon icon={ mute ? faVolumeMute : faVolumeOff } onClick={() => setMute(!mute)} style={{fontSize: '30px', color: 'white', cursor: 'pointer'}}/>
							
						</div>
					</Col>
				</Row>
			</footer>
		</>
  	)
}

export default Footer
