import React from 'react';

export default function Card({ details }) {
    const ingredients = details.ingredients
    .split(',')
    .map(item => <li key={item}>{item}</li>)


    const instructions = details.instructions
    .split('\n')
    .map(item => <li key={item} className='mb-3'>{item}</li>)

    const requireImage = chemin =>{
        try{
            return require(`../img/${chemin}`)
        }catch{
            return require(`../img/default.jpg`)
        }
    }
   
  return (
    <div className='border rounded-lg p-4 shadow-xl'>
        <img src={requireImage(details.image)} alt=''/>
      <h2 className='text-xl font-bold mb-5 mt-2'>{details.nom}</h2>
      <ul className='w-full shadow-lg bg-gray-300 mb-4 list-disc list-inside'>
        {ingredients}
      </ul>
      <ol className='text-base list-decimal list-inside'>
        {instructions}
      </ol>
    </div>
  );
}
