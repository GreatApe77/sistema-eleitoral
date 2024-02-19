import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

const buttonStyle = {
    bgcolor: "black",
    color: "white",
    ":hover": {
        bgcolor: "black"
    }

}
const confirmaBtnStyle = {
    bgcolor: "green",
    color: "white",
    ":hover": {
        bgcolor: "green"
    }

}
const corrigirBtnStyle = {
    bgcolor: "red",
    color: "white",
    ":hover": {
        bgcolor: "red"
    }

}
const brancoBtnStyle = {
    bgcolor: "white",
    color: "black",
    ":hover": {
        bgcolor: "white"
    }

}
const tecaldoContainerStyle = {
    
}
export default function Urna() {
    return (
        <Box maxWidth={"sm"}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                    <Typography variant={"h6"}>SEU VOTO PARA</Typography>
                    <Typography variant={"h6"} textAlign={"center"}>PRESIDENTE</Typography>
                    <Box display={"flex"}>
                    <Typography variant={"h6"} marginRight={5} >
                        Número: 
                    </Typography>
                    <Box sx={{display:"flex"}}>
                            <Box sx={{border: 1 ,borderRadius: 0, padding: 0.5,width:"30px",height:"30px",textAlign:"center"}}>
                                1
                            </Box>
                            <Box sx={{border: 1 ,borderRadius: 0, padding: 0.5,width:"30px",height:"30px", textAlign:"center"}}>2</Box>
                        </Box>
                    </Box>
                    
                </Box>
                <Box>
                    <Avatar/>
                </Box>
            </Box>
            <Box sx={{borderRadius:4}} bgcolor={"#313336"}>
                <Grid justifyContent={"center"} padding={3} container gap={2} columns={16}>

                    <Grid item  xs={4}>
                        <Button fullWidth sx={buttonStyle}>1</Button>

                    </Grid>

                    <Grid item  xs={4}>

                        <Button fullWidth sx={buttonStyle}>2</Button>
                    </Grid>
                    <Grid item  xs={4}>

                        <Button fullWidth sx={buttonStyle}>3</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>3</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>3</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>3</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>3</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>3</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>3</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>0</Button>

                    </Grid>







                </Grid >
                <Grid justifyContent={"center"} padding={2} container gap={2} columns={16}>
                    <Grid item xs={4}>
                    
                    <Button fullWidth sx={brancoBtnStyle}>Branco</Button>
                    </Grid>
                    <Grid item xs={4}>
                    <Button fullWidth sx={corrigirBtnStyle}>Corrige</Button>
                    </Grid>
                    <Grid item xs={4}>
                    <Button fullWidth sx={confirmaBtnStyle}>Confirma</Button> 
                    </Grid>
                </Grid>
                
            </Box>
        </Box>
    )
}
