import React from 'react';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Post } from '../types';
import { CommentForm } from './CommentForm';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onAddComment: (author: string, content: string, avatarUrl: string) => void;
}

export function PostDetail({ post, onBack, onAddComment }: PostDetailProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-800"
      >
        <ArrowLeft size={20} />
        Volver a los posts
      </button>
      
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <Calendar size={16} />
          {post.date}
        </span>
        <span className="text-sm text-gray-600">
          por <span className="font-medium">{post.author}</span>
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => (
          <span 
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            <Tag size={14} />
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-700 mb-8 leading-relaxed">{post.content}</p>

      <div className="border-t pt-8">
        <h2 className="text-xl font-bold mb-6">Comentarios</h2>
        {post.comments.map(comment => (
          <div key={comment.id} className="flex gap-4 mb-6">
            <img 
              src={comment.avatarUrl} 
              alt={comment.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
        
        <CommentForm onSubmit={onAddComment} />
      </div>
    </div>
  );
}
