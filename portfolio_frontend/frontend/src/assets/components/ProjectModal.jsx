import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-white/20 dark:border-white/10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition backdrop-blur-sm"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto custom-scrollbar">
              {/* Header Image */}
              <div className="relative h-64 sm:h-80 w-full">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white shadow-sm">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-[2fr_1fr]">
                {/* Left Panel: Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Overview
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {project.longDescription}
                    </p>
                  </div>
                  
                  {project.challenges && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Challenge & Solution
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}

                   {project.features && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Key Features
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                        {project.features.map((feature, idx) => (
                           <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Panel: Metadata (Tech Stack & Links) */}
                <div className="space-y-8">
                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200 border border-gray-200 dark:border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {(project.links?.github || project.links?.live) && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-4">
                        Links
                      </h3>
                      <div className="flex flex-col gap-3">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200"
                          >
                            <FontAwesomeIcon icon={faGithub} className="text-lg" />
                            <span className="font-semibold">View Source</span>
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/30"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-lg" />
                            <span className="font-semibold">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
