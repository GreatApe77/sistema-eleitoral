import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// Define the Candidato interface
export interface Candidato {
  nome: string;
  partido: string;
  fotoDoCandidatoUrl: string;
  quantidadeDeVotos: number;
  numeroDeVotacao: number;
  indice: number;
}

export default function CandidatoCard({ candidato }: { candidato: Candidato })  {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={candidato.nome}
        
        image={candidato.fotoDoCandidatoUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {candidato.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {candidato.partido}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Votos: {candidato.quantidadeDeVotos}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Número: {candidato.numeroDeVotacao}
        </Typography>
      </CardContent>
      
    </Card>
  );
}
