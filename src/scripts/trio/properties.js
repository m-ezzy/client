class Trio extends Common {
	constructor(number, name) {
		super(number, name)

        this.bari
		this.tm
		this.bm
	}
	initialize() {
		super.initialize()

		this.tm = this.element.getElementsByClassName('text message')[0]
		this.bm = this.element.getElementsByClassName('button message')[0]
        this.bari = this.element.getElementsByClassName('bar info')[0]
	}
}
