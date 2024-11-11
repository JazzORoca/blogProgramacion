import React from 'react';
import { Calendar, Tag, MessageCircle } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: (id: string) => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
        <span className="text-sm text-gray-600 flex items-center gap-1">
  <Calendar size={16} />
  {new Date(post.date).toLocaleDateString()} {/* Formatea la fecha */}
</span>

          <span className="text-sm text-gray-600 flex items-center gap-1">
            <MessageCircle size={16} />
            {post.comments.length}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
        <div className="flex flex-wrap gap-2">
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
      </div>
    </article>
  );
}