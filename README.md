# 🤖 AgentForge: The Ultimate AI Agent Orchestration Platform

<div align="center">
  <img src="https://raw.githubusercontent.com/SurbhiAgarwal1/AgentForge/main/public/logo.png" alt="AgentForge Logo" width="120" height="120" />
  <h3>Built for the future of software development</h3>
  <p align="center">
    <a href="https://agentforge-autonomou-odbd.bolt.host/"><strong>Explore Live Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SurbhiAgarwal1/AgentForge/stargazers"><img src="https://img.shields.io/github/stars/SurbhiAgarwal1/AgentForge?style=for-the-badge&color=cyan" alt="Stars"></a>
    <a href="https://github.com/SurbhiAgarwal1/AgentForge/network/members"><img src="https://img.shields.io/github/forks/SurbhiAgarwal1/AgentForge?style=for-the-badge&color=purple" alt="Forks"></a>
    <a href="https://github.com/SurbhiAgarwal1/AgentForge/issues"><img src="https://img.shields.io/github/issues/SurbhiAgarwal1/AgentForge?style=for-the-badge&color=blue" alt="Issues"></a>
  </p>
</div>

---

## 🚀 Overview

**AgentForge** is a state-of-the-art, full-stack AI Agent orchestration platform designed to empower developers and enterprises to build, manage, and deploy autonomous AI agents with ease. Featuring a stunning glassmorphic UI and powerful visualization tools, AgentForge turns complex AI workflows into intuitive, manageable processes.

## ✨ Key Features

- **🧠 Advanced Agent Management**: Create and configure specialized AI agents with unique personas and capabilities.
- **🔗 Visual Workflow Builder**: Design complex multi-agent interactions using our drag-and-drop workflow editor powered by `React Flow`.
- **💾 Persistent Agent Memory**: Give your agents long-term context and memory, stored securely via Supabase.
- **📊 Real-time Analytics**: Monitor agent performance and deployment metrics with interactive charts.
- **🐚 Integrated Terminal**: Test your agents in a simulated terminal environment before deployment.
- **🚀 One-Click Deployments**: Seamlessly deploy your agents to various environments and platforms.
- **🎨 Premium UI/UX**: A beautiful, responsive interface built with Tailwind CSS, Framer Motion, and Radix UI.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | [Next.js 13+](https://nextjs.org/), [React](https://reactjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Components** | [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) |
| **Backend/DB** | [Supabase](https://supabase.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Visuals** | [React Flow](https://reactflow.dev/), [Recharts](https://recharts.org/) |

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Supabase account (for database and auth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SurbhiAgarwal1/AgentForge.git
   cd AgentForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```bash
AgentForge/
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         # Reusable UI components
│   ├── agentforge/     # Core brand components
│   ├── dashboard/      # Dashboard-specific components
│   └── landing/        # Landing page sections
├── hooks/              # Custom React hooks
├── lib/                # Utility functions & shared logic
├── public/             # Static assets
└── styles/             # Global styles and Tailwind config
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/SurbhiAgarwal1">Surbhi Agarwal</a></p>
  <p><i>The future of autonomous intelligence is here.</i></p>
</div>
