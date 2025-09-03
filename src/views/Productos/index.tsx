import React from 'react';

/*
/src
├── /views
│   ├── /Productos
│   │   ├── index.tsx              # Componente principal
│   │   ├── /components            # Subcomponentes de Productos
│   │   ├── /context               # Aquí va el contexto de Productos
│   │   │   ├── ProductosContext.tsx
│   │   │   ├── useProductos.ts     # Custom hook para consumir el contexto
│   │   │   └── types.ts           # Tipos del contexto (opcional)
│   │   └── /hooks                 # Hooks específicos de la vista
*/
const Productos = () => {
  return <div>Productos</div>;
};

export default Productos;

/*
/src
├── /components
│   ├── /Layout # componente para envolver cada vista y mostrar lo mismo en cualquier pantalla
│   ├── /SideBarMenu # menu de navegacion
│   ├── /shared # componentes que se usan en varios lugares (aun no se)
│   ├── /ui    # componentes como botones, inputs, selects, tablas. etc
*/
