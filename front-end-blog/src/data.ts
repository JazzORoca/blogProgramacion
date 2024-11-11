import { Post } from './types';

export const posts: Post[] = [
  {
    id: '1',
    title: 'Clean Architecture: A Craftsmans Guide to Software Structure',
    content: `In todays rapidly evolving software landscape, maintaining a clean architecture is more crucial than ever. This post explores the fundamental principles of clean architecture and how it can transform your development process...`,
    author: 'Sarah Chen',
    date: '2024-03-15',
    tags: ['Architecture', 'Best Practices', 'Clean Code'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    comments: [
      {
        id: 'c1',
        author: 'David Kumar',
        content: 'Great insights on clean architecture! Ive been implementing similar patterns in my team.',
        date: '2024-03-16',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      }
    ]
  },
  {
    id: '2',
    title: 'Microservices vs Monoliths: Making the Right Choice',
    content: `The debate between microservices and monolithic architectures continues to be relevant. Let's explore the pros and cons of each approach and when to use them...`,
    author: 'Michael Rodriguez',
    date: '2024-03-14',
    tags: ['Microservices', 'Architecture', 'System Design'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    comments: [
      {
        id: 'c2',
        author: 'Emma Wilson',
        content: 'This really helped me understand when to choose each architecture style.',
        date: '2024-03-15',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      }
    ]
  }
];