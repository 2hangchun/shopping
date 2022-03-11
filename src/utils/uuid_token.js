import { v4 as uuidv4 } from 'uuid';

export function getUUID() {
    let uuid_token = localStorage.getItem('uuid_token')
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('uuid_token', uuid_token)
    }
    return uuid_token
}