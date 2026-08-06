import React from 'react';

const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
      {description && <p className="text-slate-500 mt-1.5 text-sm font-medium">{description}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default PageHeader;
