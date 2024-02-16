import HomeIcon from '@mui/icons-material/Home'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoginIcon from '@mui/icons-material/Login';
import BadgeIcon from '@mui/icons-material/Badge';
import Administracao from '../routes/Administracao';
import Home from '../routes/Home';
import Login from '../routes/Login';
import Resultados from '../routes/Resultados';
import CarteiraVirtual from '../routes/CarteiraVirtual';
import RegistrarCidadania from '../routes/RegistrarCidadania';
import Votar from '../routes/Votar';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

export const PAGINAS = [
    {
        nome: "Home",
        icone: <HomeIcon/>,
        rota: "/",
        componente: <Home/>
    },
    {
        nome: "Votar",
        icone: <HowToVoteIcon/>,
        rota: "/votar",
        componente: <Votar/>
    },
    
    {
        nome: "Resultados",
        icone: <BarChartIcon/>,
        rota: "/resultados",
        componente: <Resultados/>
    },
    {
        nome: "Resgistrar Cidadania",
        icone: <AccountBalanceIcon/>,
        rota: "/registrar-cidadania",
        componente: <RegistrarCidadania/>
    },
    {
        nome: "Login",
        icone: <LoginIcon/>,
        rota: "/login",
        componente: <Login/>
    },
    {
        nome: "Administração",
        icone: <AdminPanelSettingsIcon/>,
        rota: "/admin",
        componente: <Administracao/>
    },
    {
        nome:"Carteira Virtual",
        icone: <BadgeIcon/>,
        rota: "/carteira",
        componente: <CarteiraVirtual/>
    }
]