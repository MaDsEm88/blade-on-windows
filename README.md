# Blade on Windows 🪟⚡

Simple guide for installing and running the [Blade framework](https://blade.ronin.co) on Windows using WSL Ubuntu.

## 🚀 Installation Guide

### 1. Install WSL Ubuntu

Run PowerShell/Terminal as **Administrator**:

```bash
wsl --install
```

Reboot your computer when prompted.

### 2. Set Up Ubuntu

Open Ubuntu terminal and update:

```bash
sudo apt update && sudo apt install unzip curl
```

### 3. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your Ubuntu terminal, then verify:

```bash
bun --version
```

### 4. Create Your Blade Project

**Important:** Work in Ubuntu home directory (not `/mnt/c/`):

```bash
bunx @ronin/blade init my-app
cd my-app
bun install
```

### 5. Start Development

```bash
bun run dev
```

That's it! Your Blade app is running with hot-reload. 🎉

## 💡 Tips

- Always work in Ubuntu filesystem (`/home/username/`) for best performance
- Open projects in VS Code with `code .` from Ubuntu terminal
- Use `lsof -i :3000` and `kill -9 <PID>` if port 3000 is busy

---

**Happy coding! 🚀**
```