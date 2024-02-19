import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";

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
const numeroCandidatoStyle = {
    border: 1,
    borderRadius: 0,
    padding: 0.5,
    width: "30px",
    height: "30px",
    textAlign: "center"
}
export default function Urna() {
    return (
       
        <Box maxWidth={"sm"} padding={2} bgcolor={"#dad3c3"} borderRadius={1} >
             
            <Box bgcolor={"#e1e1e1"} padding={1} display={"flex"} justifyContent={"space-between"}>
                <Box  sx={{color:"black"}}>
                    <Typography variant={"body1"} gutterBottom>SEU VOTO PARA</Typography>
                    <Typography variant={"h5"} marginLeft={3} gutterBottom>PRESIDENTE</Typography>
                    <Box display={"flex"}>
                        <Typography variant={"body1"} marginRight={5} gutterBottom >
                            Número:
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={ numeroCandidatoStyle}>
                                1
                            </Box>
                            <Box sx={numeroCandidatoStyle}>2</Box>
                        </Box>
                    </Box>
                    <Typography variant={"body1"} gutterBottom>Nome do candidato: Oswaldo da silva</Typography>
                    <Typography variant={"body1"} gutterBottom>Partido: PSL</Typography>
                </Box>
                <Box>
                    <Avatar variant="square"  sx={{ width: 50, height: 50 }} />
                </Box>
            </Box>
            <Box sx={{borderRadius:"0px 0px 10px 10px"}} bgcolor={"#313336"}>
                <Grid justifyContent={"center"} padding={3} container gap={2} columns={16}>

                    <Grid item xs={4}>
                        <Button fullWidth sx={buttonStyle}>1</Button>

                    </Grid>

                    <Grid item xs={4}>

                        <Button fullWidth sx={buttonStyle}>2</Button>
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
