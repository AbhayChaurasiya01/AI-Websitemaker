
import React, { useState } from 'react';
import { navbarStyles as s } from '../assets/dummyStyles';
import { logo } from '../assets/ui';
import { Settings, Zap } from 'lucide-react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: "Home", to: "/" },
  { label: "My Projects", to: "/dashboard", protected: true },
  { label: "Community", to: "/community" },
  { label: "Pricing", to: "/pricing" },
];

const accountLinks = [
  { label: "Buy credits",
    icon: Zap,
    to: "/pricing",
    iconClass: s.accountIconIndigo,
  },
  { label: "Settings", icon: Settings, to: "/settings" },
];

const Navbar = () => {

    const navigate = useNavigate();
    const {user ,logoutUser} = useAuth();
    const isAuthed =Boolean(user);
    const [open, setOpen ]= useState(false);
    const visibleLinks =links.filter((l )=> !l.protected || isAuthed);
    return (
        <nav class ={s.root}>
            <div class={s.container}>
                <logo/>
                <div className={s.centerLinks}>
                    {visibleLinks.map((l) =>(
                      <NavLink key={l.to} to={l.to} end={l.to == "/"}
                      className={({isActive}) =>
                      `${s.navLinkBase} ${isActive ? s.navLinkBase : s.navLinkInactive}`
                       }
                      >
                        {l.label}
                      </NavLink>
                    ))}
            
                </div>

                <div className={s.desktopRight}>
                  {isAuthed ? (
                    <UserMenu/>
                  ) : (
                    <>
                     <Link to='/login' className={s.signInLink}>
                        Sign in 
                     </Link>
                     <button onClick={()=> navigate("/register")}
                      className={`${s.btnPrimary} text-[13px] px-4 py-2`}
                      >
                        Get Started

                     </button>
                    </>
                  )}

                </div>
                {/* toggle */}
                <button onClick={() => setOpen(!open)} className={s.hamburger}>
                {open ? (
                  <X className={s.hamburgerIcon}/>
                ): (
                  <Menu className={s.hamburgerIcon}/>
                )}

                </button>
            </div>
            {/* mobile navigations */}
            {open && (
              <div className={s.mobileMenu}>
                   {visibleLinks.map((l) =>(
                    <links key>
                    </links>
                   ))}
              </div>
            )}
        </nav>
    );
};

export default Navbar