# Task Management System

A modern, real-time task management application built with Next.js, Node.js, and Socket.io. This application provides a seamless experience for managing tasks, with real-time notifications and a professional black-and-white theme.

## 🌟 Features

### Authentication & User Management
- Secure user authentication system
- User registration and login functionality
- JWT-based authentication
- Protected routes and API endpoints

### Task Management
- Create, read, update, and delete tasks
- Assign tasks to team members
- Set task priorities (High, Medium, Low)
- Track task status (Todo, In Progress, Completed)
- Set due dates for tasks
- Task filtering and search functionality

### Real-time Notifications
- Instant notifications using Socket.io
- Notifications for:
  - Task assignments
  - Task updates
  - Task completion
  - System alerts
- Animated notification system
- Auto-dismissing notifications

### User Interface
- Modern, responsive design
- Professional black-and-white theme
- Smooth animations and transitions
- Intuitive task management interface
- Real-time updates
- Loading states and skeletons
- Error handling with visual feedback

### Task Organization
- Filter tasks by:
  - All tasks
  - Assigned to me
  - Created by me
  - Overdue tasks
- Search tasks by title or description
- Priority-based filtering
- Status-based organization

## 🛠️ Technology Stack

### Frontend
- **Next.js 13+** - React framework with app directory
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Socket.io Client** - Real-time communication
- **Lucide Icons** - Modern icon set
- **UUID** - Unique identifier generation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.io** - Real-time event-based communication
- **JWT** - JSON Web Token authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm run dev
```

## 📋 Detailed Setup Instructions

### Backend Setup
1. **Database Configuration**
   - Ensure MongoDB is installed and running
   - Create a new database named 'taskmanager'
   - Configure MongoDB connection string in .env file

2. **Environment Variables**
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_secure_jwt_secret
   PORT=5000
   ```

3. **API Endpoints**
   - Authentication: `/api/users/*`
   - Tasks: `/api/tasks/*`
   - WebSocket: `ws://localhost:5000`

### Frontend Setup
1. **Environment Configuration**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. **Development Server**
   - Runs on port 3000 by default
   - Hot reloading enabled
   - API proxy configured

3. **Build Process**
   ```bash
   npm run build
   npm start
   ```

## 🎯 Development Approach

### Architecture
1. **Frontend Architecture**
   - Next.js 13+ with App Router
   - Component-based architecture
   - Custom hooks for state management
   - Context API for global state
   - Tailwind CSS for styling

2. **Backend Architecture**
   - RESTful API design
   - MVC pattern
   - WebSocket integration
   - Middleware-based authentication
   - MongoDB with Mongoose ODM

### Key Design Decisions
1. **Real-time Updates**
   - Socket.io for real-time communication
   - Event-based architecture
   - Optimistic UI updates
   - Fallback to REST API

2. **Authentication**
   - JWT-based authentication
   - Secure password hashing
   - Protected routes
   - Token refresh mechanism

3. **UI/UX Design**
   - Black and white theme for professionalism
   - Framer Motion for animations
   - Responsive design principles
   - Loading states and error handling

## ⚖️ Assumptions and Trade-offs

### Technical Assumptions
1. **Browser Support**
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - JavaScript enabled
   - WebSocket support
   - Local storage available

2. **Network**
   - Stable internet connection
   - WebSocket support
   - Reasonable latency

3. **Device Capabilities**
   - Touch support for mobile
   - Screen size minimum 320px
   - Modern JavaScript support

### Trade-offs Made
1. **Performance vs. Features**
   - Real-time updates vs. server load
   - Rich UI vs. initial load time
   - Offline support vs. complexity

2. **Security vs. Usability**
   - JWT expiration time
   - Password requirements
   - Session management

3. **Scalability Considerations**
   - MongoDB for flexibility
   - Socket.io for real-time
   - Stateless architecture

### Future Considerations
1. **Potential Improvements**
   - Implement caching
   - Add offline support
   - Enhance error handling
   - Optimize bundle size

2. **Scalability Plans**
   - Horizontal scaling
   - Load balancing
   - Database sharding
   - CDN integration

## 📱 Features in Detail

### Authentication System
- Secure user registration and login
- Password hashing and encryption
- JWT token-based authentication
- Protected routes and API endpoints
- Session management

### Task Management
- Create tasks with:
  - Title and description
  - Due date
  - Priority level
  - Status
  - Assignee
- Update task details
- Delete tasks
- Mark tasks as complete
- Filter and search tasks

### Real-time Updates
- Instant task updates
- Live notifications
- Real-time task status changes
- Immediate UI updates
- WebSocket-based communication

### User Interface
- Responsive design for all devices
- Dark theme with professional aesthetics
- Smooth animations and transitions
- Loading states and skeletons
- Error handling with visual feedback
- Intuitive navigation

## 🔒 Security Features

- JWT-based authentication
- Password encryption
- Protected API endpoints
- Input validation
- Error handling
- Secure WebSocket connections

## 🎨 UI/UX Features

- Professional black-and-white theme
- Smooth animations using Framer Motion
- Loading skeletons for better UX
- Responsive design for all devices
- Intuitive task management interface
- Real-time updates and notifications
- Error handling with visual feedback

## 📈 Performance Optimizations

- Server-side rendering with Next.js
- Optimized database queries
- Efficient state management
- Lazy loading of components
- Optimized images and assets
- Caching strategies

## 🔄 Future Enhancements

- Task categories and labels
- File attachments for tasks
- Team collaboration features
- Task comments and discussions
- Email notifications
- Mobile application
- Advanced analytics and reporting
- Calendar integration

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Socket.io for real-time capabilities
- All other open-source contributors



## 📧 Contact

Your Name - Gourav Maurya
Email - gouravmaurya351@gmail.com
Project Link: [https://github.com/yourusername/task-manager](https://github.com/yourusername/task-manager)
