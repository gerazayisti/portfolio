import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { Kicker } from './Kicker';
import { BrutalistButton } from './BrutalistButton';

interface ProjectCardProps {
  project: Project;
  missionRank?: 'S-RANK' | 'A-RANK' | 'B-RANK';
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  missionRank = 'S-RANK',
  index 
}) => {
  return (
    <article className="border border-[#0A0A0A] bg-[#FAF9F6] flex flex-col justify-between group transition-colors duration-200">
      {/* Top Meta Bar */}
      <div className="p-5 border-b border-[#0A0A0A] flex items-center justify-between bg-[#FAF9F6]">
        <Kicker text={project.role.toUpperCase()} kanji="術" />
        <span className="font-mono text-[10px] font-bold px-2 py-0.5 border border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF9F6]">
          {missionRank} // 0{index + 1}
        </span>
      </div>

      {/* Titre Poppins 700 */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="font-sans text-2xl font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#1E40AF] transition-colors">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-[#1E40AF] mt-1 font-semibold uppercase tracking-wider">
          {project.impact}
        </p>
      </div>

      {/* Image N&B désaturée (filter: grayscale), cadre 1px, 0px radius */}
      <div className="px-5 py-2">
        <div className="relative aspect-video w-full border border-[#0A0A0A] overflow-hidden bg-[#0A0A0A]">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:contrast-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
          {/* Subtle manga corner bracket */}
          <div className="absolute top-2 left-2 font-mono text-[9px] bg-[#0A0A0A] text-[#FAF9F6] px-1.5 py-0.5 border border-[#FAF9F6]">
            DATA_VISUAL
          </div>
        </div>
      </div>

      {/* Paragraphe court gris #6B6B6B */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
          {project.description}
        </p>

        {/* Features list */}
        {project.features && project.features.length > 0 && (
          <div className="pt-2 border-t border-[#0A0A0A]/10">
            <ul className="space-y-1.5">
              {project.features.map((feat, fIdx) => (
                <li key={fIdx} className="font-mono text-[11px] text-[#0A0A0A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#1E40AF] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] font-semibold px-2 py-0.5 border border-[#0A0A0A] text-[#0A0A0A] bg-[#FAF9F6]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions de mission */}
        <div className="pt-4 border-t border-[#0A0A0A] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {project.demoUrl ? (
            <>
              <BrutalistButton
                variant="primary"
                className="flex-1 text-xs py-2.5 justify-center"
                onClick={() => window.open(project.demoUrl, '_blank', 'noopener,noreferrer')}
              >
                <span className="flex items-center justify-center gap-1.5">
                  VISITER LA SOLUTION
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </BrutalistButton>
              {project.githubUrl && (
                <BrutalistButton
                  variant="secondary"
                  className="text-xs py-2.5 px-3 whitespace-nowrap justify-center"
                  onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                  title="Voir le dépôt GitHub"
                >
                  <span className="flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" />
                    <span>REPO</span>
                  </span>
                </BrutalistButton>
              )}
            </>
          ) : (
            project.githubUrl && (
              <BrutalistButton
                variant="secondary"
                className="w-full text-xs py-2.5 justify-center"
                onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  VOIR LE REPO GITHUB
                </span>
              </BrutalistButton>
            )
          )}
        </div>
      </div>
    </article>
  );
};
