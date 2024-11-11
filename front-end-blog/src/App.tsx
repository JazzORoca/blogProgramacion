import React, { useState, useEffect } from 'react';
import { Code2, PlusCircle } from 'lucide-react';
import { Post } from './types';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { CreatePost } from './components/CreatePost';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Cargar los posts desde el backend al cargar la página
  useEffect(() => {
    fetch('http://localhost:8080/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  // Crear un nuevo post
  const handleCreatePost = (postData: { title: string; content: string; tags: string[]; author: string; imageUrl: string }) => {
    const newPost: Post = {
      id: (posts.length + 1).toString(), // Generar temporalmente el id en el frontend
      ...postData,
      date: new Date().toISOString(),
      comments: []
    };

    fetch('http://localhost:8080/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(createdPost => {
        setPosts([createdPost, ...posts]); // Agregar el nuevo post devuelto por el backend
        setShowCreatePost(false);
      })
      .catch(error => console.error('Error creating post:', error));
  };

  // Agregar un comentario a un post específico
  const handleAddComment = (postId: string, author: string, content: string, avatarUrl: string) => {
    const newComment = {
      author: author || 'Usuario Anónimo',
      content,
      date: new Date().toISOString(),
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    };

    fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })
      .then(response => response.json())
      .then(updatedComment => {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, updatedComment]
            };
          }
          return post;
        }));
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Software Construction Blog
              </h1>
            </div>
            {!selectedPostId && (
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusCircle size={20} />
                Crear Post
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedPost ? (
          <PostDetail 
            post={selectedPost} 
            onBack={() => setSelectedPostId(null)}
            onAddComment={(author, content, avatarUrl) => handleAddComment(selectedPost.id, author, content, avatarUrl)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={setSelectedPostId} 
              />
            ))}
          </div>
        )}
      </main>

      {showCreatePost && (
        <CreatePost
          onSubmit={handleCreatePost}
          onClose={() => setShowCreatePost(false)}
        />
      )}
    </div>
  );
}

export default App;
