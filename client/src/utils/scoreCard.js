import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@material-ui/core';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

const ScoreCard = ({ current }) => {

    return (
        <List className="scorecard">
            {/* score */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar><StarIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Our score" secondary={current.score} className="rating" />
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* actors */}

            <ListItem>
                <ListItemAvatar>
                    <Avatar><PersonIcon /></Avatar>
                </ListItemAvatar>
                <div>
                    {current.actors.map((item, index) => (
                        <Chip
                            Key={`${index + item}`}
                            item={item}
                            label={item}
                            clickable
                            color="primary"
                            className="chip"
                        />
                    ))
                    }
                </div>
            </ListItem>
            <Divider variant="inset" component="li" />

            {/* directors */}

            <ListItem>
                <ListItemAvatar>
                    <Avatar><MovieIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Director" secondary={current.director} />
            </ListItem>
            <Divider variant="inset" component="li" />

        </List>
    )
}
export default ScoreCard;