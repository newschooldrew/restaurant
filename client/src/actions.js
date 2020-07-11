import axios from 'axios'
import {CREATE_USER} from './types'

export const createUser = async user => {
    const res = await axios.post('/create-user',user)
}