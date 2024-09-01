import React, { useState } from 'react';

export default function AjouterRecette({ Ajouter }) {
    const [ajouterRecette, setAjouterRecette] = useState({
        nom: '',
        image: '',
        ingredients: '',
        instructions: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAjouterRecette(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validation des champs
        if (!ajouterRecette.nom || !ajouterRecette.image || !ajouterRecette.ingredients || !ajouterRecette.instructions) {
            alert("Tous les champs doivent être remplis");
            return;
        }

        // Soumettre la recette
        Ajouter(ajouterRecette);

        // Réinitialiser le formulaire après soumission
         const recette ={...ajouterRecette}
         Object.keys(recette).forEach(item =>{
            recette[item] = ''
         })
         setAjouterRecette({...recette})
    };

    return (
        <div className='w-full p-4 rounded-lg shadow-xl mt-4 text-black'>
            <h1 className='text-center'>Ajouter une recette</h1>
            <form className='grid sm:grid-cols-2 gap-x-7 gap-y-6 mt-20' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='nom'>Nom</label>
                    <input
                        type='text'
                        id='nom'
                        name='nom'
                        autoComplete='off'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                        placeholder='Nom'
                        onChange={handleChange}
                        value={ajouterRecette.nom}
                    />
                </div>
                <div>
                    <label htmlFor='image'>Image URL</label>
                    <input
                        type='text'
                        id='image'
                        name='image'
                        autoComplete='off'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                        placeholder='Image URL'
                        onChange={handleChange}
                        value={ajouterRecette.image}
                    />
                </div>
                <div>
                    <label htmlFor='ingredients'>Ingrédients</label>
                    <textarea
                        id='ingredients'
                        name='ingredients'
                        rows='10'
                        placeholder='Ingrédients'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                        onChange={handleChange}
                        value={ajouterRecette.ingredients}
                    />
                </div>
                <div>
                    <label htmlFor='instructions'>Instructions</label>
                    <textarea
                        id='instructions'
                        name='instructions'
                        rows='10'
                        placeholder='Instructions'
                        className='focus:ring-primary focus:border-primary block w-full border-gray-400 rounded-md p-5'
                        onChange={handleChange}
                        value={ajouterRecette.instructions}
                    />
                </div>

                <div className='flex items-center justify-center'>
                    <button type='submit' className='bg-green-800 p-4 rounded-lg text-white'>
                        Ajouter recette
                    </button>
                </div>
            </form>
        </div>
    );
}
