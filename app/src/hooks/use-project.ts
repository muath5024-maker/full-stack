"use client";

import { useState, useEffect } from 'react';
import type { ProjectConfig } from '@/types/project';

const STORAGE_KEY = 'kimi_project_data';

export const useProject = () => {
    const [project, setProject] = useState<ProjectConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load from local storage on mount
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setProject(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse project data', e);
            }
        }
        setLoading(false);
    }, []);

    const saveProject = (config: ProjectConfig) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        setProject(config);
        // Force a reload to ensure all components pick up the new "mode"
        window.location.href = '/';
    };

    const clearProject = () => {
        localStorage.removeItem(STORAGE_KEY);
        setProject(null);
        window.location.href = '/';
    };

    return {
        project,
        loading,
        saveProject,
        clearProject
    };
};
