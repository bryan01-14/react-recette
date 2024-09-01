import React, { useState, useEffect, useCallback } from 'react';
import AjouterRecette from './AjouterRecette';
import ButtonModif from './ButtonModif';
import Login from '../administration/Login';
import { getAuth, FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { database } from '../base';


export default function Button({ chargerExemple, Ajouter, recettes, modifier, supprimer, pseudo, user }) {
  const [connect, setConnect] = useState({ uid: null, chef: null });


  // Utilisation de useCallback pour mémoriser handleAuth
  const handleAuth = useCallback(async (user) => {
    const userUid = user.uid;
    const chefRef = ref(database, `users/${pseudo}/chef`);

    try {
      const chefSnapshot = await get(chefRef);
      const chef = chefSnapshot.val();

      if (!chef) {
        await set(chefRef, userUid);
      }

      setConnect({ uid: userUid, chef: chef || userUid });
    } catch (error) {
      console.error('Error fetching chef:', error);
    }
  }, [pseudo]);

  useEffect(() => {
    if (user) {
      handleAuth(user);
    }
  }, [user, handleAuth]);

  const authenticate = async () => {
    const auth = getAuth();
    const authProvider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, authProvider);
      handleAuth(result.user);
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed, please try again.');
    }
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setConnect({ uid: null, chef: null });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!connect.uid && !user) {
    return <Login authenticate={authenticate} />;
  }

  return (
    <div className="mt-4">
      {connect.uid && (
        <>
          <AjouterRecette Ajouter={Ajouter} />
          {
            Object.keys(recettes).map(key => (
              <ButtonModif
                key={key}
                id={key}
                modifier={modifier}
                supprimer={supprimer}
                recettes={recettes}
              />
            ))
          }
          <div className='flex items-center justify-between'>
              <button onClick={logout} className='bg-red-700 text-white rounded'>
                Déconnecter
              </button>
              <button
                onClick={chargerExemple}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Remplir les Recettes
              </button>
          </div>
        </>
      )}
    </div>
  );
}
