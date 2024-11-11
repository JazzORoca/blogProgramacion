import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (author: string, content: string, avatarUrl: string) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAuthor = author.trim() || 'Usuario Anónimo'; // Si el usuario no introduce un alias, se asigna "Usuario Anónimo"
    const finalAvatarUrl = avatarUrl.trim() || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'; // URL por defecto
    if (content.trim()) {
      onSubmit(finalAuthor, content, finalAvatarUrl);
      setAuthor('');
      setContent('');
      setAvatarUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tu Alias
      </label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingresa tu alias (opcional)"
      />
      <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
        URL de Imagen de Perfil
      </label>
      <input
        type="text"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingresa URL de imagen (opcional)"
      />
      <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
        Agregar un comentario
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Comparte tus pensamientos..."
        required
      />
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Publicar Comentario
        </button>
      </div>
    </form>
  );
}
