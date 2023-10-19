import { app } from './app'
import { server } from './config'

app.listen(server.port , () => {
    console.log('server is on port '+server.port);
})