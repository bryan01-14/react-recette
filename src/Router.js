import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Principal from './page/Principal'
import Connexion from '../src/componants/Connexion'
import NotFound from '../src/componants/NotFound'
import './App.css';
import Accueil from './componants/Accueil'


export default function Router() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Connexion/>}/>
          <Route path='/pseudo/:pseudo' element={<Accueil/>}/>
          <Route element={<Principal/>}/>
          <Route path="*" element={<NotFound />} />
       </Routes>
    </BrowserRouter>
  )
}
