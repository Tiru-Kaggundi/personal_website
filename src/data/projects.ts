export interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  blogSlug?: string;
}

export const projects: Project[] = [
  {
    title: "AI for Trade Global Competition – Trade Forecasting",
    description: "2nd place in the global AI for Trade competition (Center for Collective Learning, Prof. César Hidalgo). Built a traditional ML pipeline to forecast future trade volumes for HS6 product lines (aggregated to HS4 level) and achieved the best sMAPE score among entries.",
    tech: ["Python", "scikit-learn", "Machine Learning", "Trade Data"],
    githubUrl: "https://github.com/Tiru-Kaggundi/Tirumala_aiFORtrade",
  },
  {
    title: "Algo Trading Framework",
    description: "Production-ready Python framework for end-of-day positional backtesting on Indian equities and futures. Built with vectorbt, SQLite logging, and YAML-driven configuration.",
    tech: ["Python", "Pandas", "vectorbt", "Zerodha Kite"],
    githubUrl: "https://github.com/Tiru-Kaggundi/algo_trading",
  },
  {
    title: "NSE Options Data Archive",
    description: "Pipeline for ingesting, normalizing, and analyzing historical options data from NSE. Includes research notebooks and data manifests for alpha exploration.",
    tech: ["Python", "Parquet", "Pandas", "Data Engineering"],
  },
  {
    title: "OpenAI API Experiments",
    description: "Small Flask + Python demo apps exploring the OpenAI API, including chat-style interfaces and structured output experiments.",
    tech: ["Python", "Flask", "OpenAI API"],
  },
  {
    title: "D3.js Visualizations",
    description: "Collection of interactive data visualizations built with D3 during coursework, including treemaps, timelines, and geographic maps.",
    tech: ["D3.js", "JavaScript", "SVG"],
  },
];
