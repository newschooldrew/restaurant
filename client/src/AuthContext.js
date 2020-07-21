import {createContext} from 'react'
export const AuthContext = createContext({
    username:'',
    posts:null,
    allPosts:null,
    latestComment:'',
    allComments:null,
    newComment:null,
    hasUpdatedPost:null
})
export default AuthContext;