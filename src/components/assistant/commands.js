let commands = [
	{
		'command': 'Start listening',
		'action': () => {
			startListening()
		}
	},
	{
		'command': 'Stop listening',
		'action': () => {
			stopListening()
		}
	},
	{
		'command': 'Close',
		'action': () => {
			resultRef.current.classList.add('hidden')
		}
	},
	{
		'command': 'Open menu',
		'action': (parameters) => {
			console.log(parameters)
			parameters.utterThis.text = `opening menu ${parameters.menu}`
			parameters.synth.speak(parameters.utterThis)
			parameters.navigate(`/${parameters.menu}`)
		}
	},
	{
		'command': 'Send message',
		'action': () => {
			console.log(command)
		}
	},
]
export function getAction(text) {
	for(let i=0; i<commands.length; i++) {
		if(commands[i].command == text) {
			return commands[i].action
		}
	}
}
/*
(command, parameters) => {
	switch (command) {
		case 'Open menu': {
			return () => {
				utterThis.text = `opening menu ${parameters.menu}`
				synth.speak(utterThis)
				navigate(`/${parameters.menu}`)
			}
		}
		case 'Close': {
			return () => {
				resultRef.current.classList.add('hidden')
			}
		}
		case 'Send message': {
			return () => {
				console.log(command)
			}
		}
	}
}*/
