#!/usr/bin/env bun

import { spawn, exec } from 'child_process';
import { watch } from 'fs';

let devProcess: any = null;
let restartTimeout: any = null;

const killPort3000 = async (): Promise<void> => {
  return new Promise((resolve) => {
    // Only kill processes that are actually listening on port 3000
    exec('lsof -ti:3000', (error, stdout) => {
      if (stdout.trim()) {
        const pids = stdout.trim().split('\n');
        pids.forEach(pid => {
          if (pid) {
            console.log(`Killing process ${pid} on port 3000`);
            exec(`kill -9 ${pid}`, () => {});
          }
        });
        // Wait for processes to die
        setTimeout(resolve, 1000);
      } else {
        // No processes on port 3000
        resolve();
      }
    });
  });
};

const startServer = async () => {
  console.log('🚀 Starting server...');
  
  devProcess = spawn('bun', ['run', 'dev'], { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      PORT: '3000',
      FORCE_COLOR: '1'
    }
  });

  devProcess.on('error', (error: any) => {
    console.error('Server error:', error.message);
  });
};

const restartServer = () => {
  if (restartTimeout) {
    clearTimeout(restartTimeout);
  }
  
  restartTimeout = setTimeout(async () => {
    console.log('🔄 Restarting...');
    
    // Kill current dev process
    if (devProcess) {
      devProcess.kill('SIGKILL');
      devProcess = null;
    }
    
    // Kill anything on port 3000
    await killPort3000();
    
    // Start new server
    await startServer();
  }, 300);
};

// Watch for file changes
watch('.', { recursive: true }, (eventType, filename) => {
  if (filename && 
      (filename.endsWith('.tsx') || 
       filename.endsWith('.ts') || 
       filename.endsWith('.env')) &&
      !filename.includes('node_modules') &&
      !filename.includes('.blade') &&
      !filename.includes('dist')) {
    
    console.log(`📝 ${filename} changed`);
    restartServer();
  }
});

// Cleanup on exit
process.on('SIGINT', async () => {
  console.log('\n👋 Goodbye!');
  if (devProcess) {
    devProcess.kill('SIGKILL');
  }
  await killPort3000();
  process.exit(0);
});

// Start everything
(async () => {
  await killPort3000();
  await startServer();
  console.log('👀 Watching for changes... (Ctrl+C to stop)');
})();
