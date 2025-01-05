<div align="center">
  <h1>🔒 NoteVault</h1>
  
  <p>
    A modern, secure note-taking and file management web application built with React, TypeScript, and Supabase.
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td>
        <h3>🔐 Secure Authentication</h3>
        <ul>
          <li>Email/Password login</li>
          <li>Social login options</li>
          <li>Protected routes</li>
        </ul>
      </td>
      <td>
        <h3>📝 Note Management</h3>
        <ul>
          <li>Create and manage notes</li>
          <li>Real-time updates</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <h3>📁 File Management</h3>
        <ul>
          <li>Upload and manage files</li>
          <li>Support for images, PDFs, and documents</li>
          <li>Secure file storage</li>
        </ul>
      </td>
      <td>
        <h3>💫 Modern UI</h3>
        <ul>
          <li>Responsive design</li>
          <li>Dark theme</li>
          <li>Smooth animations</li>
          <li>Loading states</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 🛠️ Tech Stack

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

</div>

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Storage**: Supabase Storage
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Build Tool**: Vite

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevxD98/NoteVault.git
   cd NoteVault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase credentials**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env:
   # VITE_SUPABASE_URL=your_supabase_url
   # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📝 License

This project is licensed under the MIT License.
