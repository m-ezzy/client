let menu_bar = new MenuBar()

let calls = new Calls(0, "call")
let chats = new Chats(1, "chat")
let groups = new Groups(2, "group")
let channels = new Channels(3, "channel")
let account = new Account(4, "account")

Content.instances.push(calls, chats, groups, channels, account)

theme.change()

let data = fetchs('account/load', '').then(async (data) => {
    console.log(data)
    me = data.json
    await chats.handle_click_menu()
    // await account.handle_click_menu()
    /*
    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
           binary += String.fromCharCode( bytes[ i ] );
        }
        return binary;
    }

    let blob = new Blob(data.json.profile_picture.data, {'type': 'image/jpg'})
    //let f = blob.toString()
    console.log(blob)

    // const base64String = btoa(String.fromCharCode(...new Uint8Array(me.profile_picture.value)));

    let rrr = me.profile_picture.data.toString('base64')
    console.log(rrr)
    account.element.getElementsByTagName('img')[0].src = 'data:image/jpg;base64, ' + me.p*/
    //let a = new ArrayBuffer(me.profile_picture.value)
    //let b = a.Base64()
})

/*
localStorage.setItem('user_id', data.json.user_id);
sessionStorage.setItem('user_id', data.json.user_id);
console.log(localStorage.getItem('user_id'));
console.log(sessionStorage.getItem('user_id'));
*/
/*
document.body.onload = function() {
    Object.entries(document.getElementsByClassName('button')).forEach(([num, e]) => {
        console.log(e)
        e.style.backgroundImage = ''
    })
}*/
