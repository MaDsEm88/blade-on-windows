# Blade on Windows 🪟⚡

A complete guide and toolkit for running the [Blade framework](https://blade.im) on Windows using WSL Ubuntu, with enhanced development tools for seamless hot-reloading.

## Why This Guide?

Blade works great on Windows, but there are some gotchas that can trip you up:
- Installing in the wrong directory (avoid `/mnt/c/` paths)
- Missing hot-reload functionality with the standard dev command
- WSL/Ubuntu setup nuances for optimal performance

This repo provides the solution with a custom watch script that gives you **true hot-reloading** - no manual browser refreshes needed!

## 🚀 Quick Setup

### 1. Install WSL Ubuntu

Run PowerShell/Terminal as **Administrator**:

```bash
wsl --install
```

Reboot your computer. Ubuntu will be installed automatically.

### 2. Set Up Ubuntu Environment

Open Ubuntu terminal and update the system:

```bash
sudo apt update && sudo apt install unzip curl
```

### 3. Install Bun in Ubuntu

Even if you have Bun installed in Windows, you need it in Ubuntu:

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your Ubuntu terminal, then verify:

```bash
bun --version
```

### 4. Create Your Blade Project

**Important:** Work in your Ubuntu home directory, NOT in `/mnt/c/`:

```bash
# Good ✅
bunx @ronin/blade init

# Navigate to your project
~/blade-example

# Install dependencies
bun install
```

**Avoid this ❌:**
```bash
# Don't do this - causes performance issues
/mnt/c/Users/YourName/Desktop/my-blade-app
```

### 5. Add Hot-Reload Script

Copy the `scripts/watch-dev.ts` file from this repo to your project, then add this to your `package.json`:

```json
{
  "scripts": {
    "dev:watch": "bun run scripts/watch-dev.ts"
  }
}
```

## 🔥 Development Modes

### Standard Development (Limited Hot-Reload)
```bash
bun run dev
```
- ✅ Initial load works
- ❌ Only updates once, then requires manual browser refresh

### Enhanced Development (True Hot-Reload)
```bash
bun dev:watch
```
- ✅ Automatic server restart on file changes
- ✅ Continuous browser updates without manual refresh
- ✅ Watches `.tsx`, `.ts`, and `.env` files
- ✅ Intelligent process management

## 📁 Project Structure

```
my-blade-app/
├── scripts/
│   └── watch-dev.ts          # Hot-reload script
├── pages/
│   └── index.tsx             # Your pages
├── package.json
└── ...
```

## 🛠️ The Watch Script

The included `watch-dev.ts` script provides:

- **File watching** for TypeScript and React files
- **Automatic server restart** when files change
- **Port management** to prevent conflicts
- **Process cleanup** on exit
- **Debounced restarts** to prevent rapid rebuilds

## 🐛 Troubleshooting

### Port 3000 Already in Use
If you see "Port 3000 is already in use", kill lingering processes:

```bash
lsof -i :3000
kill -9 <PID>
```

### Bun Command Not Found
Make sure you're in Ubuntu terminal, not PowerShell:

```bash
# Reinstall Bun in Ubuntu
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

### Slow Performance
Ensure your project is in Ubuntu filesystem, not Windows:

```bash
# Good ✅
pwd
# Should show: /home/yourusername/my-blade-app

# Bad ❌
# /mnt/c/Users/YourName/...
```

### VS Code Integration
Open your project in VS Code from Ubuntu terminal:

```bash
code .
```

This ensures VS Code uses the Ubuntu environment.

## 🎯 Why WSL Ubuntu?

- **Better performance** than Windows filesystem
- **Native Unix tools** that Blade expects
- **Proper file watching** for hot-reload
- **Seamless development experience**

## 📝 Contributing

Found an issue or have improvements? Please open an issue or PR!

## 🙏 Credits

Created by [Mark Madsen](https://github.com/MaDsEm88) to help developers get Blade running smoothly on Windows.

---

**Happy coding with Blade on Windows! 🚀**
