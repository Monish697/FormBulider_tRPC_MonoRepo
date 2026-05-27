const fs = require('fs');

function updateFile(path) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');

  // Background and Text
  content = content.replace(/bg-\[#f6f4f1\] text-slate-900/g, 'bg-[#f6f4f1] text-slate-900 dark:bg-black dark:text-white');
  
  // Borders
  content = content.replace(/border-black\/10/g, 'border-black/10 dark:border-[#6FC3DF]');
  
  // Backgrounds for cards
  content = content.replace(/bg-white\/80/g, 'bg-white/80 dark:bg-black');
  content = content.replace(/bg-white\/70/g, 'bg-white/70 dark:bg-black');
  // Only replace exact "bg-white " or "bg-white\""
  content = content.replace(/bg-white([\s"])/g, 'bg-white dark:bg-black$1');
  
  // Text colors
  content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-gray-300');
  content = content.replace(/text-slate-600/g, 'text-slate-600 dark:text-gray-300');
  content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
  content = content.replace(/text-slate-700/g, 'text-slate-700 dark:text-gray-200');
  
  // Button backgrounds
  content = content.replace(/bg-slate-900/g, 'bg-slate-900 dark:bg-white dark:text-black');
  
  // Hide blur gradients in dark mode
  content = content.replace(/pointer-events-none absolute (.*?) blur-\[(.*?)\]/g, 'pointer-events-none absolute $1 blur-[$2] dark:hidden');

  fs.writeFileSync(path, content, 'utf8');
}

updateFile('app/page.tsx');
updateFile('app/signup/page.tsx');
console.log('Updated theme classes');
