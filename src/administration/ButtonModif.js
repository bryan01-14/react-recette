import React from 'react'

export default function ButtonModif({ id:key , modifier , recettes , supprimer}) {
    const recette = recettes[key]

    //2.manipulation du state
    const handleChange = (event ,key)=>{
        const { name, value } = event.target;
        const recette = recettes[key]
        recette[name] = value
        modifier(key , recette)
    }

  return (
    <div className='w-full p-4 rounded-lg shadow-xl mt-4 text-black'>
            <h1 className='text-center'>Modifier une recette</h1>
            <form className='grid grid-cols-2 gap-4 mt-20' >
                <div>
                    <label htmlFor='nom'>Nom</label>
                    <input
                         value={recette.nom}
                         onChange={event => handleChange(event , key)}
                        type='text'
                        id='nom'
                        name='nom'
                        autoComplete='off'
                        className='focus:ring-red focus:border-red block w-full border-gray-400 rounded-md p-5'
                        placeholder='Nom'
                        
                    />
                </div>
                <div>
                    <label htmlFor='image'>Image URL</label>
                    <input
                         value={recette.image}
                         onChange={event => handleChange(event , key)}
                        type='text'
                        id='image'
                        name='image'
                        autoComplete='off'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                        placeholder='Image URL'
                        
                    />
                </div>
                <div>
                    <label htmlFor='ingredients'>Ingrédients</label>
                    <textarea
                         value={recette.ingredients}
                         onChange={event => handleChange(event , key)}
                        id='ingredients'
                        name='ingredients'
                        rows='10'
                        placeholder='Ingrédients'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                        
                    />
                </div>
                <div>
                    <label htmlFor='instructions'>Instructions</label>
                    <textarea
                         value={recette.instructions}
                         onChange={event => handleChange(event , key)}
                        id='instructions'
                        name='instructions'
                        rows='10'
                        placeholder='Instructions'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                      
                    />
                </div>

                <div className='flex items-center justify-center'>
                    <button type='submit' onClick={() => supprimer(key)} className='bg-red-600 p-4 rounded-lg text-white'>
                        supprimer recette
                    </button>
                </div>
            </form>
        </div>
  )
}
