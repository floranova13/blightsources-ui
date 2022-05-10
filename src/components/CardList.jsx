import React from 'react';
const items = [
  { id: 1 },
  // More items...
]

const CardList = () => {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          {/* Your content */}
        </li>
      ))}
    </ul>
  )
}

export default CardList;