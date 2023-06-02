import { Divider, Avatar, Grid, Paper, Card, Box } from "@mui/material";
import Typography from '@mui/material/Typography';


function CommentContainer({c}){
    const {content, image, username} = c

    return(
      <Box sx={{ flexWrap: 'wrap', pl:1, pr:1, pb:0.1}}>
      <Card sx={{pl:2,maxWidth: 350, height:70, }}>
        <div style={{padding: 14}}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar alt="{username}" src={image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography  variant = "body2"
              style={{ fontSize:12, margin: 0, textAlign: "left" }}>@{username}
              </Typography>
              <Typography variant = "body1"
             style={{ textAlign: "left" }}>
                {content}
                </Typography>
            </Grid>
          </Grid>
        </div>
      </Card>
      </Box>
    )
}

export default CommentContainer

// {content}
// {image}