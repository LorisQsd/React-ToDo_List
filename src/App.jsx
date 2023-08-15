import { useState } from "react"
// Nanoid est une librairie qui permet de générer des id très simplement
import { nanoid } from "nanoid"
// Import composant
import ListItem from "./components/ListItem"

function App() {

  // Création d'un state todoList avec des données de base
  const [todoList, setTodoList] = useState([
    { id: nanoid(8), content: "Faire les courses"},
    { id: nanoid(8), content: "Promener le chien"},
    { id: nanoid(8), content: "Réviser ses cours REACT"},
  ])
  // Création d'un state pour l'input (2 ways databinding)
  const [todo, setTodo] = useState("")
  // Création d'un state pour gérer la soumission d'un input vide (ou non)
  const [showValidation, setShowValidation] = useState(false)

  /**
   * Au click sur le boutton "X", met à jour la todoList en supprimant l'item cliqué
   * @param {number} id L'id de l'item à supprimer
   */
  function deleteTodo(id) {
    // Parmi la todoList, on vient filtrer toutes les tâches qui n'ont pas le même id passé en argument
    // En d'autres termes, on récupère toutes les tâches sauf celle qui a l'id passé en paramètre (donc la tâche cliquée)
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  /** Gère la soumission du formulaire */
  function handleSubmit(e) {
    // On prévient le comportement par défaut pour éviter que la page se recharge à la soumission du formulaire
    e.preventDefault()

    // Si l'input qui a la value todo est vide
    if(todo === ""){
      // Alors on set ShowValidation à true et on return pour éviter d'exec le reste de la fonction
      setShowValidation(true);
      return
    }

    // Sinon on set la TodoList en lui passant la todoList actuelle et en lui rajoutant un id et le content passé dans l'input qui a la value todo
    // On note ici qu'on ne push pas dans la todoList, on préfère destructurer et rajouter car on créer une nouvelle liste
    setTodoList([...todoList, {id: nanoid(), content: todo}])
    // On set la value de Todo à une string vide (UX)
    setTodo("")
    // On set ShowValidation à false dans le cas où il serait sur true à cause d'une tentative de soumission d'input vide
    setShowValidation(false);

  }

  return (
    <>
    <div className="h-screen">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-3xl text-slate-100 mb-4">La To-Do Liste</h1>

        {/* A la soumission du formulaire, on exec la fonction handleSubmit */}
        <form onSubmit={ handleSubmit } className="mb-10">
          <label htmlFor="todo-item" className="text-slate-50">Ajouter une chose à faire</label>
          {/* On vient bind todo à la value de l'input */}
          {/* Au changement de l'input, on setTodo avec la valeur de l'input */}
          <input 
          value={todo}
          onChange={e => setTodo(e.target.value)}
          type="text" 
          className="mt-1 block w-full rounded"/>
          {/* Si showValidation est truthy (correspond au cas d'un input vide) alors j'affiche un message */}
          {/* On note que && est un shortcut pour exec uniquement si la condition est remplie */}
          {showValidation && (
            <p className="text-red-400">Ajoutez d'abord du contenu à votre tâche !</p>
          )}
          <button className="mt-4 py-2 px-2 bg-slate-50 rounded min-w-[115px]">Ajouter</button>
        </form>

        <ul>
          {/* Si la todoList est vide alors on affiche un message */}
          {!todoList.length && (
            <li className="text-slate-50 text-md">Pas d'items à afficher...</li>
          )}
          {/* Si la todoList contient au moins un item, on map à travers et on créer un composant par item */}
          {todoList.length > 0 && todoList.map(item => (
            <ListItem key={item.id} itemData={item} deleteTodo={deleteTodo}/>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
