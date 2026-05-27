const fs = require('fs');

const files = [
  'components/form-builder/ThemeSelector.tsx',
  'components/form-builder/FormBuilder.tsx',
  'components/form-builder/FormViewer.tsx',
  'components/form-builder/Canvas.tsx',
  'components/form-builder/Sidebar.tsx'
];

for (const path of files) {
  if (!fs.existsSync(path)) continue;
  let content = fs.readFileSync(path, 'utf8');

  // Strip out old dark mode backgrounds
  content = content.replace(/dark bg-\[#0b1220\]/g, 'dark:bg-black');
  content = content.replace(/dark:bg-slate-900\/50/g, 'dark:bg-black');
  content = content.replace(/dark:bg-white\/5/g, 'dark:bg-black');
  content = content.replace(/dark:bg-white\/10/g, 'dark:bg-black');
  content = content.replace(/dark:bg-slate-800\/50/g, 'dark:bg-black');
  content = content.replace(/dark:bg-slate-800/g, 'dark:bg-black');
  
  // High contrast borders
  content = content.replace(/dark:border-white\/10/g, 'dark:border-[#6FC3DF]');
  content = content.replace(/dark:border-white\/15/g, 'dark:border-white');
  content = content.replace(/dark:border-slate-700/g, 'dark:border-white');
  content = content.replace(/dark:border-slate-600/g, 'dark:border-white');
  
  // High contrast text
  content = content.replace(/dark:text-slate-100/g, 'dark:text-white');
  content = content.replace(/dark:text-slate-200/g, 'dark:text-white');
  content = content.replace(/dark:text-slate-300/g, 'dark:text-white');
  content = content.replace(/dark:text-slate-400/g, 'dark:text-white');
  content = content.replace(/dark:text-slate-500/g, 'dark:text-white');
  
  // Formcraft base colors mapping (light mode)
  content = content.replace(/bg-slate-50/g, 'bg-[#f6f4f1]');
  content = content.replace(/bg-slate-100/g, 'bg-[#f6f4f1]');
  content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
  content = content.replace(/border-slate-200/g, 'border-black/10 dark:border-white');
  content = content.replace(/border-slate-300/g, 'border-black/10 dark:border-[#6FC3DF]');
  
  fs.writeFileSync(path, content, 'utf8');
}
console.log('Builder theme updated');
