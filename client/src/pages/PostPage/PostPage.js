import React, {useEffect, lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import Posts from '../../components/Posts/Posts'
const IndividualPostContainer = lazy(() => import('../../components/IndividualPost/IndividualPostContainer'))

const PostPage = ({match}) => {
    return (
        <div>
            <Suspense fallback={<div>Page is Loading</div>}>
                <Route exact path={`${match.path}`} component={Posts}/>
                <Route path={`${match.path}/:postId`} component={IndividualPostContainer} />
            </Suspense>
        </div>
    )
}

export default PostPage
