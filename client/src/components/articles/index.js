import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../../store/actions/article_actions";
import Loader from "../../utils/loader";
import ScoreCard from "../../utils/scoreCard";
import { clearCurrentArticle } from "../../store/actions/index";
const Article = (props) => {

    const { current } = useSelector(state => state.articles);

    const dispatch = useDispatch();

    useEffect(() => {
        /// props.match.params.id
        dispatch(getArticle(props.match.params.id))
    }, [dispatch, props.match.params])

    useEffect(()=>{

        return()=>(
            dispatch(clearCurrentArticle())
        )
    },[dispatch])

    return (
        <>
            {current ?

                <div className="article_container">
                    <div
                        style={{
                            background: `url(http://picsum.photos/1920/1080)`
                        }}
                        className="image"
                    >

                    </div>
                    <h1>{current.title}</h1>
                    <div classname="mt-3 content">
                        <div dangerouslySetInnerHTML={
                            { __html: current.content }
                        }>
                        </div>
                    </div>
                    <ScoreCard current={current}/>
                </div>
                : <Loader/>}

        </>
    )
}

export default Article