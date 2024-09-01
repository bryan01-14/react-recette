import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Button from '../administration/Button';
import Card from './Card';
import recettes from '../Recettes';

// Firebase
import { database, ref, onValue, set, push, update, remove } from '../base';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function Accueil() {
  const [state, setState] = useState({ recettes: {} });
  const [user, setUser] = useState(null);
  const { pseudo } = useParams();

  const chargerExemple = useCallback(async () => {
    const userRecettesRef = ref(database, `users/${pseudo}/recettes`);
    const defaultRecettes = recettes; 

    try {
      await Promise.all(Object.entries(defaultRecettes).map(([key, recipe]) => {
        const newRecipeRef = push(userRecettesRef);
        return set(newRecipeRef, recipe);
      }));
      setState({ recettes: defaultRecettes });
    } catch (error) {
      console.error('Failed to load default recipes:', error);
    }
  }, [pseudo]);

  useEffect(() => {
    const auth = getAuth();

    // Authentication listener
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Recipe listener
    const userRecettesRef = ref(database, `users/${pseudo}/recettes`);
    const unsubscribeRecettes = onValue(userRecettesRef, async (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        // If there are no recipes, set default recipes
        await chargerExemple();
      } else {
        setState({ recettes: data });
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeRecettes();
    };
  }, [pseudo, chargerExemple]); // Add chargerExemple to dependency array

  const Ajouter = (recette) => {
    const newKey = push(ref(database, `users/${pseudo}/recettes`)).key;
    const updatedRecettes = { ...state.recettes, [newKey]: recette };
    setState({ recettes: updatedRecettes });

    const recetteRef = ref(database, `users/${pseudo}/recettes/${newKey}`);
    set(recetteRef, recette);
  };

  const modifier = (key, newRecette) => {
    const updatedRecettes = { ...state.recettes, [key]: newRecette };
    setState({ recettes: updatedRecettes });

    const recetteRef = ref(database, `users/${pseudo}/recettes/${key}`);
    update(recetteRef, newRecette);
  };

  const supprimer = (key) => {
    const updatedRecettes = { ...state.recettes };
    delete updatedRecettes[key];
    setState({ recettes: updatedRecettes });

    const recetteRef = ref(database, `users/${pseudo}/recettes/${key}`);
    remove(recetteRef);
  };

  const cards = Object.keys(state.recettes).length > 0 ? (
    <div className='grid lg:grid-cols-2 gap-4 md:grid-cols-1'>
      {Object.keys(state.recettes).map(key => (
        <div key={key} className='mb-4'>
          <Card details={state.recettes[key]} />
        </div>
      ))}
    </div>
  ) : (
    <p>Aucune recette à afficher</p>
  );

  return (
    <div className="w-full flex flex-col items-center ab">
      <div className="text-center text-white bg-red-500 w-full h-10 flex items-center justify-center">
        <Header pseudo={pseudo} />
      </div>
      <div className="lg:w-4/5 md:w-2/5 p-4 rounded-lg shadow-xl mt-4 text-black">
        {cards}
      </div>
      <Button 
        pseudo={pseudo}
        recettes={state.recettes}
        modifier={modifier}
        supprimer={supprimer}
        Ajouter={Ajouter}
        chargerExemple={chargerExemple} 
        user={user}
      />
    </div>
  );
}
