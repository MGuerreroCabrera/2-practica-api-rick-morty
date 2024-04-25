import "./Character.css";
import React from 'react'
import { useState, useEffect } from 'react';


export const Character = () => {
    
    // Crear el estado Character
    const [characters, setCharacters] = useState([]);
    // Crear estado para rotación de la imagen
    const [rotated, setRotated] = useState({});

    // Utilizar useEffect para realizar la petición una única vez
    useEffect(() => {
        // Realizar la llamada a la API
        fetch("https://rickandmortyapi.com/api/character")
        .then((res) => res.json())
        .then((res) => {
            // Rellemar el estado character con los elementos obtenidos
            setCharacters(res.results);
            // Inicializar el estado rotated con false para cada personaje
            const initialRotatedState = {};
            // Recorrer los elementos de la respuesta e inicializar el estado rotated a false con el id del character
            for (const character of res.results) {
                initialRotatedState[character.id] = false;
            }
            setRotated(initialRotatedState);
        });
    }, []);
    
    // Función para cambiar el estado rotated de un personaje específico
    const toggleRotation = (characterId) => {
        setRotated(prevState => ({
            ...prevState,
            [characterId]: !prevState[characterId]
        }));
    };
    
    return (
        <div>
           {characters.map((character) => (   
                <img 
                    key={character.id} 
                    onClick={() => toggleRotation(character.id)} 
                    src={character.image} 
                    alt={character.name} 
                    className={rotated[character.id] ? 'rotated' : 'normal'}
                />
            ))}
        </div>
    )
}
