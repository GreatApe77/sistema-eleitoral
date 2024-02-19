import { Box, Button, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link as ReactRouterDomLink } from "react-router-dom";

export default function Hero(){
  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 6, flexWrap: "wrap" }}>
      <Box sx={{ maxWidth: 400, flexGrow: 1, marginRight: { xs: 0, sm: 4 } }}>
        <Typography variant="h2" gutterBottom>
          Bem-vindo ao Sistema Eleitoral
        </Typography>
        <Typography variant="h5" gutterBottom>
          Faça parte da democracia digital votando nas decisões importantes.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={ReactRouterDomLink}
              to="/registrar-cidadania"
            >
              Registre-se Como Eleitor
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              component={ReactRouterDomLink}
              to="/login"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CardMedia
        component="img"
        image="/election-bulletin-board.svg"
        alt="Imagem ilustrativa"
        sx={{
          width: { xs: "100%", sm: 300 },
          maxHeight: 400,

          mt: { xs: 4, sm: 0 },
        }}
      />
    </Container>
  );
}
