import { Divider, Avatar, Grid, Paper } from "@mui/material";


function CommentContainer({c}){
    const {content, image, username} = c

    return(
        <div style={{padding: 14}}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="{username}" src={image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>@{username}</h4>
              <p style={{ textAlign: "left" }}>
                {content}
              </p>
            </Grid>
          </Grid>
        </div>
    )
}

export default CommentContainer

// {content}
// {image}