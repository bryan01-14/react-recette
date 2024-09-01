import React from 'react';

export default function Header({ pseudo }) {

  const formatPseudo = (pseudo) => {
    // Assurez-vous que pseudo est une chaîne de caractères
    if (typeof pseudo !== 'string') {
      return '';
    }
    return /[aeiuoy]/i.test(pseudo) ? `de ${pseudo}` : `d' ${pseudo}`;
  };

  return (
    <header>
      <h1>
        La boîte à recettes {formatPseudo(pseudo)}
      </h1>
    </header>
  );
}
