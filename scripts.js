document.addEventListener('DOMContentLoaded', function() {
        
        // --- Header Interaction Logic ---
        const mainNav = document.querySelector('.main-nav');
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const megaMenuItems = document.querySelectorAll('.main-nav .mega-menu-item');
        const userMenuToggle = document.querySelector('.user-menu-toggle');
        const userMenuDropdown = document.querySelector('.user-menu-dropdown');
    
        if (mobileNavToggle && mainNav) {
            mobileNavToggle.addEventListener('click', () => {
                const isOpen = mainNav.classList.toggle('is-open');
                mobileNavToggle.setAttribute('aria-expanded', isOpen);
            });
        }
    
        megaMenuItems.forEach(menuItem => {
            const link = menuItem.querySelector('a');
            if (link) {
                link.addEventListener('click', (event) => {
                    if (window.innerWidth < 992 && menuItem.querySelector('.mega-menu')) {
                        event.preventDefault();
                        megaMenuItems.forEach(item => { if (item !== menuItem) item.classList.remove('is-open'); });
                        menuItem.classList.toggle('is-open');
                    }
                });
            }
        });
    
        if (userMenuToggle && userMenuDropdown) {
            userMenuToggle.addEventListener('click', (event) => {
                event.stopPropagation();
                const isOpen = userMenuDropdown.classList.toggle('is-open');
                userMenuToggle.setAttribute('aria-expanded', isOpen);
            });
        }
    
        document.addEventListener('click', (event) => {
            if (userMenuDropdown && userMenuDropdown.classList.contains('is-open')) {
                if (!userMenuToggle.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                    userMenuDropdown.classList.remove('is-open');
                    userMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    
        // --- Role-Based Visibility Simulation ---
        function applyRoleVisibility() {
            const userRoles = window.MEMBER_ROLES || [];
            const isLoggedIn = userRoles.length > 0;
            document.querySelectorAll('.role-conditional').forEach(el => {
                const allowedRolesRaw = el.dataset.roles || "";
                if (allowedRolesRaw === "") {
                    el.style.display = isLoggedIn ? 'none' : (el.classList.contains('header-actions') ? 'flex' : 'block');
                } else {
                    const allowedRoles = allowedRolesRaw.split(',').map(r => r.trim().toLowerCase());
                    const hasAccess = userRoles.some(userRole => allowedRoles.includes(userRole.toLowerCase()));
                    const displayType = el.tagName === 'LI' ? 'block' : 'flex';
                    el.style.display = hasAccess ? displayType : 'none';
                }
            });
        }
    
        const loginToggle = document.getElementById('login-toggle');
        loginToggle.addEventListener('change', function() {
            window.MEMBER_ROLES = this.checked ? ['active'] : [];
            applyRoleVisibility();
        });
        window.MEMBER_ROLES = [];
        applyRoleVisibility();
    });