import React from 'react';

export default function Toast({ message }) {
  return (
    <div className={`toast ${message ? 'show' : ''}`} id="toast" role="status">
      {message}
    </div>
  );
}
