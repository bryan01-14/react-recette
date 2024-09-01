import React from 'react'
import Connexion from '../componants/Connexion'
import NotFound from '../componants/NotFound'
import Accueil from '../componants/Accueil'

export default function Principal() {
  return (
     <div>
       <Connexion/>
       <NotFound/>
       <Accueil/>
     </div>
)
}
