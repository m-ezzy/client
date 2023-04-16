import Header from './Header'
import MediaList from './MediaList'
import Sender from './Sender'

export default function ConversationBar({setInfoBarState}) {
	return (
		<div className="bar conversation">
			<Header setInfoBarState={setInfoBarState} />
			<MediaList />
			<Sender />
		</div>
	)
}
