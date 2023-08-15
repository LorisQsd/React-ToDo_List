/** Composant ListItem pour générer des <li></li> 
 * @param {object} itemData Les données de l'item
 * @param {function} deleteTodo Fonction pour supprimer l'item
*/
export default function ListItem({ itemData, deleteTodo }) {
  return (
    <li className='p-2 mb-2 bg-zinc-200 rounded flex'>
        <span>{ itemData.content }</span>
        {/* Au click sur le boutton, on execute la fonction deleteTodo en lui passant itemData.id en paramètre (id généré par nanoid) */}
        <button onClick={ () => deleteTodo(itemData.id) } className='ml-auto bg-red-600 w-6 h-6 rounded text-zinc-200'>X</button>
    </li>
  )
}
