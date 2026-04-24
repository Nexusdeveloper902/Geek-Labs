import React from 'react';
import { Star, GitFork } from 'lucide-react';

interface GithubRepoProps {
  repo: string;
}

export async function GithubRepo({ repo }: GithubRepoProps) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch repo");
    }

    const data = await res.json();

    return (
      <a 
        href={data.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="my-8 block w-full no-underline"
      >
        <div className="glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-colors group">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-primary transition-colors">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors m-0 leading-tight">
                {data.full_name}
              </h3>
              <p className="text-sm text-muted-foreground m-0 mt-1 line-clamp-1">
                {data.description || "No description provided."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground ml-16 sm:ml-0 shrink-0">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-yellow-500" />
              <span className="font-medium text-foreground">{data.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork size={16} className="text-blue-400" />
              <span className="font-medium text-foreground">{data.forks_count}</span>
            </div>
          </div>
        </div>
      </a>
    );
  } catch (error) {
    return (
      <div className="my-8 glass-card p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
        Failed to load GitHub repository: {repo}
      </div>
    );
  }
}
