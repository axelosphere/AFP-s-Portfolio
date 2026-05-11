/*script.js*/

function portfolio() {
    return {
    active: 'about',
    drawerOpen: false,
    filter: 'All',
    scrollPercent: 0,
    viewMode: 'carousel',
    tabs: [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'social', label: 'Connect' }
    ],
    skills: [
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ],
    projects: [
        { 
        title: 'DocTrac - Document Management System', 
        image: 'img/doctrac.png',
        category: 'Web', 
        tags:   ['React', 'Node.js', 'Express', 'Docker', 'PostgreSQL', 'E-Sig'], 
        desc:   [
                'Architected and containerized a full-stack Document Management System (PERN) to centralize corporate file tracking.',
                'Integrated E-Signature functionality and implemented role-based access control for secure document handling.'
                ].join(' '),    
        link: '#' 
        },
        { 
        title: 'E-Repel - Avian Deterrence System',
        image: 'img/erepel.png',
        category: ['AI', 'Web', 'IoT'],
        tags: ['Python', 'YOLO', 'TensorFlow', 'PHP', 'Node.js'], 
        desc: 'IOT-Based Bird Deterrent for Fish Farms using Computer Vision and Trend Analytics.',
        link: '#' 
        }
    ],
    get filteredProjects() {
        if (this.filter === 'All') return this.projects;
        return this.projects.filter(p => p.category.includes(this.filter));
    },
    reobserve() {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            this.observer.observe(el);
        });
        },
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                const el = e.target;
                const delay = parseFloat(el.style.transitionDelay) || 0;
                setTimeout(() => {
                    el.style.transitionDelay = '0s';
                }, (delay + 1.2) * 1000); // wait for delay + animation duration to finish
                el.classList.add('visible');
                }
            });
            }, { threshold: 0.1 });

        this.$nextTick(() => {
            setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => this.observer.observe(el));
            }, 50);
        });

        // Scroll: progress bar + active tab tracking
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            this.scrollPercent = (winScroll / height) * 100;

            const offsets = this.tabs.map(tab => {
            const el = document.getElementById(tab.id);
            return { id: tab.id, top: el ? el.getBoundingClientRect().top : Infinity };
            });

            const atBottom = winScroll + window.innerHeight >= document.documentElement.scrollHeight - 50;
            if (atBottom) {
            this.active = this.tabs.at(-1).id;
            } else {
            const current = offsets.filter(o => o.top <= 100).at(-1);
            if (current) this.active = current.id;
            }
        });
        this.$watch('drawerOpen', val => {
            document.body.style.overflow = val ? 'hidden' : '';
        });
    },
        toggleView() {
        // 1. Switch the mode
        this.viewMode = (this.viewMode === 'grid' ? 'carousel' : 'grid');

        // 2. If switching to grid, reset animations
        if (this.viewMode === 'grid') {
            this.$nextTick(() => {
                const items = document.querySelectorAll('#skills .reveal');
                
                items.forEach(el => {
                    // Remove visibility so it can "reveal" again
                    el.classList.remove('visible');
                    // Optional: reset the transition delay if you want the staggered effect again
                    this.observer.unobserve(el); 
                });

                // Re-trigger the observer
                this.reobserve();
            });
        }
    },

    // Update your existing reobserve method to ensure it catches everything
    reobserve() {
        this.$nextTick(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                this.observer.observe(el);
            });
        });
    },
    }

    
}