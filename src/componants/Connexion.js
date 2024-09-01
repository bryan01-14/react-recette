import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Connexion() {
  //1.creation du state
  const [personne , setPersonne] = useState({
    pseudo :'' ,
    goTochat :false
  })


  //2.manipulation du state
   const handleSubmit = (event) =>{
    event.preventDefault()
    setPersonne((prevPersonne) =>({
      ...prevPersonne,
      goTochat:true
    }))
  }

   const handleChange = (event) =>{
     const value = event.target.value
     setPersonne(prevPersonne =>({
       ...prevPersonne,
       pseudo : value
     }))
   }

    const navigate = useNavigate()
    useEffect(() =>{
      if(personne.goTochat){
        navigate(`/pseudo/${personne.pseudo}`)
      }
    })


  return (
    <div className='connexionBox' onSubmit={handleSubmit}>
            <form className='connexion' >
              <h1 className='boite'>Ma boite de recette</h1>
                <input 
                   className='input'
                   type="text" 
                   placeholder="nom du chef" 
                   required 
                   pattern='[A-Za-z-]{1,}'
                   value={personne.pseudo}
                   onChange={handleChange}
                />
                <button type='submit' className='submit'>GO</button>
            </form>
        </div>
    )
}
