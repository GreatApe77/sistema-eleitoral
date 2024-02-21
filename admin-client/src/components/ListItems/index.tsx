import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
interface Item {
  name: string;
  icon: React.ReactElement;

}
const items:Item[] =[
  {name:"Dashboard",icon:<DashboardIcon/>},
  {name:"Orders",icon:<ShoppingCartIcon/>},
  {name:"Customers",icon:<PeopleIcon/>},
  {name:"Reports",icon:<BarChartIcon/>},
  {name:"Integrations",icon:<LayersIcon/>},
  {name:"Criar Eleição",icon:<AccountBalanceIcon/>}
]
interface ListItemsProps {
  value?: number;
  updateValue: (value:number)=>void;
}
export function ListItems({value,updateValue}:ListItemsProps){

  return (
    <>
      {items.map((item,index)=>{
         return (
          <ListItemButton key={index} selected={value===index} onClick={()=>{updateValue(index)}}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
         )
      })}
    
    </>
  )
  
}

