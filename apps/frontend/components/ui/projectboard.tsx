"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios directly
import { useAuth } from '@clerk/nextjs';
import { BACKEND_URL } from "../../config";

interface Project {
  id: string;
  description: string;
  createdAt: string;
}

const ProjectBoard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Hidden by default
  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for the sidebar
  const { getToken } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fetchProjects = async () => {
    try {
      const token = await getToken();
      const response = await axios.get<{ projects: Project[] }>(`${BACKEND_URL}/projects`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      setProjects(response.data.projects);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <>
      {/* Toggle Button for Mobile/Small Screens (visible on md:hidden) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 bg-gray-800 text-white rounded-full fixed top-4 left-4 z-50 shadow-md hover:bg-gray-700 transition-all duration-300"
      >
        {isOpen ? 'Hide Projects' : 'Show Projects'}
      </button>

      {/* Sidebar Trigger Area for Desktop (visible on md:block, hidden on mobile) */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={(e: React.MouseEvent) => {
          // Only close if the cursor leaves the trigger area and isn't over the sidebar
          if (sidebarRef.current) {
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const mouseX = e.clientX;
            if (mouseX > sidebarRect.right) {
              setIsOpen(false);
            }
          }
        }}
        className="hidden md:block absolute left-0 top-0 h-full w-4 bg-transparent cursor-pointer z-40"
      />

      {/* Project Board with White and Black Combination */}
      <div
        ref={sidebarRef} // Add ref to track the sidebar
        className={`
          w-64 h-screen fixed left-0 top-0 z-40 transform transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-white text-black p-6 shadow-2xl rounded-r-2xl
          border-r-4 border-gray-200
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 drop-shadow-md">Your Projects</h2>
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-100 bg-opacity-80 p-3 rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-md"
              >
                <a
                  href={`/project/${project.id}`}
                  className="text-gray-800 hover:text-black font-medium block"
                >
                  {project.description}
                </a>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No projects found.</div>
          )}
        </div>
      </div>

      {/* Subtle Overlay for Mobile and Dimmed Main Screen on Desktop */}
      {isOpen && (
        <div
        className="fixed inset-0 bg-gray-100 bg-opacity-100 z-30"
        onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectBoard;