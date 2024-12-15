import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('role'); // Get the user's role from localStorage

  // Define menu items for each role
  const menuItems = [
    { path: '/', label: 'Home', roles: ['Admin'] },
    { path: '/add-courses', label: 'Add Courses', roles: ['Admin'] },
    { path: '/view-courses', label: 'View Courses', roles: ['Admin', 'Student', 'Teacher'] },
    { path: '/my-courses', label: 'My Enrollments', roles: ['Student'] },
    { path: '/enroll-students', label: 'Enroll Student', roles: ['Admin'] },
    // { path: '/create-quiz', label: 'Create Quiz', roles: ['Admin'] },
    { path: '/view-grades', label: 'View Grades', roles: ['Student'] },
    { path: '/grade-students/:courseId', label: 'Give Grades', roles: ['Teacher'] },
    { path: '/teacher-dashboard', label: 'Teacher Dashboard', roles: ['Teacher'] },
    { path: '/create-quiz', label: 'Student Quiz', roles: ['Teacher'] },
    { path: '/available-quiz', label: 'available Quiz', roles: ['Student'] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  return (
    <>
      <nav className="pc-sidebar">
        <div className="navbar-wrapper">
          <div className="m-header flex items-center py-4 px-6 h-header-height">
            <a href="/" className="b-brand flex items-center gap-3">
              <div class="auth-header gg">
                <div class="edu-manager-logo">EduManager</div>
              </div>
            </a>
          </div>
          <div className="navbar-content h-[calc(100vh_-_74px)] py-2.5">
            <ul className="pc-navbar">
              {menuItems
                .filter((item) => item.roles.includes(userRole))
                .map((item, index) => (
                  <li
                    key={index}
                    className={`pc-item ${location.pathname === item.path ? 'active' : ''}`} // Add 'active' class if the current path matches
                  >
                    <a onClick={() => navigate(item.path)} className="pc-link">
                      <span className="pc-mtext">{item.label}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
      <header className="pc-header">
        <div className="header-wrapper flex max-sm:px-[15px] px-[25px] grow">
          <div className="me-auto pc-mob-drp">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              <li className="pc-h-item pc-sidebar-collapse max-lg:hidden lg:inline-flex">
                <a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="sidebar-hide">
                  <i className="ti ti-menu-2" />
                </a>
              </li>
              <li className="pc-h-item pc-sidebar-popup lg:hidden">
                <a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="mobile-collapse">
                  <i className="ti ti-menu-2 text-2xl leading-none" />
                </a>
              </li>
            </ul>
          </div>

          <div className="ms-auto">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              {/* Logout Button */}
              <li>
                <div className="grid">
                  <div class="pc-header-right">
                    <button class="logout-btn" onClick={handleLogout}>
                      <i class="feather icon-log-out"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
