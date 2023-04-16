class Groups extends Duo {
    constructor(number, name) {
        super(number, name);

        this.fpp
        this.tgn
        this.tt

        this.bedit
	    this.bsubmit
	    this.bcancel

        this.tam
        this.bam
        this.lmem
    }
    initialize() {
        super.initialize()

        this.fpp = this.element.getElementsByClassName('file_pp')[0]
        this.tgn = this.element.getElementsByClassName('group_name')[0]
        this.tt = this.element.getElementsByClassName('title')[0]

        this.bedit = this.element.getElementsByClassName('button edit')[0]
	    this.bsubmit = this.element.getElementsByClassName('button submit')[0]
	    this.bcancel = this.element.getElementsByClassName('button cancel')[0]

        this.tam = this.element.getElementsByClassName('text add_member')[0]
	    this.bam = this.element.getElementsByClassName('button add_member')[0]
		this.lmem = this.element.getElementsByClassName('list member')[0]
    }
}
