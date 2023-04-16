import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAction } from './assistant/commands'

export default () => {
	const [listening, setListening] = useState(false)
	const [result, setResult] = useState('')

	const recognition = useRef()
	const rippleRef = useRef()
	const resultRef = useRef()

	const navigate = useNavigate()

	// needs internet for speech recognition
	useEffect(() => {
		/********** speech synthesis **********/
		const synth = window.speechSynthesis
		// const voices = synth.getVoices()
		const utterThis = new SpeechSynthesisUtterance()
    // utterThis.voice = voices[0]
		// utterThis.pitch = 1
  	// utterThis.rate = 1



		/********** speech recognition **********/
		const grammar = "#JSGF V1.0; grammar colors; public <color> = hello | hi | send message | stop listening ;"

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
		const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

		recognition.current = new SpeechRecognition()
		const speechRecognitionList = new SpeechGrammarList()

		speechRecognitionList.addFromString(grammar, 1)

		recognition.current.grammars = speechRecognitionList
		recognition.current.continuous = false
		recognition.current.lang = "en-US"
		recognition.current.interimResults = false
		recognition.current.maxAlternatives = 1

		// speech recognition service started
		recognition.current.onstart = (event) => {
			console.log(1, event)
		}
		recognition.current.onend = (event) => {
			console.log(2, event)
		}
		// listening to any audio started
		recognition.current.onaudiostart = (event) => {
			console.log(3, event)
		}
		recognition.current.onaudioend = (event) => {
			console.log(4, event)
		}
		// listening to any sound started
		recognition.current.onsoundstart = (event) => {
			console.log(5, event)
		}
		recognition.current.onsoundend = (event) => {
			console.log(6, event)
		}
		// listening to any speech by human started
		recognition.current.onspeechstart = (event) => {
			console.log(7, event)
		}
		recognition.current.onspeechend = (event) => {
			console.log(8, event)
			stopListening()
		}

		recognition.current.onnomatch = (event) => {
			console.log(9, event)
			setResult(prev => 'no match found. try again')
		}
		recognition.current.onerror = (event) => {
			console.log(10, 'Error occurred in recognition: ', event.error)
		}

		recognition.current.onresult = (event) => {
			console.log(11, event)

			resultRef.current.classList.remove('hidden')

			let result1 = ''
			// iterate through speech recognition results
		  for (const result of event.results[0]) {
  			// Print the transcription to result tag
    		result1 += (result.transcript + ' ')
  		}
			// result1 += (' | ' + event.results[0][0].transcript)

			setListening(prev => false)
			setResult(prev => result1)

			let command = event.results[0][0].transcript

			let action = getAction(command.slice(0, 9))
			action({menu: command.slice(10, command.length - 1), utterThis: utterThis, synth: synth, navigate: navigate})

			/*
			if (command.slice(0, 9) == 'Open menu') {
				utterThis.text = 'opening menu...'
				synth.speak(utterThis)

				navigate('/' + command.slice(10, command.length - 1))
			} else if (command == 'Close.') {
				resultRef.current.classList.add('hidden')
			} else if (command.slice(0, 15) == 'Send message to') {
				console.log(command)
			}*/
		}
		// return () => {recognition = null}
	}, [])

	function startListening() {
		rippleRef.current.style.animationPlayState = 'running'
		recognition.current.start()
		setListening(prev => true)
	}
	function stopListening() {
		console.log(rippleRef.current.style)
		rippleRef.current.style.scale = 1 // not working. can't tell why

		rippleRef.current.style.animationPlayState = 'paused'
		recognition.current.stop()
		setListening(prev => false)
	}
	function handleClick(e) {
		listening ? stopListening() : startListening()
	}
	/*function handleClick(e) {
		if(listening) {
			rippleRef.current.style.animationPlayState = 'paused'
			recognition.current.stop()
		} else {
			rippleRef.current.style.animationPlayState = 'running'
			recognition.current.start()
		}
		setListening(prev => !prev)
	}*/
	return (
		<div className='assistant'>
			<button onClick={handleClick}>assistant</button>
			<div className='ripple' ref={rippleRef}></div>
			<div className='hidden' ref={resultRef}>{result}</div>
		</div>
	)
}
