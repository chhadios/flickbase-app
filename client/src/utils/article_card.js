import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {
 Card,
 CardMedia,
 CardContent,
 CardActions,
 IconButton,
 Typography,
 Button
} from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ArticleCard =({article})=>{

    return(
        <Card>
            <CardMedia
                style={{height:0,paddingTop:'56.25%'}}
                image="http://picsum.photos/200"
                title="some title"
            />
            <CardContent>
                <Typography variant="h5">
                    {article.title}
                </Typography>
                <Typography variant="body2" component="p">
                {article.excerpt}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <Button size="small" color="primary" component={RouterLink} to={`/article/${article._id}`}>
                    view article
                </Button>
            </CardActions>
        </Card>
    )

}
export default ArticleCard