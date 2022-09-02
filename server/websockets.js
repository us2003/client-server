const ws = require( 'ws' );

const wss = new ws.Server( {
    port: 5000,
}, () => console.log( `Server started on port 5000` ) );

wss.on( 'connection', ( ws ) => {
    let user;
    ws.on( "message", ( data ) => {
        const msg = JSON.parse( data );
        console.log( msg );
        switch ( msg.type ) {
            case 'connection':
                user = msg.username;
                {
                    const message = {
                        id: Date.now(),
                        type: 'connection',
                        time: new Date().toTimeString().split( ' ' )[0],
                        user
                    };
                    broadcastMessage( message );
                }
                break;

            case 'message':
                {
                    const message = {
                        id: Date.now(),
                        type: 'message',
                        from: user,
                        time: new Date().toTimeString().split( ' ' )[0],
                        text: msg.text
                    };
                    broadcastMessage( message );
                }
                break;

            default:
                console.log( `Unknown message type: ${msg.type}` );
                break;
        }
    } );
} );

const broadcastMessage = ( message ) => {
    wss.clients.forEach( socket => {
        socket.send( JSON.stringify( message ) );
    } );
};