import React from 'react'

export default function FilterControls() {
  return (
    <div className="FilterControls">
      <button onClick={() => props.displayMatches(8)} className="btn-top">
        My matches
      </button>
    </div>
  );
}
