import { checkUserAuth } from "../utils/utils.js";
import { server } from '../kernel.js';

console.log('security.middleware.ts is running')

server.use('/*', async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send('Auth Failed');
        return
    }
    const basic_encoded = req.headers.authorization.replace('Basic ', '');
    const buffer = Buffer.from(basic_encoded, 'base64');
    const [login, password] = buffer.toString().split(':');
    if (await checkUserAuth(login, password)) {
        next()
    } else {
        res.status(401).send('Auth Failed');
        return
    }
})
